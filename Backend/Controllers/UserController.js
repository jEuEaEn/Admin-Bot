import { getStudents, postStudent } from "../Models/UserModel.js"

export const getStudentsController = async (req, res) => {

    try {

        const students = await getStudents()

        res.json(students)

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: `Error creating student el error es:  ${error.message}`
        })

    }

}

export const createStudentController = async (req, res) => {

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

        await postStudent(
            codigo_estudiante,
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            grado,
            anio_lectivo
        )

        res.json({
            message: "Student created successfully"
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: `Error creating student el error es:  ${error.message}`
        })

    }

}