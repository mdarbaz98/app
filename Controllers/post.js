import { query } from "express";
import { pool } from "../database/config.js";


export const addPost = async (req, res) => {
    try {

        const {
            user_id,
            image,
            title,
            content
        } = req.body ;

        const addQuery = `INSERT INTO post (
            user_id,
            image,
            title,
            content
        ) VALUES (
            ?,?,?,?
        )` ;

        pool.query(addQuery, [user_id, image, title, content], (err, result) => {
            if(err) res.status(500).json({error : err.message});
            res.status(201).json(result);
        })

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getPost = async (req, res) => {
    try {

        const { user_Id } = req.params;
        let getQuery = `SELECT * FROM post WHERE user_id = ?`;

        pool.query(getQuery, [user_Id], (err, result) => {
            if(err) res.status(500).json({error : err.message});
            res.status(201).json(result);
        });

    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
}

export const getALLPosts = async (req, res) => {
try {

} catch (error) {
    res.status(500).json({error:error.message})
}
}

export const likePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const { user_id } = req.body;
        let postExistQuery = `SELECT * FROM post WHERE post_id = ?`
        pool.query(postExistQuery, [post_id], (postError, postResult) => {
            let getQuery = `SELECT * FROM like_table WHERE user_id = ? AND post_id = ?`;

        pool.query(getQuery, [user_id, post_id], (err, result) => {
            if(err) res.status(500).json({error : err.message});
            if (result.length === 0) {
                let likeQuery = `INSERT INTO like_table (
                    user_id,
                    post_id,
                    like_status
                ) VALUES (?,?,DEFAULT)`;
                pool.query(likeQuery, [user_id, post_id], (err, likeAddedResult) => {
                if(err) res.status(500).json({error : err.message});
                res.status(201).json(likeAddedResult);
                })
            } else {

                res.status(200).json(result);
            }
        });
        })
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const deletePost = async (req, res) => {

}