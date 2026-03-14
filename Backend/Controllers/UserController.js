import { getAllStudents, createStudent } from "../models/students.model.js"

export const getStudents = async (req, res) => {

    try {

        const students = await getAllStudents()

        res.json(students)

    } catch (error) {

        res.status(500).json({ message: "Error fetching students" })

    }

}

export const postStudent = async (req, res) => {

    try {

        const result = await createStudent(req.body)

        res.json(result)

    } catch (error) {

        res.status(500).json({ message: "Error creating student" })

    }

}