const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: {
        type: String,
        required: [true, "Please add the contact name"],
      },
      email: {
        type: String,
        required: [true, "Please add the contact mail address"],
      },
      phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
      },
      fav: {
        type: Boolean,
      }
    
  },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model("Contact", ContactSchema);
