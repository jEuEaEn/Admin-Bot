import { request } from "../../shared/js/api.js";
import { obtenerUsuario, cerrarUsuario } from "../../shared/js/storage.js";

let allRecords = [];
let filteredRecords = [];

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Inicializando módulo de asistencia...");

    const usuario = obtenerUsuario();
    if (!usuario) {
        window.location.href = "../auth/index.html";
        return;
    }

    initializeEventListeners();
    await loadAttendanceData();

    console.log("✅ Módulo de asistencia inicializado");
});

function initializeEventListeners() {

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            cerrarUsuario();
            window.location.href = "../auth/index.html";
        });
    }

    const btnNewAttendance = document.getElementById("btnNewAttendance");
    const btnCancel = document.getElementById("btnCancel");
    const closeBtn = document.getElementById("closeModal");
    const modal = document.getElementById("modalNewAttendance");

    if (btnNewAttendance) {
        btnNewAttendance.addEventListener("click", () => {
            console.log("👆 Click en 'Nueva Asistencia'");
            openModal();
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener("click", () => {
            console.log("👆 Click en 'Cancelar'");
            closeModalWindow();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            console.log("👆 Click en botón cerrar (X)");
            closeModalWindow();
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModalWindow();
            }
        });
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => filterAttendance(e.target.value));
    }

    const form = document.getElementById("formNewAttendance");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }

    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter) {
        dateFilter.addEventListener("change", () => filterByDate());
    }
}

async function loadAttendanceData() {
    try {
        const tbody = document.getElementById("attendanceBody");
        if (!tbody) return;

        console.log("📦 Obteniendo datos de asistencia...");
        const response = await request("/students");

        console.log("✅ Respuesta del API:", response);

        allRecords = Array.isArray(response) ? response : response.data || [];
        filteredRecords = [...allRecords];

        console.log(`📊 Total de registros: ${allRecords.length}`);

        renderAttendanceTable(filteredRecords);

    } catch (err) {
        console.error("❌ Error al cargar asistencia:", err);
        showNotification("Error al cargar asistencia", "error");
    }
}

function renderAttendanceTable(records) {
    const tbody = document.getElementById("attendanceBody");
    if (!tbody) return;

    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">No hay registros de asistencia</td></tr>';
        return;
    }

    tbody.innerHTML = records.map(record => `
        <tr>
            <td>${record.studentName || 'N/A'}</td>
            <td>${record.course || 'N/A'}</td>
            <td>${record.date || new Date().toLocaleDateString()}</td>
            <td>
                <span class="status-badge ${record.status === 'present' ? 'present' : 'absent'}">
                    ${record.status === 'present' ? '✓ Presente' : '✗ Ausente'}
                </span>
            </td>
            <td>
                <button class="btn-action edit" onclick="editRecord('${record.id}')">Editar</button>
                <button class="btn-action delete" onclick="deleteRecord('${record.id}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function filterAttendance(searchTerm) {
    filteredRecords = allRecords.filter(record =>
        record.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.course?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderAttendanceTable(filteredRecords);
}

function filterByDate() {
    const dateFilter = document.getElementById("dateFilter");
    if (!dateFilter?.value) {
        filteredRecords = [...allRecords];
    } else {
        filteredRecords = allRecords.filter(record =>
            record.date === dateFilter.value
        );
    }
    renderAttendanceTable(filteredRecords);
}

function openModal() {
    const modal = document.getElementById("modalNewAttendance");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeModalWindow() {
    const modal = document.getElementById("modalNewAttendance");
    if (modal) {
        modal.style.display = "none";
    }
    const form = document.getElementById("formNewAttendance");
    if (form) form.reset();
}

async function handleFormSubmit(e) {
    e.preventDefault();
    console.log("📤 Enviando formulario de asistencia...");

    try {
        const formData = new FormData(this);
        const newRecord = {
            studentId: formData.get("studentId"),
            courseId: formData.get("courseId"),
            date: formData.get("date") || new Date().toISOString().split('T')[0],
            status: formData.get("status")
        };

        console.log("📝 Datos a enviar:", newRecord);

        const response = await request("/attendance", {
            method: "POST",
            body: newRecord
        });

        console.log("✅ Respuesta:", response);

        showNotification("Asistencia registrada exitosamente", "success");
        closeModalWindow();
        await loadAttendanceData();

    } catch (err) {
        console.error("❌ Error al registrar asistencia:", err);
        showNotification("Error al registrar asistencia", "error");
    }
}

window.editRecord = async function(recordId) {
    console.log("✏️ Editando registro:", recordId);
    showNotification("Funcionalidad de edición en desarrollo", "info");
}

window.deleteRecord = async function(recordId) {
    if (!confirm("¿Está seguro de que desea eliminar este registro?")) return;

    try {
        await request(`/attendance/${recordId}`, { method: "DELETE" });
        showNotification("Registro eliminado exitosamente", "success");
        await loadAttendanceData();
    } catch (err) {
        console.error("❌ Error al eliminar:", err);
        showNotification("Error al eliminar registro", "error");
    }
}

// ============================================================================
// Notifications
// ============================================================================
