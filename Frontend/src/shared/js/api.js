import { obtenerUsuario } from "./storage.js";

const Api_Url = "http://localhost:3000/api";

function getHeaders() {
    const user = obtenerUsuario();
    return {
        "Content-Type": "application/json",
        "x-auth": user ? JSON.stringify(user) : ""
    };
}

export async function request(endPoint, options = {}) {
    let fetchOptions = { ...options };
    if (fetchOptions.body && typeof fetchOptions.body === 'object') {
        fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    const response = await fetch(Api_Url + endPoint, {
        headers: getHeaders(),
        ...fetchOptions
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error del servidor");
    }

    return data;
}

export async function login(email, password) {
    return request("/login", {
        method: "POST",
        body: { email, password }
    });
}

export async function getStudents() {
    return request("/students", { method: "GET" });
}

export async function createStudent(studentData) {
    return request("/students", {
        method: "POST",
        body: studentData
    });
}

export async function updateStudent(id, studentData) {
    return request(`/students/${id}`, {
        method: "PUT",
        body: studentData
    });
}

export async function deleteStudent(id) {
    return request(`/students/${id}`, { method: "DELETE" });
}

// ============================================================================
// ACUDIENTES (Guardians)
// ============================================================================

export async function createAcudiente(acudienteData) {
    return request("/acudientes", {
        method: "POST",
        body: acudienteData
    });
}

export async function updateAcudiente(id, acudienteData) {
    return request(`/acudientes/${id}`, {
        method: "PUT",
        body: acudienteData
    });
}

export async function deleteAcudiente(id) {
    return request(`/acudientes/${id}`, { method: "DELETE" });
}

// ============================================================================
// COURSES
// ============================================================================

export async function createCurso(cursoData) {
    return request("/cursos", {
        method: "POST",
        body: cursoData
    });
}

export async function updateCurso(id, cursoData) {
    return request(`/cursos/${id}`, {
        method: "PUT",
        body: cursoData
    });
}

export async function deleteCurso(id) {
    return request(`/cursos/${id}`, { method: "DELETE" });
}

// ============================================================================
// MATERIALS/SUBJECTS
// ============================================================================
export async function getMaterias() {
    return request("/materias", { method: "GET" });
}

export async function createMateria(materiaData) {
    return request("/materias", {
        method: "POST",
        body: materiaData
    });
}

export async function updateMateria(id, materiaData) {
    return request(`/materias/${id}`, {
        method: "PUT",
        body: materiaData
    });
}

export async function deleteMateria(id) {
    return request(`/materias/${id}`, { method: "DELETE" });
}

// ============================================================================
// ENROLLMENTS
// ============================================================================
export async function getMatriculas() {
    return request("/matriculas", { method: "GET" });
}

export async function createMatricula(matriculaData) {
    return request("/matriculas", {
        method: "POST",
        body: matriculaData
    });
}

export async function updateMatricula(id, matriculaData) {
    return request(`/matriculas/${id}`, {
        method: "PUT",
        body: matriculaData
    });
}

export async function deleteMatricula(id) {
    return request(`/matriculas/${id}`, { method: "DELETE" });
}

// ============================================================================
// GRADES
// ============================================================================
export async function getNotas() {
    return request("/notas", { method: "GET" });
}

export async function createNota(notaData) {
    return request("/notas", {
        method: "POST",
        body: notaData
    });
}

export async function updateNota(id, notaData) {
    return request(`/notas/${id}`, {
        method: "PUT",
        body: notaData
    });
}

export async function deleteNota(id) {
    return request(`/notas/${id}`, { method: "DELETE" });
}

// ============================================================================
// TEACHERS
// ============================================================================
export async function getProfesores() {
    return request("/profesores", { method: "GET" });
}

export async function createProfesor(profesorData) {
    return request("/profesores", {
        method: "POST",
        body: profesorData
    });
}

export async function updateProfesor(id, profesorData) {
    return request(`/profesores/${id}`, {
        method: "PUT",
        body: profesorData
    });
}

export async function deleteProfesor(id) {
    return request(`/profesores/${id}`, { method: "DELETE" });
}

// ============================================================================
// USERS
// ============================================================================
export async function getUsers() {
    return request("/users", { method: "GET" });
}

export async function createUser(userData) {
    return request("/users", {
        method: "POST",
        body: userData
    });
}

export async function updateUser(id, userData) {
    return request(`/users/${id}`, {
        method: "PUT",
        body: userData
    });
}

export async function deleteUser(id) {
    return request(`/users/${id}`, { method: "DELETE" });
}

// ============================================================================
// DASHBOARD
// ============================================================================
export async function getDashboard() {
    return request("/dashBoard", { method: "GET" });
}

// ============================================================================
// WHATSAPP
// ============================================================================
export async function sendWhatsAppMessage(data) {
    return request("/whatsapp/send", {
        method: "POST",
        body: data
    });
}

export async function getWhatsAppHistory() {
    return request("/whatsapp/history", { method: "GET" });
}