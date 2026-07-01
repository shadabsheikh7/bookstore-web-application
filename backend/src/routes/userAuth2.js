import jwt from "jsonwebtoken";
const authntication2 = (req, res, next) => {
  try {
    const bearer_token = req.headers["authorization"];
    //console.log(bearer_token);

    // bearer 23456789fdgsdge7e9ew9ew09

    const token = bearer_token && bearer_token.split(" ")[1];
    // console.log(token);

    // 23456789fdgsdge7e9ew9ew09

    if (token === "") {
      return res.status(400).json({
        message: "user is not logged in",
        error: true,
        success: false,
      });
    } else {
      // jwt.verify(token, process.env.SECRET, (err, user) => {
      //   if (err) {
      //     return res.status(401).json(err);
      //   }
      //   req.user = user;
      //   next();
      // });
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid or expired token",
            error: true,
            success: false,
          });
        }
        req.user = user; // Pass user data to next middleware
        next();
      });
    }
  } catch (error) {
    console.log((error, "error in middleware"));
  }
};
export default authntication2;
