const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: [true, 'El monto es requerido']
    }
},{
    timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
