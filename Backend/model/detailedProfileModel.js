// detailedProfileModel.js
const mongoose = require('mongoose');

const detailedProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    basicProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'BasicProfile', required: true },
    information: {
        phoneNumber: { type: String, match: /^[0-9]{10}$/ },
        fatherName: { type: String, trim: true },
        motherName: { type: String, trim: true },
        aadharNumber: { type: String, unique: true, match: /^[0-9]{12}$/ },
        mailId: { type: String, unique: true, trim: true, match: /\S+@\S+\.\S+/ },
        birthDate: { type: Date },
        address: {
            city: { type: String, trim: true },
            district: { type: String, trim: true },
            taluka: { type: String, trim: true },
            country: { type: String, trim: true, default: 'India' }
        },
        nationality: { type: String, trim: true, default: 'Indian' },
        religion: { type: String, trim: true },
        emergencyContact: { type: String, match: /^[0-9]{10}$/ },
        bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
        dateOfJoining: { type: Date },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }
    },
    backDetails: { type: String, trim: true }
});

module.exports = mongoose.model('DetailedProfile', detailedProfileSchema);