import jwt from "jsonwebtoken"
const authntication = (req, res, next) => {
    try {
        const token = req.cookies?.token
        if (token === "") {
            return res.status(400).json({
                message: "user is not logged in",
                error: true,
                success: false
            })
        } else {
            jwt.verify(token, process.env.SECRET, (err, user) => {
                if (err) {
                    return res.status(401).json(err)
                }
                req.user = user
                next()
            })
        }

    } catch (error) {
        console.log((error, "error in middleware"))
    }
}
export default authntication