// DefaultProfileData.js
const defaultProfileData = {
    name: "Your Name",
    age: 25,
    address: "324-Qena, Egypt",
    email: "yourmail@gmail.com",
    mobile: "9878548749",
    bloodType: "O",
    allergies: ["Chocolate", "Beans"],
    diseases: ["Diabetic"],
    checkups: [
        { doctor: "Dr Ahmed Qenawy", specialty: "Plastic Surgery", date: "10/7/2019" },
        { doctor: "Dr Ahmed Azzab", specialty: "Cardiologist", date: "10/7/2019" }
    ],
    healthMetrics: {
        bloodPressure: { value: "120/80 mm/Hg", status: "Normal" },
        heartRate: { value: "102 beats/min", status: "Above Normal" },
        glucose: { value: "100 mg/dL", status: "Normal" },
        cholesterol: { value: "85 mg/dL", status: "Normal" }
    },
    symptoms: [
        "Excessive thirst and hunger",
        "Frequent urination",
        "Weight loss or gain",
        "Fatigue",
        "Irritability",
        "Slow-healing wounds"
    ],
    diagnosis: "May be diagnosed based on A1C criteria or plasma glucose criteria...",
    documents: [
        { name: "Prescription.pdf", link: "/" },
        { name: "Blood Tests.pdf", link: "/" }
    ]
};

module.exports = defaultProfileData;
