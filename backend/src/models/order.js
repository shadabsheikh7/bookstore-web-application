import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Books"
    },
    status: {
        type: String,
        default: "order Placed",
        enum: ["order Placed", "cancelled", "out of delivery", "Delivered"]
    }

}, {
    timestamps: true
})
const Order = mongoose.model("Order", orderSchema)
export default Order