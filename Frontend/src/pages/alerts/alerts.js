import { request } from "../../shared/js/api.js";
import { obtenerUsuario, cerrarUsuario } from "../../shared/js/storage.js";

let allAlerts = [];
let filteredAlerts = [];

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Inicializando módulo de alertas...");

    const usuario = obtenerUsuario();
    if (!usuario) {
        window.location.href = "../auth/index.html";
        return;
    }

    initializeEventListeners();
    await loadAlerts();

    setInterval(loadAlerts, 30000);

    console.log("✅ Módulo de alertas inicializado");
});

function initializeEventListeners() {
    console.log("🔧 Configurando event listeners de alertas...");

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            cerrarUsuario();
            window.location.href = "../auth/index.html";
        });
    }

    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            console.log("🔄 Actualizando alertas...");
            loadAlerts();
        });
    }

    const typeFilter = document.getElementById("typeFilter");
    if (typeFilter) {
        typeFilter.addEventListener("change", () => filterByType());
    }

    const statusFilter = document.getElementById("statusFilter");
    if (statusFilter) {
        statusFilter.addEventListener("change", () => filterByStatus());
    }

    const clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
        clearBtn.addEventListener("click", handleClearAlerts);
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => filterAlerts(e.target.value));
    }
}

// ============================================================================
// Load Alerts
// ============================================================================
async function loadAlerts() {
    try {
        console.log("📦 Obteniendo alertas...");

        const response = await request("/whatsapp/history");

        console.log("✅ Respuesta del API:", response);

        allAlerts = Array.isArray(response) ? response : response.data || [];
        filteredAlerts = [...allAlerts];

        console.log(`📊 Total de alertas: ${allAlerts.length}`);

        renderAlerts(filteredAlerts);
        updateAlertStats();

    } catch (err) {
        console.error("❌ Error al cargar alertas:", err);
        // Mostrar datos de prueba si hay error
        loadSampleAlerts();
    }
}

// ============================================================================
// Load Sample Alerts (for testing)
// ============================================================================
function loadSampleAlerts() {
    console.log("📋 Cargando alertas de ejemplo...");

    allAlerts = [
        {
            id: 1,
            type: "absence",
            studentName: "Juan Pérez",
            phone: "300 123 4567",
            message: "Inasistencia registrada",
            date: new Date(),
            status: "sent",
            icon: "📱"
        },
        {
            id: 2,
            type: "payment",
            studentName: "Ana García",
            phone: "301 234 5678",
            message: "Recordatorio de pago",
            date: new Date(Date.now() - 86400000),
            status: "sent",
            icon: "💰"
        }
    ];

    filteredAlerts = [...allAlerts];
    renderAlerts(filteredAlerts);
    updateAlertStats();
}

