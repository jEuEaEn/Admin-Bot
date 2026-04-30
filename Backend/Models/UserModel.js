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
    anio_lectivo,
    estado
) => {

    const [result] = await pool.query(

        `INSERT INTO estudiantes
        (codigo_estudiante, nombres, apellidos, tipo_documento, numero_documento, fecha_nacimiento, grado, anio_lectivo, estado, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        
        [
            codigo_estudiante,
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            grado,
            anio_lectivo,
            estado || 'activo'
        ]
    )

    return result
}