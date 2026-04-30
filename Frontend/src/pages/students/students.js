import { request } from "../../shared/js/api.js";

let allStudents = [];
let filteredStudents = [];

// ============================================================================
// Initialize on DOM Load
// ============================================================================
document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Inicializando módulo de estudiantes...");

    // Small delay to ensure all DOM elements are ready
    await new Promise(resolve => setTimeout(resolve, 100));

    initializeEventListeners();
    await loadStudents();

    console.log("✅ Módulo de estudiantes inicializado");
});

// ============================================================================
// Initialize Event Listeners
// ============================================================================
function initializeEventListeners() {
    console.log("🔧 Configurando event listeners...");

    // Modal controls
    const btnNewStudent = document.getElementById("btnNewStudent");
    const btnCancel = document.getElementById("btnCancel");
    const closeBtn = document.getElementById("closeModal");
    const modal = document.getElementById("modalNewStudent");

    console.log("🔍 Elementos encontrados:", {
        btnNewStudent: !!btnNewStudent,
        btnCancel: !!btnCancel,
        closeBtn: !!closeBtn,
        modal: !!modal
    });

    if (!btnNewStudent || !btnCancel || !closeBtn || !modal) {
        console.error("❌ Error: No se encontraron elementos necesarios del modal");
        return;
    }

    btnNewStudent.addEventListener("click", () => {
        console.log("👆 Click en 'Nuevo Estudiante'");
        openModal();
    });

    btnCancel.addEventListener("click", () => {
        console.log("👆 Click en 'Cancelar'");
        closeModalWindow();
    });

    closeBtn.addEventListener("click", () => {
        console.log("👆 Click en botón cerrar (X)");
        closeModalWindow();
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModalWindow();
        }
    });

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => filterStudents(e.target.value));
    }

    // Form submission
    const form = document.getElementById("formNewStudent");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
}

// ============================================================================
// Load Students from API
// ============================================================================
async function loadStudents() {
    try {
        const tbody = document.getElementById("studentsBody");
        const loadingRow = tbody.querySelector(".loading-row");

        console.log("📦 Obteniendo estudiantes del API...");
        const response = await request("/students");

        console.log("✅ Respuesta del API:", response);

        allStudents = Array.isArray(response) ? response : response.data || [];
        filteredStudents = [...allStudents];

        console.log(`📊 Total de estudiantes cargados: ${allStudents.length}`);

        // Remove loading row
        if (loadingRow) {
            loadingRow.remove();
        }

        renderStudents(filteredStudents);
        updateStudentCount();
    } catch (error) {
        console.error("❌ Error al cargar estudiantes:", error);
        showToast("Error al cargar los estudiantes", "error");
        renderError();
    }
}

// ============================================================================
// Render Students in Table
// ============================================================================
function renderStudents(students) {
    const tbody = document.getElementById("studentsBody");
    const emptyState = document.getElementById("emptyState");

    tbody.innerHTML = "";

    if (students.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(student.codigo_estudiante || "—")}</td>
            <td>${escapeHtml(student.nombres || "")} ${escapeHtml(student.apellidos || "")}</td>
            <td>${escapeHtml(student.grado || "—")}</td>
            <td>${escapeHtml(student.tipo_documento || "")} ${escapeHtml(student.numero_documento || "")}</td>
            <td>${escapeHtml(student.anio_lectivo || "—")}</td>
            <td>
                <span class="status-badge status-${student.estado || "activo"}">
                    ${formatStatus(student.estado)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action" title="Ver detalles">👁️</button>
                    <button class="btn-action" title="Editar">✏️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ============================================================================
// Filter Students
// ============================================================================
function filterStudents(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const searchInfo = document.getElementById("searchInfo");

    if (term === "") {
        filteredStudents = [...allStudents];
        searchInfo.textContent = "";
    } else {
        filteredStudents = allStudents.filter((student) => {
            const code = (student.codigo_estudiante || "").toLowerCase();
            const firstName = (student.nombres || "").toLowerCase();
            const lastName = (student.apellidos || "").toLowerCase();
            const fullName = `${firstName} ${lastName}`;

            return code.includes(term) || fullName.includes(term);
        });

        searchInfo.textContent = `${filteredStudents.length} resultado(s) encontrado(s)`;
    }

    renderStudents(filteredStudents);
    updateStudentCount();
}

// ============================================================================
// Update Student Count
// ============================================================================
function updateStudentCount() {
    const countElement = document.getElementById("studentCount");
    countElement.textContent = `Total: ${filteredStudents.length}`;
}

// ============================================================================
// Modal Management
// ============================================================================
function openModal() {
    console.log("📂 Abriendo modal...");
    const modal = document.getElementById("modalNewStudent");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        console.log("✅ Modal abierto");
    } else {
        console.error("❌ Modal no encontrado");
    }
}

function closeModalWindow() {
    console.log("📁 Cerrando modal...");
    const modal = document.getElementById("modalNewStudent");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
        console.log("✅ Modal cerrado");
    }
    const form = document.getElementById("formNewStudent");
    if (form) {
        form.reset();
    }
}

