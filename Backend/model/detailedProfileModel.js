const mongoose = require('mongoose');

const detailedProfileSchema = new mongoose.Schema({
    name: { type: String, immutable: true },
    id: { type: String, immutable: true },
    role: { type: String, immutable: true },
    profileImage: { type: String},
    firstName: {type: String},
    lastName: {type: String},
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    birthDate: { type: Date },
    mail: { type: String, trim: true, match: /\S+@\S+\.\S+/ },
    phoneNumber: { type: String, match: /^[0-9]{10}$/ },
    gender: { type: String, enum: ['male', 'female', 'other'],  },
    nationality: { type: String, trim: true, default: 'Indian' },
    religion: { type: String, trim: true },
    block: { type: String, trim: true },
    street: { type: String, trim: true },
    village: { type: String, trim: true },
    taluka: { type: String, trim: true },
    district: { type: String, trim: true },
    pincode: { type: String, trim: true, match: /^[0-9]{6}$/ },
    country: { type: String, trim: true, default: 'India' },
    bankName: {type: String, trim: true, }, 
    ifscCode: {type: String, trim: true, }, 
    accountNo: {type: String, trim: true, }, 
    aadharNumber: { type: String, match: /^[0-9]{12}$/ },
    
    // this is for attendance purpose
    encodedProfilePhoto: { type: Array }
});

const DetailedProfile = mongoose.model('DetailedProfile', detailedProfileSchema);
module.exports = DetailedProfile;
