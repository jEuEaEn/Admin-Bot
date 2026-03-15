import { pool } from "../Config/Db.js"

export const getStudents = async () => {

    const [rows] = await pool.query("SELECT * FROM estudiantes")

    return rows

}

export const postStudent = async (
    codigo_estudiante,
    nombres,
    apellidos,
    tipo_documento,
    numero_documento,
    fecha_nacimiento,
    grado,
    anio_lectivo
) => {

    const [result] = await pool.query(

        `INSERT INTO estudiantes
        (id, codigo_estudiante, nombres, apellidos, tipo_documento, numero_documento, fecha_nacimiento, grado, anio_lectivo)
        VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)`,
        
        [
            codigo_estudiante,
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            grado,
            anio_lectivo
        ]
    )

    return result
}