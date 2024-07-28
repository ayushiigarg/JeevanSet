const mongoose = require('mongoose');

// Blood Donation Schema
const bloodDonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number,  // Amount in liters or milliliters
    required: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});

// Organ Donation Schema
const organDonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  organType: {
    type: String,
    enum: ['Kidney', 'Liver', 'Heart', 'Lung', 'Pancreas'],
    required: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  recipientName: {
    type: String
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});

// Plasma Donation Schema
const plasmaDonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number,  // Amount in liters or milliliters
    required: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});

// Bone Marrow Donation Schema
const boneMarrowDonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  recipientName: {
    type: String
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});

// Tissue Donation Schema
const tissueDonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  tissueType: {
    type: String,
    enum: ['Cornea', 'Skin', 'Bone', 'Heart Valve'],
    required: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  recipientName: {
    type: String
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});

module.exports = {
  BloodDonation: mongoose.model('BloodDonation', bloodDonationSchema),
  OrganDonation: mongoose.model('OrganDonation', organDonationSchema),
  PlasmaDonation: mongoose.model('PlasmaDonation', plasmaDonationSchema),
  BoneMarrowDonation: mongoose.model('BoneMarrowDonation', boneMarrowDonationSchema),
  TissueDonation: mongoose.model('TissueDonation', tissueDonationSchema),
};
