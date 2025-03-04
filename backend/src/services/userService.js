import "dotenv/config";
import bcrypt from 'bcryptjs';
import db from "../db/db.js";
import usersTable from '../db/schema/userSchema.js';
import jwt from "jsonwebtoken";

import { eq } from "drizzle-orm";
import ApiError from "../utils/ApiError.js";



class UserService {
    static async register(email, password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let user = await db.insert(usersTable).values({email: email, password: hashedPassword }).returning({insertedId: usersTable.id});

            if (!user || user.length === 0) {
                throw ApiError.internal("User registration failed");
            }
            
            const token = jwt.sign({ id: user[0].insertedId }, process.env.TOKEN_SECRET);
            return token;
        } catch (error) {
            if (error.message.includes("duplicate key") || error.message.includes("UNIQUE constraint")) {
                throw ApiError.badRequest("User with this email already exists");
            }
            throw error;
        }
    }

    static async login(email, password) {
        const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

        if (user.length === 0) {
            throw ApiError.unauthorized("User not found");
        } 

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            throw ApiError.unauthorized("Incorrect email or password");
        }
        
        const token = jwt.sign({id: user[0].id}, process.env.TOKEN_SECRET);
        return token;
    }
}

export default UserService;