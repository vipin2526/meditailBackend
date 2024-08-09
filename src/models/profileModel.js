// ProfileModel.js
const mongoose = require('mongoose');

// Define the Checkup schema
const CheckupSchema = new mongoose.Schema({
    doctor: { type: String, required: true },
    specialty: { type: String, required: true },
    date: { type: Date, required: true }
});

// Define the Health Metric schema
const HealthMetricSchema = new mongoose.Schema({
    bloodPressure: {
        value: { type: String, required: true },
        status: { type: String, required: true }
    },
    heartRate: {
        value: { type: String, required: true },
        status: { type: String, required: true }
    },
    glucose: {
        value: { type: String, required: true },
        status: { type: String, required: true }
    },
    cholesterol: {
        value: { type: String, required: true },
        status: { type: String, required: true }
    }
});

// Define the Document schema
const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true }
});

// Define the Profile schema
const ProfileSchema = new mongoose.Schema({
    username: {type: String, requried:true},
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    bloodType: { type: String },
    allergies: { type: [String] },
    diseases: { type: [String] },
    checkups: { type: [CheckupSchema] },
    healthMetrics: { type: HealthMetricSchema },
    symptoms: { type: [String] },
    diagnosis: { type: String },
    documents: { type: [DocumentSchema] }
});

// Create the Profile model
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;