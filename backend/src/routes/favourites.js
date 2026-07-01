import express from "express";
import authntication2 from "./userAuth2.js";
import User from "../models/user.js";
import Books from "../models/books.js";
const favouriterouter = express.Router()
// ! adding book to favourite 
favouriterouter.put("/add-to-fav", authntication2, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const { _id } = req.user
        console.log("req.user", req.user)
        const userfind = await User.findById(_id)
        console.log("id--0000 ---", _id)
        const isfavourite = userfind.favourites.includes(bookid)

        if (isfavourite) {
            return res.status(200).json({
                message: "already exists in favourite"
            })
        }

        await User.findByIdAndUpdate(_id, { $push: { favourites: bookid } })
        return res.status(200).json({
            message: "book added into the favourites"
        })

    } catch (error) {
        return res.status(500).json({
            message: "unable to add in favourites",
            error: error.message
        })
    }
})
// ! removing book from favourite 
favouriterouter.put("/rem-from-fav", authntication2, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const { _id } = req.user
        const userfind = await User.findById(_id)
        const isfavourite = userfind.favourites.includes(bookid)

        if (isfavourite) {
            await User.findByIdAndUpdate(_id, { $pull: { favourites: bookid } })

        }
        return res.status(200).json({
            message: "book removed from the favourites"
        })

    } catch (error) {
        return res.status(500).json({
            message: "unable to remove book from the favourite favourites",
            error: error.message
        })
    }
})

// !get all book from favourite
favouriterouter.get("/get-fav", authntication2, async (req, res) => {
    try {

        const { _id } = req.user
        const userdata = await User.findById(_id).populate("favourites")
        const bookdata = userdata.favourites;
        return res.status(201).json({
            data: bookdata,
            status: "success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
})


export default favouriterouter