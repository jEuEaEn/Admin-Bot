import { pool } from "../Config/Db.js"

export const getMaterias = async () => {
    const [rows] = await pool.query("SELECT * FROM materias")
    return rows
}

export const postMateria = async (nombre, id_curso) => {
    const [result] = await pool.query(
        `INSERT INTO materias (id, nombre, id_curso)
         VALUES (UUID(), ?, ?)`,
        [nombre, id_curso]
    )
    return result
}