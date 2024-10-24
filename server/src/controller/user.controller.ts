import Asynchandler from "../lib/AsyncHandler";
import ResponseApi from "../lib/ResponseHandler";
import UserModel from "../model/User.model";

export const getUser = Asynchandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select(
      "-password -refreshToken"
    );

    return ResponseApi(res, 200, "Get.", user);
  } catch (error) {
    throw error;
  }
});
