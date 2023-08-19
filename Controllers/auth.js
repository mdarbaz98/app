import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
import dotenv from 'dotenv';
import { pool } from "../database/config.js";
dotenv.config()

export const register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            profile_picture,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        pool.query(`
                insert into
                user 
                (firstName,
                lastName,
                email,
                password,
                profilePicture,
                friends,
                location,
                occupation)
                values 
                (?,?,
                ?,?,
                ?,?,
                ?,?)`,
            [
                first_name,
                last_name,
                email,
                passwordHash,
                profile_picture,
                friends,
                location,
                occupation,
            ],
            (err, result) => {
                if (err) return res.status(500).json({error: err.message})
                res.status(201).json(result);
            }
        );

        pool.releaseConnection();

    } catch (error) { res.status(500).json({error: error.message}) }
};


// loggin 

export const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const query = 'SELECT * FROM user WHERE email = ?';

        pool.query(query,[email], async (err, result) => {
            if(err) return res.status(500).json({error: err.message});
            if (result.length === 0) {
                res.status(200).json({message: "No User with This Email."})
            } else {
                const existedPassword = result[0].password;
                const existedId = result[0].id;
                const isMatch = await bcrypt.compare(password, existedPassword);
                if(!isMatch) return res.status(400).json({message: "Invalid Credtials."})
                const token = JsonWebToken.sign({id: existedId}, process.env.JWT_SECRET)
                res.status(200).json({token,result})
            }
        })

        pool.releaseConnection();

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}