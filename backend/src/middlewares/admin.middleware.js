import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const verifyAdmin = AsyncHandler(async (req, _, next) => {
  const role = req.user.role;

  if (role !== "ADMIN") {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  next();
});

export default verifyAdmin;
