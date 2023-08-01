const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userid: { type: String, unique: true, required: true },
    product: [
      {
        productId: {
          type: String,
        },
        quntity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
