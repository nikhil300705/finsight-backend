const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');
const mongoose = require('mongoose');

// ✅ ADVANCED SUMMARY
router.get('/summary', protect, async (req, res) => {
    try {
        const data = await Transaction.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                        }
                    }
                }
            }
        ]);

        res.json(data[0] || { totalIncome: 0, totalExpense: 0 });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;