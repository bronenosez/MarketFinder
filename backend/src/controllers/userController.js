import UserService from "../services/userService.js";
import registerSchema from "../validation/registerSchema.js";



class UserController {
    static async register(request, response) {
        try {
            const value = await registerSchema.validateAsync(request.body);
            const token = await UserService.register(value.email, value.password);

            response.json(token);
        } catch (error) {
            response.json(error);
        }
    }

    static async login(request, response) {

    }
}

export default UserController;