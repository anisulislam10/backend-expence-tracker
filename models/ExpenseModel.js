const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        index: true // Added index for faster searching
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01, // Ensure positive values
        max: 99999999999999999999, // 20 digits max
        get: v => parseFloat(v.toFixed(2)), // Always store 2 decimal places
        set: v => parseFloat(v.toFixed(2)) // Ensure proper formatting
    },
    type: {
        type: String,
        default: "expense",
        enum: ["expense", "income"] // If you might need this later
    },
    date: {
        type: Date,
        required: true,
        index: -1 // Descending index for sorting
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true // Index for filtering
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
}, {
    timestamps: true,
    toJSON: { getters: true }, // Include getters when converting to JSON
    toObject: { getters: true } // Include getters when converting to object
});

// Compound index for common query patterns
ExpenseSchema.index({ category: 1, date: -1 });
ExpenseSchema.index({ date: -1, amount: 1 });

module.exports = mongoose.model('Expense', ExpenseSchema);