const express = require('express');
const Action = require('../db/models/User')

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, action, details } = req.body;
    try {
        const newAction = await Action.create({ userId, action, details });
        res.status(201).json(newAction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    const { userId, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const options = {
            where: {},
            offset,
            limit: parseInt(limit)
        };
        
        if (userId) options.where.userId = userId;

        const actions = await Action.findAndCountAll(options);
        res.json({
            data: actions.rows,
            total: actions.count,
            page: parseInt(page, 10),
            pages: Math.ceil(actions.count / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;