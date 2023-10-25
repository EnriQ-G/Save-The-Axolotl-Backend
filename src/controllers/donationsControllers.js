const asyncHandler = require('express-async-handler');
const Donation = require('../models/donationModel');

const donate = asyncHandler(async (req, res) => {
    const {amount} = req.body;

    if(!amount){
        res.status(400);
        throw new Error('Todos los campos son requeridos');
    }

    const donation = await Donation.create({
        user: req.user._id,
        amount: req.body.amount
    });

    if(donation){
        res.status(201).json(donation);
    } else {
        res.status(400);
        throw new Error('Datos inválidos');
    }

});

const getDonations = asyncHandler(async (req, res) => {
    const totalDonations = await Donation.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" }
            }
        }
    ]);

    if (totalDonations.length > 0) {
        res.json({ totalDonations: totalDonations[0].totalAmount });
    } else {
        res.json({ totalDonations: 0 });
    }
});


const getAllDonations = asyncHandler(async (req, res) => {
    const allDonations = await Donation.find().populate('user', 'name');
    res.json(allDonations);
});

module.exports = {
    donate,
    getDonations,
    getAllDonations
}