const Profile = require('../models/profileModel');
const defaultProfileData = require('./defaultProfileData');

exports.makeProfile = async (req,res,next)=> {
    try {
        const profileData = defaultProfileData;
        const { username } = req.body;
        profileData.username = username;
        profileData.email = username;
        const newProfile = new Profile(profileData);
        await newProfile.save();
        next();
      }
     catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
};

// Get user profile

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ username:req.username }); // Find profile by username
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { username :req.username },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user medical history
exports.getMedicalHistory = async (req, res) => {
    try {
        const { username } = req.username; // Get username from request auth
        const profile = await Profile.findOne({ username });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile.medicalHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add medical history
exports.addMedicalHistory = async (req, res) => {
    try {
        const { username } = req.username; // Get username from request auth
        const profile = await Profile.findOne({ username });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Assuming req.body contains the medical history object
        profile.medicalHistory.push(req.body);
        await profile.save();
        res.status(201).json(profile.medicalHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update medical history
exports.updateMedicalHistory = async (req, res) => {
    try {
        const { username } = req.username; // Get username from request auth
        const profile = await Profile.findOne({ username });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Assuming req.body contains the updated medical history details
        const { medicalHistoryId, ...updateData } = req.body; // Extract ID and data to update
        const medicalHistory = profile.medicalHistory.id(medicalHistoryId); // Find the specific medical history record

        if (!medicalHistory) {
            return res.status(404).json({ message: 'Medical history record not found' });
        }

        Object.assign(medicalHistory, updateData); // Update the medical history record
        await profile.save();
        res.status(200).json(medicalHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete medical history
exports.deleteMedicalHistory = async (req, res) => {
    try {
        const { username } = req.username; // Get username from request auth
        const profile = await Profile.findOne({ username });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const { medicalHistoryId } = req.body; // Assuming the ID is sent in the request body
        const medicalHistory = profile.medicalHistory.id(medicalHistoryId);

        if (!medicalHistory) {
            return res.status(404).json({ message: 'Medical history record not found' });
        }

        medicalHistory.remove(); // Remove the medical history record
        await profile.save();
        res.status(200).json({ message: 'Medical history record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};