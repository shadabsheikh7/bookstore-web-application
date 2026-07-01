import express from "express";
import authntication2 from "./userAuth2.js";
import User from "../models/user.js";
const cartrouter = express.Router()

// ! ADDING ITEMS TO THE CART 
cartrouter.put("/add-to-cart", authntication2, async (req, res) => {
    try {
        const { _id } = req.user
        const { bookid } = req.headers;
        const userdata = await User.findById(_id)
        const isbookincart = userdata.cart.includes(bookid)
        if (isbookincart) {
            return res.status(200).json({
                status: "succes",
                message: "book alredy in cart"
            })
        }
        await User.findByIdAndUpdate(_id, { $push: { cart: bookid } })
        return res.json({
            status: "success",
            message: "successfully added"
        })
    } catch (error) {

    }
})

// ! REMOVING ITEMS FROM THE CART 
cartrouter.put("/rem-from-cart/:bookid", authntication2, async (req, res) => {
    try {
        const { _id } = req.user
        const { bookid } = req.params;
        const userdata = await User.findById(_id)
        console.log(userdata)
        const isbookincart = userdata.cart.includes(bookid);
        console.log(isbookincart)
        if (!isbookincart) {
            return res.json({
                status: "success",
                message: "does not have anything"
            })
        }

        await User.findByIdAndUpdate(_id, { $pull: { cart: bookid } })
        return res.json({
            status: "success",
            message: "successfully removed"
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error in remvoing items from the cart "
        })
    }
})

//! getting all cart items for a particular user 
cartrouter.get("/get-cart-item", authntication2, async (req, res) => {
    try {
        const { _id } = req.user

        const userdata = await User.findById(_id).populate("cart")
        const cartdata = userdata.cart.reverse()

        return res.json({
            status: "success",
            data: cartdata
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error getting all cart data "
        })
    }
})


export default cartrouter