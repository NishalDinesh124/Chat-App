const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        text: { type: String },
      },
    
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
},

{
    timestamps: true,
},
)


module.exports = mongoose.model("Messages", messageSchema);