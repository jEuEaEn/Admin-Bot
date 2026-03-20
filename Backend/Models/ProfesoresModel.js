import { pool } from "../Config/Db.js"

export const getProfesores = async () => {
    const [rows] = await pool.query("SELECT * FROM profesores")
    return rows
}

export const postProfesor = async (nombres, apellidos, especialidad, telefono) => {
    const [result] = await pool.query(
        `INSERT INTO profesores (id, nombres, apellidos, especialidad, telefono)
         VALUES (UUID(), ?, ?, ?, ?)`,
        [nombres, apellidos, especialidad, telefono]
    )
    return result
}