import { pool } from "../Config/Db.js"

export const getMatriculas = async () => {
    const [rows] = await pool.query("SELECT * FROM matriculas")
    return rows
}

export const postMatricula = async (id_estudiante, id_curso, fecha) => {
    const [result] = await pool.query(
        `INSERT INTO matriculas (id, id_estudiante, id_curso, fecha)
         VALUES (UUID(), ?, ?, ?)`,
        [id_estudiante, id_curso, fecha]
    )
    return result
}