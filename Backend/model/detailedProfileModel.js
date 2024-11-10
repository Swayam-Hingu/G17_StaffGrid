// detailedProfileModel.js
const mongoose = require('mongoose');

const detailedProfileSchema = new mongoose.Schema({
    name: { type: String, required: true, immutable: true },
    id: { type: String, unique: true, required: true, immutable: true },
    role: { type: String, immutable: true },
    profileImage: { type: String, required: true},

    basicInfo: {
        firstName: {type: String},
        lastName: {type: String},
        id: { type: String, unique: true, required: true },
        fatherName: { type: String, trim: true },
        motherName: { type: String, trim: true },
        birthDate: { type: Date },
        mail: { type: String, unique: true, trim: true, match: /\S+@\S+\.\S+/ },
        phoneNumber: { type: String, match: /^[0-9]{10}$/ },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        role: {type: String},
        nationality: { type: String, trim: true, default: 'Indian' },
        religion: { type: String, trim: true },
    },
    address: {
        block: { type: String, trim: true },
        street: { type: String, trim: true },
        village: { type: String, trim: true },
        taluka: { type: String, trim: true },
        district: { type: String, trim: true },
        pincode: { type: String, trim: true, match: /^[0-9]{6}$/ },
        country: { type: String, trim: true, default: 'India' },
    },
    bankDetails: { 
        bankName: {type: String, trim: true, required: true}, 
        ifscCode: {type: String, trim: true, required: true}, 
        accountNo: {type: String, trim: true, required: true}, 
        aadharNumber: { type: String, unique: true, match: /^[0-9]{12}$/ },
    },
});

const DetailedProfile = mongoose.model('DetailedProfile', detailedProfileSchema);
module.exports = DetailedProfile;
