import { pool } from "../Config/Db.js"

export const getStudents = async (req, res) => {

    try {

        const [rows] = await pool.query("SELECT * FROM estudiantes")

        res.json(rows)

    } catch (error) {

        res.status(500).json({
            message: "Error fetching students"
        })

    }

}

export const postStudent = async (req, res) => {

    try {

        const {
            codigo_estudiante,
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            grado,
            anio_lectivo
        } = req.body

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

        res.json({
            message: "Student created successfully",
            codigo_estudiante,
            nombres,
            apellidos
        })

    } catch (error) {

        res.status(500).json({
            message: "Error creating student"
        })

    }

}