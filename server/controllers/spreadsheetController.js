const Spreadsheet = require('../models/Spreadsheet');

exports.getSpreadsheets = async (req, res) => {
  try {
    const spreadsheets = await Spreadsheet.find({ owner: req.user.id });
    res.json(spreadsheets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addSpreadsheet = async (req, res) => {
  try {
    const newSpreadsheet = new Spreadsheet({
      name: req.body.name,
      owner: req.user.id,
    });
    const savedSpreadsheet = await newSpreadsheet.save();
    res.status(201).json(savedSpreadsheet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
