import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

  // console.log(req.headers.authorization);
  // const token = req.headers.authorization?.split(" ")[1];
  // if (!token) return res.status(401).json({ message: "Unauthorized" });

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log("Decoded token:", decoded);
  //   req.user = decoded;
  //   next();
  // } catch {
  //   res.status(401).json({ message: "Invalid token" });
  // }
};

export default auth;
