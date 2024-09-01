const express = require('express');
const router = express.Router();
const Spreadsheet = require('../models/Spreadsheet');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all spreadsheets
router.get('/', authMiddleware, async (req, res) => {
    try {
        const spreadsheets = await Spreadsheet.find({ owner: req.user.id });
        res.json(spreadsheets);
    } catch (error) {
        console.error('Error fetching spreadsheets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
  
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  
    try {
      const spreadsheet = await Spreadsheet.findOne({ _id: id, owner: req.user._id });
  
      if (!spreadsheet) {
        return res.status(404).json({ message: 'Spreadsheet not found' });
      }
  
      res.json(spreadsheet);
    } catch (error) {
      console.error('Error fetching spreadsheet:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// POST create new spreadsheet
router.post('/', authMiddleware, async (req, res) => {
    const { name, data = [['', '', ''], ['', '', ''], ['', '', '']] } = req.body; // Default data initialization

    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        if (!name) {
            return res.status(400).json({ message: 'Spreadsheet name is required' });
        }

        const newSpreadsheet = new Spreadsheet({
            name,
            data,
            owner: req.user._id,
        });

        await newSpreadsheet.save();
        res.status(201).json(newSpreadsheet);
    } catch (error) {
        console.error('Error creating spreadsheet:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// PUT update an existing spreadsheet
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, data } = req.body;

    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        // Find the spreadsheet by ID and ensure it belongs to the authenticated user
        const spreadsheet = await Spreadsheet.findOne({ _id: id, owner: req.user._id });

        if (!spreadsheet) {
            return res.status(404).json({ message: 'Spreadsheet not found' });
        }

        // Update the spreadsheet with the new data
        if (name) spreadsheet.name = name;
        if (data) spreadsheet.data = data; // Update the data field as needed

        await spreadsheet.save();
        res.json(spreadsheet);
    } catch (error) {
        console.error('Error updating spreadsheet:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;