import { request } from "../../shared/js/api.js";
import { obtenerUsuario, cerrarUsuario } from "../../shared/js/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
    const usuario = obtenerUsuario();

    if (!usuario) {
        window.location.href = "../auth/index.html";
        return;
    }

    // Actualizar mensajes
    document.getElementById("user-name").textContent = usuario.name;
    document.getElementById("welcome-message").textContent = `Bienvenido, ${usuario.user.name}`;

    // Logout
    document.getElementById("logout-btn").addEventListener("click", () => {
        cerrarUsuario();
        window.location.href = "../auth/index.html";
    });

    // Cargar datos
    try {
        const response = await request("/dashBoard");
        if (response.ok) {
            const { totalStudents, pendingPayments, absencesToday } = response.dashboard;
            document.getElementById("total-students").textContent = totalStudents;
            document.getElementById("pending-payments").textContent = pendingPayments;
            document.getElementById("absences-today").textContent = absencesToday;
        }
    } catch (err) {
        console.error("Error al cargar datos:", err);
    }

    // Inicializar Gráficos
    initCharts();
});

function initCharts() {
    const ctxAttendance = document.getElementById('attendanceChart').getContext('2d');
    new Chart(ctxAttendance, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            datasets: [{
                label: 'Asistencia %',
                data: [95, 88, 92, 85, 90, 80],
                borderColor: '#46b0ff',
                backgroundColor: 'rgba(70, 176, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    const ctxPayments = document.getElementById('paymentsChart').getContext('2d');
    new Chart(ctxPayments, {
        type: 'doughnut',
        data: {
            labels: ['Al día', 'Pendiente', 'Mora'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#4dff88', '#ffcc4d', '#ff4d4d'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#95a7d1' } }
            }
        }
    });
}