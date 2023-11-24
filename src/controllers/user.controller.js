import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryFileUploader } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //  take user details
  //validate users
  //check if users already exists
  //   check for avatar
  // send file to cloudinary
  // create user object id, entry in db
  // remove password and refresh token field
  // check for user creation
  // return res

  const { username, email, fullname, password } = req.body;
  // console.log(req.body);

  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields is required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  // console.log(existedUser);

  if (existedUser) {
    throw new ApiError(409, "User with Email or Username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(avatarLocalPath);
  console.log(req.files);

  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await cloudinaryFileUploader(avatarLocalPath);
  // console.log(avatar);

  const coverImage = await cloudinaryFileUploader(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is requiredddddd");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );
  // console.log(createdUser);

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
