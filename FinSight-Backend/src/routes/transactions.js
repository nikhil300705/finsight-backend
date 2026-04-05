const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

// ADD
router.post('/', protect, async (req, res) => {
    try {
        const { type, category, amount, note } = req.body;

        if (!type || !category || !amount) {
            return res.status(400).json({ msg: 'All fields required' });
        }

        const transaction = await Transaction.create({
            user: req.user.id,
            type,
            category,
            amount,
            note
        });

        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// GET ALL + FILTER
router.get('/', protect, async (req, res) => {
    try {
        const query = { user: req.user.id };

        if (req.query.type) query.type = req.query.type;
        if (req.query.category) query.category = req.query.category;

        const transactions = await Transaction.find(query)
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// GET ONE
router.get('/:id', protect, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ msg: 'Not found' });
        }

        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(transaction);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// UPDATE 🔥 (NEW)
router.put('/:id', protect, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ msg: 'Not found' });
        }

        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const updated = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// DELETE
router.delete('/:id', protect, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ msg: 'Not found' });
        }

        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await transaction.deleteOne();

        res.json({ msg: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;