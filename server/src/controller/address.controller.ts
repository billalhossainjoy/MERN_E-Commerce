import Asynchandler from "../lib/AsyncHandler";
import ErrorApi from "../lib/CustomError";
import ResponseApi from "../lib/ResponseHandler";
import AddressModel from "../model/address.model";
import { AddressSchema } from "../schema/address.schema";

const addAddress = Asynchandler(async (req, res) => {
  try {
    const { username, _id } = req.user;
    const totalAddress = await AddressModel.find({ userId: _id });
    if (totalAddress.length >= 4)
      throw new ErrorApi(403, "Max address limit reached");
    console.log(totalAddress);
    const addressData = AddressSchema.parse(req.body);
    const createdAddress = await AddressModel.create({
      ...addressData,
      name: username,
      userId: req.user._id,
    });
    return ResponseApi(res, 200, "Address created", createdAddress);
  } catch (error) {
    throw error;
  }
});

const editAddress = Asynchandler(async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { addressId } = req.params;
    if (!addressId) throw new ErrorApi(401, "invalid address");
    const addressData = AddressSchema.parse(req.body);

    const address = await AddressModel.findOneAndUpdate(
      { _id: addressId, userId },
      addressData,
      { new: true }
    );

    if (!address) throw new ErrorApi(404, "Address not found");

    return ResponseApi(res, 200, "Address updated", address);
  } catch (error) {
    throw error;
  }
});

const fetchAllAddress = Asynchandler(async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const addresses = await AddressModel.find({ userId });
    return ResponseApi(res, 200, "ok", addresses);
  } catch (error) {
    throw error;
  }
});

const deleteAddress = Asynchandler(async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { addressId } = req.params;
    if (!addressId) throw new ErrorApi(401, "Invalid address");
    const deleteAddress = await AddressModel.findOneAndDelete({
      _id: addressId,
      userId,
    });
    return ResponseApi(res, 200, "Address deleted", deleteAddress);
  } catch (error) {
    throw error;
  }
});

export { addAddress, editAddress, fetchAllAddress, deleteAddress };
