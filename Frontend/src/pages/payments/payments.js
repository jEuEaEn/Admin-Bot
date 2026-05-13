import { request } from "../../shared/js/api.js";
import { obtenerUsuario, cerrarUsuario } from "../../shared/js/storage.js";

let allPayments = [];
let filteredPayments = [];

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Inicializando módulo de pagos...");

    const usuario = obtenerUsuario();
    if (!usuario) {
        window.location.href = "../auth/index.html";
        return;
    }

    initializeEventListeners();
    await loadPaymentsData();

    console.log("✅ Módulo de pagos inicializado");
});

function initializeEventListeners() {
    console.log("🔧 Configurando event listeners de pagos...");

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            cerrarUsuario();
            window.location.href = "../auth/index.html";
        });
    }

    const btnNewPayment = document.getElementById("btnNewPayment");
    const btnCancel = document.getElementById("btnCancel");
    const closeBtn = document.getElementById("closeModal");
    const modal = document.getElementById("modalNewPayment");

    if (btnNewPayment) {
        btnNewPayment.addEventListener("click", () => {
            console.log("👆 Click en 'Nuevo Pago'");
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

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => filterPayments(e.target.value));
    }

    const statusFilter = document.getElementById("statusFilter");
    if (statusFilter) {
        statusFilter.addEventListener("change", () => filterByStatus());
    }
ent.getElementById("formNewPayment");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
}

// ============================================================================
// Load Payments Data
// ============================================================================
async function loadPaymentsData() {
    try {
        const tbody = document.getElementById("paymentsBody");
        if (!tbody) return;

        console.log("📦 Obteniendo datos de pagos...");
        const response = await request("/payments");

        console.log("✅ Respuesta del API:", response);

        allPayments = Array.isArray(response) ? response : response.data || [];
        filteredPayments = [...allPayments];

        console.log(`📊 Total de pagos: ${allPayments.length}`);

        renderPaymentsTable(filteredPayments);
        updatePaymentStats();

    } catch (err) {
        console.error("❌ Error al cargar pagos:", err);
        showNotification("Error al cargar pagos", "error");
    }
}

// ============================================================================
// Render Payments Table
// ============================================================================
function renderPaymentsTable(records) {
    const tbody = document.getElementById("paymentsBody");
    if (!tbody) return;

    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">No hay registros de pagos</td></tr>';
        return;
    }

    tbody.innerHTML = records.map(payment => `
        <tr>
            <td>${payment.studentName || 'N/A'}</td>
            <td>$${parseFloat(payment.amount || 0).toFixed(2)}</td>
            <td>${payment.date || new Date().toLocaleDateString()}</td>
            <td>
                <span class="status-badge ${payment.status === 'paid' ? 'paid' : payment.status === 'pending' ? 'pending' : 'overdue'}">
                    ${getStatusLabel(payment.status)}
                </span>
            </td>
            <td>${payment.method || 'Efectivo'}</td>
            <td>
                <button class="btn-action edit" onclick="editPayment('${payment.id}')">Editar</button>
                <button class="btn-action delete" onclick="deletePayment('${payment.id}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// ============================================================================
// Get Status Label
// ============================================================================
function getStatusLabel(status) {
    const labels = {
        'paid': '✓ Pagado',
        'pending': '⏳ Pendiente',
        'overdue': '⚠ Vencido'
    };
    return labels[status] || status;
}

// ============================================================================
// Update Payment Stats
// ============================================================================
function updatePaymentStats() {
    const totalPaid = allPayments
        .filter(p => p.status === 'paid')
        .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

    const totalPending = allPayments
        .filter(p => p.status === 'pending')
        .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

    const totalOverdue = allPayments
        .filter(p => p.status === 'overdue')
        .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

    const statTotal = document.getElementById("stat-total");
    const statPending = document.getElementById("stat-pending");
    const statOverdue = document.getElementById("stat-overdue");

    if (statTotal) statTotal.textContent = `$${(totalPaid + totalPending + totalOverdue).toFixed(2)}`;
    if (statPending) statPending.textContent = `$${totalPending.toFixed(2)}`;
    if (statOverdue) statOverdue.textContent = `$${totalOverdue.toFixed(2)}`;
}

// ============================================================================
// Filter Payments
// ============================================================================
function filterPayments(searchTerm) {
    filteredPayments = allPayments.filter(payment =>
        payment.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id?.toString().includes(searchTerm)
    );
    renderPaymentsTable(filteredPayments);
}

// ============================================================================
// Filter by Status
// ============================================================================
function filterByStatus() {
    const statusFilter = document.getElementById("statusFilter");
    if (!statusFilter?.value) {
        filteredPayments = [...allPayments];
    } else {
        filteredPayments = allPayments.filter(payment =>
            payment.status === statusFilter.value
        );
    }
    renderPaymentsTable(filteredPayments);
}

// ============================================================================
// Modal Management
// ============================================================================
function openModal() {
    const modal = document.getElementById("modalNewPayment");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeModalWindow() {
    const modal = document.getElementById("modalNewPayment");
    if (modal) {
        modal.style.display = "none";
    }
    const form = document.getElementById("formNewPayment");
    if (form) form.reset();
}

// ============================================================================
// Handle Form Submit
// ============================================================================
async function handleFormSubmit(e) {
    e.preventDefault();
    console.log("📤 Enviando formulario de pago...");

    try {
        const formData = new FormData(this);
        const newPayment = {
            studentId: formData.get("studentId"),
            amount: parseFloat(formData.get("amount")),
            date: formData.get("date") || new Date().toISOString().split('T')[0],
            status: formData.get("status") || "pending",
            method: formData.get("method") || "Efectivo",
            reference: formData.get("reference") || ""
        };

        console.log("📝 Datos a enviar:", newPayment);

        const response = await request("/payments", {
            method: "POST",
            body: newPayment
        });

        console.log("✅ Respuesta:", response);

        showNotification("Pago registrado exitosamente", "success");
        closeModalWindow();
        await loadPaymentsData();

    } catch (err) {
        console.error("❌ Error al registrar pago:", err);
        showNotification("Error al registrar pago", "error");
    }
}

// ============================================================================
// Edit Payment
// ============================================================================
window.editPayment = async function(paymentId) {
    console.log("✏️ Editando pago:", paymentId);
    showNotification("Funcionalidad de edición en desarrollo", "info");
}

// ============================================================================
// Delete Payment
// ============================================================================
window.deletePayment = async function(paymentId) {
    if (!confirm("¿Está seguro de que desea eliminar este pago?")) return;

    try {
        await request(`/payments/${paymentId}`, { method: "DELETE" });
        showNotification("Pago eliminado exitosamente", "success");
        await loadPaymentsData();
    } catch (err) {
        console.error("❌ Error al eliminar:", err);
        showNotification("Error al eliminar pago", "error");
    }
}

// ============================================================================
// Notifications
// ============================================================================
function showNotification(message, type = "info") {
    console.log(`📢 [${type.toUpperCase()}] ${message}`);
    alert(message);
}