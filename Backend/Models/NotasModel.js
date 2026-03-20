import { pool } from "../Config/Db.js"

export const getNotas = async () => {
    const [rows] = await pool.query("SELECT * FROM notas")
    return rows
}

export const postNota = async (id_estudiante, id_materia, nota) => {
    const [result] = await pool.query(
        `INSERT INTO notas (id, id_estudiante, id_materia, nota)
         VALUES (UUID(), ?, ?, ?)`,
        [id_estudiante, id_materia, nota]
    )
    return result
}