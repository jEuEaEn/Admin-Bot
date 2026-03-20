import { pool } from "../Config/Db.js"

export const getCursos = async () => {
    const [rows] = await pool.query("SELECT * FROM cursos")
    return rows
}

export const postCurso = async (nombre, grado, id_profesor) => {
    const [result] = await pool.query(
        `INSERT INTO cursos (id, nombre, grado, id_profesor)
         VALUES (UUID(), ?, ?, ?)`,
        [nombre, grado, id_profesor]
    )
    return result
}