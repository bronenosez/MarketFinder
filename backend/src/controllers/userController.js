import UserService from "../services/userService.js";
import registerSchema from "../validation/registerSchema.js";
import loginSchema from "../validation/loginSchema.js";
import ApiError from "../utils/ApiError.js";

class UserController {
    static async register(request, response, next) {
        try {
            const value = await registerSchema.validateAsync(request.body);
            const token = await UserService.register(value.email, value.password);

            response.json({
                success: true,
                data: token
            });
        } catch (error) {
            if (error.isJoi) {
                return next(ApiError.badRequest("Validation error", error.details));
            }
            next(error);
        }
    }

    static async login(request, response, next) {
        try {
            const value = await loginSchema.validateAsync(request.body);
            const result = await UserService.login(value.email, value.password);

            response.json({
                success: true,
                data: result
            });
        } catch (error) {
            if (error.isJoi) {
                return next(ApiError.badRequest("Validation error", error.details));
            }
            next(error);
        }
    }
}

export default UserController;