import "dotenv/config";
import bcrypt from 'bcryptjs';
import db from "../db/db.js";
import usersTable from '../db/schema/userSchema.js';
import jwt from "jsonwebtoken";

class UserService {
    static async register(email, password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        let user = await db.insert(usersTable).values({email: email, password: hashedPassword }).returning({insertedId: usersTable.id});

     
        let payload = {
            id: user[0].insertedId,
        };

        // Генерируем токен
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        return token;
    }

    
}

export default UserService;