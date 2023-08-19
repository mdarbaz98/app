import { pool } from "../database/config.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        let query = "SELECT * FROM user WHERE user_id = ?";
        pool.query(query, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) {
                res.status(404).json({ message: "No User Found!." });
            } else {
                res.status(200).json(result);
            }
        });
        pool.releaseConnection();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;

        let query = "SELECT * FROM friends WHERE user_id IN (?)";

        pool.query(query, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) {
                res.status(404).json({ message: "No Friends For This User!." });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        const { first_name, last_name, profile_picture, location, occupation } =
            req.body;

        let selectQuery = `SELECT * FROM friends WHERE user_id = ? AND friends_id = ?`;

        pool.query(selectQuery, [id, friendId], (err, outterResult) => {
            if (err) return res.status(500).json({ error: err.message });
            if (outterResult.length === 0) {
                pool.query(
                    query,
                    [
                        id,
                        friendId,
                        first_name,
                        last_name,
                        profile_picture,
                        location,
                        occupation,
                    ],
                    (err, result) => {
                        if (err) return res.status(500).json({ error: err.message });
                        res.status(201).json(result);
                    }
                );
            } else {
                res.status(200).json({ message: "Alread Friend!." });
            }
        });

        let query = `INSERT INTO friends (
            user_id,
            friends_id,
            first_name,
            last_name,
            profile_picture,
            location,
            occupation
        ) VALUES (?,?,?,
            ?,?,?,?)`;

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        let deleteQuery = `DELETE FROM friends WHERE friends_id = ?`;

        pool.query(deleteQuery, [friendId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
