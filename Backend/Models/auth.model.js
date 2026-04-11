import { pool } from "../Config/Db.js"

export const FindUserByEmail = async (email) =>{

    const [rows] = await pool.query("SELECT, id, nombres, apellidos, correo, password_hash FROM usuarios WHERE = ?", [email])

    return rows[0];

}