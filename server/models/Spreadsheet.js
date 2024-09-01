const mongoose = require('mongoose');

const SpreadsheetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    data: { type: Array, default: [] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Spreadsheet', SpreadsheetSchema);