// ============================================================================
// Render Alerts
// ============================================================================
function renderAlerts(alerts) {
    const container = document.getElementById("alertsContainer");
    if (!container) return;

    if (alerts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>📭 No hay alertas</p>
            </div>
        `;
        return;
    }

    container.innerHTML = alerts.map(alert => `
        <div class="card alert-card alert-${alert.type}">
            <div class="alert-header">
                <div class="alert-icon">${getAlertIcon(alert.type)}</div>
                <div class="alert-info">
                    <strong>${getAlertTitle(alert.type)}: ${alert.studentName || 'N/A'}</strong>
                    <p class="alert-message">${alert.message || ''}</p>
                </div>
                <button class="btn-close" onclick="deleteAlert('${alert.id}')">✕</button>
            </div>
            <div class="alert-footer">
                <p>Mensaje enviado a: <strong>${alert.phone || 'N/A'}</strong></p>
                <span class="alert-time">${formatDate(alert.date)}</span>
                <span class="status-badge ${alert.status}">${getStatusLabel(alert.status)}</span>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// Get Alert Icon
// ============================================================================
function getAlertIcon(type) {
    const icons = {
        'absence': '📱',
        'payment': '💰',
        'event': '📢',
        'health': '⚕️',
        'behavior': '⚠️'
    };
    return icons[type] || '📩';
}

// ============================================================================
// Get Alert Title
// ============================================================================
function getAlertTitle(type) {
    const titles = {
        'absence': 'Inasistencia',
        'payment': 'Recordatorio de Pago',
        'event': 'Evento',
        'health': 'Alerta de Salud',
        'behavior': 'Reporte de Conducta'
    };
    return titles[type] || 'Alerta';
}

// ============================================================================
// Get Status Label
// ============================================================================
function getStatusLabel(status) {
    const labels = {
        'sent': '✓ Enviado',
        'pending': '⏳ Pendiente',
        'failed': '✗ Fallido',
        'read': '👁 Leído'
    };
    return labels[status] || status;
}

// ============================================================================
// Format Date
// ============================================================================
function formatDate(date) {
    if (!date) return 'Hace poco';

    const alertDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (alertDate.toDateString() === today.toDateString()) {
        const time = alertDate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        return `Hoy, ${time}`;
    } else if (alertDate.toDateString() === yesterday.toDateString()) {
        const time = alertDate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        return `Ayer, ${time}`;
    } else {
        return alertDate.toLocaleDateString('es-CO');
    }
}

// ============================================================================
// Update Alert Statistics
// ============================================================================
function updateAlertStats() {
    const totalAlerts = allAlerts.length;
    const sentAlerts = allAlerts.filter(a => a.status === 'sent').length;
    const failedAlerts = allAlerts.filter(a => a.status === 'failed').length;

    const statTotal = document.getElementById("stat-total");
    const statSent = document.getElementById("stat-sent");
    const statFailed = document.getElementById("stat-failed");

    if (statTotal) statTotal.textContent = totalAlerts;
    if (statSent) statSent.textContent = sentAlerts;
    if (statFailed) statFailed.textContent = failedAlerts;
}

// ============================================================================
// Filter Alerts
// ============================================================================
function filterAlerts(searchTerm) {
    filteredAlerts = allAlerts.filter(alert =>
        alert.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.phone?.includes(searchTerm) ||
        alert.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderAlerts(filteredAlerts);
}

// ============================================================================
// Filter by Type
// ============================================================================
function filterByType() {
    const typeFilter = document.getElementById("typeFilter");
    if (!typeFilter?.value) {
        filteredAlerts = [...allAlerts];
    } else {
        filteredAlerts = allAlerts.filter(alert =>
            alert.type === typeFilter.value
        );
    }
    renderAlerts(filteredAlerts);
}

// ============================================================================
// Filter by Status
// ============================================================================
function filterByStatus() {
    const statusFilter = document.getElementById("statusFilter");
    if (!statusFilter?.value) {
        filteredAlerts = [...allAlerts];
    } else {
        filteredAlerts = allAlerts.filter(alert =>
            alert.status === statusFilter.value
        );
    }
    renderAlerts(filteredAlerts);
}

// ============================================================================
// Delete Alert
// ============================================================================
window.deleteAlert = async function(alertId) {
    console.log("🗑️ Eliminando alerta:", alertId);

    try {
        await request(`/whatsapp/history/${alertId}`, { method: "DELETE" });
        showNotification("Alerta eliminada", "success");
        await loadAlerts();
    } catch (err) {
        console.error("❌ Error al eliminar alerta:", err);
        showNotification("Error al eliminar alerta", "error");
    }
}

// ============================================================================
// Handle Clear Alerts
// ============================================================================
async function handleClearAlerts() {
    if (!confirm("¿Desea eliminar todas las alertas leídas?")) return;

    try {
        console.log("🧹 Limpiando alertas...");

        await request("/whatsapp/history/clear", { method: "DELETE" });

        showNotification("Alertas limpias", "success");
        await loadAlerts();
    } catch (err) {
        console.error("❌ Error al limpiar alertas:", err);
        showNotification("Error al limpiar alertas", "error");
    }
}

// ============================================================================
// Notifications
// ============================================================================
function showNotification(message, type = "info") {
    console.log(`📢 [${type.toUpperCase()}] ${message}`);
    alert(message);
}