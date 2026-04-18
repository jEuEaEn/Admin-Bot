import { pool } from "../Config/Db.js";

export const getDashboardData = async ()=>{

    const [students] = await pool.query("SELECT COUNT(*) AS total FROM estudiantes")

    const [payment] = await pool.query(
        `SELECT COUNT(*) AS total
        FROM cuentas_por_cobrar
        WHERE estado = 'pendiente'`
    )

    const [absencesToday] = await pool.query(`
        
        SELECT COUNT(*) AS total
        FROM asistencias
        WHERE fecha = CURDATE()
        AND estado = 'falla'

        `)


    return{
        totalStudents: students[0].total,
        pendingPayments: payment[0].total,
        absencesToday: absencesToday[0].total
    }

}