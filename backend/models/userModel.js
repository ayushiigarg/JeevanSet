const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "Enter Role"],
        enum: ["admin", "organisation", "Donor", "Hospital"]
    },
    name: {
        type: String,
        required: function() {
            return this.role === "Donor" || this.role === "admin";
        }
    },
    hospitalName: {
        type: String,
        required: function() {
            return this.role === "Hospital";
        }
    },
    organisationName: {
        type: String,
        required: function() {
            return this.role === "organisation";
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter valid email address'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Enter password']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Enter date of birth']
    },
    website: {
        type: String
    },
    phone: {
        type: String,
        required: [true, 'Enter phone number'],
        unique: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    address: {
        street: {
            type: String,
            required: [true, "Enter street address"]
        },
        city: {
            type: String,
            required: [true, "Enter city"]
        },
        state: {
            type: String,
            required: [true, "Enter state"]
        },
        postalCode: {
            type: String,
            required: [true, "Enter postal code"]
        },
        country: {
            type: String,
            required: [true, "Enter country"]
        }
    }
}, {timestamps: true});

// Add indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1, dateOfBirth: -1 }); // Compound index example

module.exports = mongoose.model("users", userSchema);
