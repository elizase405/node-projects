import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import { db } from "../db/db.js";

//SIGN UP
const signup = async (req, res) => {
    const { username, password } = req.body;

    await db.read()
    const existingUser = db.data.users.find(user => user.username === username)
    if (existingUser)
        return res.status(400).json({ error: "Username already taken." })

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: uuidv4(),
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    }

    db.data.users.push(newUser);
    await db.write()

    res.status(201).json({ message: "User created successfully." })
}

// LOGIN
const login = async (req, res) => {
    const { username, password } = req.body;

    await db.read();
    const user = db.data.users.find(user => user.username === username);

    if (!user) return res.status(404).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
    );

    res.json({ message: "Login successful", token })
}

export { signup, login };