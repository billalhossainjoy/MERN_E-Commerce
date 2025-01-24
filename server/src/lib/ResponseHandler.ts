import { Response } from "express";

const ResponseApi = (
  res: Response,
  status: number,
  message: string,
  data?: object | string | null
) => {
  return res.status(status).json({
    success: status > 0 && status < 400,
    message,
    data,
  });
};

export default ResponseApi;