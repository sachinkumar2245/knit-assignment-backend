import {User} from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};


export const register = async (req, res) => {
  try {
  
    const { username, email, password } = req.body;
  
    await User.create({ username, email, password });
  
    res.status(201).json({ message: "User registered" });
} catch (error) {
  res.status(500).json({ message: error.message});
}
};

export const login = async (req, res) => {

  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  
    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(user._id);
  
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };
  
  
    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        user: loggedInUser
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


//logout controller

export const logout = async (req, res) => {
  // user is already authenticated via auth middleware
  const userId = req.user.id;

  // remove refresh token from DB
  await User.findByIdAndUpdate(userId, {
    $unset: { refreshToken: 1 }
  });

  // clear cookies
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};
