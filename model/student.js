const mongoose = require('mongoose');

const studentCreateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        batch: {
            type: String,
            require: true
        },
        college: {
            type: String,
            require: true
        },
        dsa: {
            type: Number,
            require: true
        },
        web: {
            type: Number,
            require: true
        },
        react: {
            type: Number,
            require: true
        },
        placementStatus: {
            type: String,
            default: "not placed" // Set the default value here
        }
    }, { timestamps: true }
);

const Add = mongoose.model("Add", studentCreateSchema);
module.exports = Add;