const { default: mongoose } = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
},
    { timestamps: true } // Use `timestamps` instead of `timestamp`
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;