import { pool } from "../Config/Db.js"

export const getAcudientes = async () => {
    const [rows] = await pool.query("SELECT * FROM acudientes")
    return rows
}

export const postAcudiente = async (
    id_estudiante,
    nombres,
    apellidos,
    telefono,
    direccion
) => {
    const [result] = await pool.query(
        `INSERT INTO acudientes
        (id, id_estudiante, nombres, apellidos, telefono, direccion)
        VALUES (UUID(), ?, ?, ?, ?, ?)`,
        [
            id_estudiante,
            nombres,
            apellidos,
            telefono,
            direccion
        ]
    )
    return result
}