// ============================================================================
// Handle Form Submission
// ============================================================================
async function handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    console.log("📝 Enviando formulario de nuevo estudiante...");
    console.log("🔍 Form element:", form);
    console.log("🔍 Form ID:", form.id);

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = "Registrando...";

    try {
        // Gather form data - obtener valores directamente de los inputs
        const getValue = (id) => {
            const el = document.getElementById(id);
            return el ? el.value : null;
        };

        // Convertir ISO timestamp a formato MySQL (YYYY-MM-DD HH:MM:SS)
        const now = new Date();
        const mysqlDatetime = now.toISOString().slice(0, 19).replace('T', ' ');

        const studentData = {
            codigo_estudiante: getValue("studentCode"),
            nombres: getValue("firstName"),
            apellidos: getValue("lastName"),
            tipo_documento: getValue("documentType"),
            numero_documento: getValue("documentNumber"),
            fecha_nacimiento: getValue("birthDate"),
            grado: getValue("grade"),
            anio_lectivo: getValue("schoolYear"),
            estado: getValue("status"),
            created_at: mysqlDatetime,
            updated_at: mysqlDatetime,
        };

        console.log("📊 Datos a enviar:", studentData);

        // Validate required fields
        if (!validateStudentData(studentData)) {
            showToast("Por favor completa todos los campos requeridos", "error");
            submitBtn.disabled = false;
            submitBtn.textContent = "Registrar Estudiante";
            return;
        }

        // Send to API
        console.log("🚀 POST a /student...");
        const response = await request("/students", {
            method: "POST",
            body: JSON.stringify(studentData),
        });

        console.log("✅ Estudiante creado:", response);
        showToast("¡Estudiante registrado exitosamente!", "success");
        form.reset();
        closeModalWindow();

        // Reload students
        await loadStudents();
    } catch (error) {
        console.error("❌ Error al crear estudiante:", error);
        showToast(`Error: ${error.message}`, "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Registrar Estudiante";
    }
}

// ============================================================================
// Validation
// ============================================================================
function validateStudentData(data) {
    const requiredFields = [
        "codigo_estudiante",
        "nombres",
        "apellidos",
        "tipo_documento",
        "numero_documento",
        "fecha_nacimiento",
        "grado",
        "anio_lectivo",
        "estado",
    ];

    console.log("🔍 Validando datos:", data);
    console.log("🔍 Campos requeridos:", requiredFields);

    return requiredFields.every((field) => data[field] && data[field].toString().trim() !== "");
}

// ============================================================================
// Utility Functions
// ============================================================================
function formatStatus(status) {
    const statusMap = {
        active: "Activo",
        inactive: "Inactivo",
        suspended: "Suspendido",
    };
    return statusMap[status] || "Desconocido";
}

function escapeHtml(text) {
    // Convertir a string y manejar valores nulos o indefinidos
    if (!text && text !== 0) {
        return "—";
    }

    const str = String(text);
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return str.replace(/[&<>"']/g, (m) => map[m]);
}

// ============================================================================
// Toast Notifications
// ============================================================================
function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// ============================================================================
// Error Rendering
// ============================================================================
function renderError() {
    const tbody = document.getElementById("studentsBody");
    const emptyState = document.getElementById("emptyState");

    tbody.innerHTML = `
        <tr>
            <td colspan="7" style="text-align: center; padding: 40px; color: var(--danger-color);">
                Error al cargar los estudiantes. Por favor, intenta de nuevo.
            </td>
        </tr>
    `;
    emptyState.style.display = "none";
}