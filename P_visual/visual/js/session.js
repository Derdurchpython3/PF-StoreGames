// session.js - Manejo de sesión de usuario

class SessionManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Cargar usuario desde localStorage al inicializar
        this.loadUser();
    }

    // Guardar usuario en sesión
    setUser(userData) {
        this.currentUser = userData;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.updateNavigation();
    }

    // Cargar usuario desde localStorage
    loadUser() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateNavigation();
        }
    }

    // Obtener usuario actual
    getCurrentUser() {
        return this.currentUser;
    }

    // Verificar si hay usuario logueado
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Cerrar sesión
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateNavigation();
        // Redirigir a inicio después de cerrar sesión
        window.location.href = 'inicio.html';
    }

    // Actualizar navegación según estado de sesión
    updateNavigation() {
        const navContainer = document.querySelector('.ps-nav');
        
        if (!navContainer) return;

        if (this.isLoggedIn()) {
            // Usuario logueado - mostrar nombre de usuario y opción de cerrar sesión
            navContainer.innerHTML = `
                <li class="ps-nav-item">
                    <a href="inicio.html" class="ps-nav-link">
                        <i class="bi bi-house"></i>Inicio
                    </a>
                </li>
                <li class="ps-nav-item dropdown">
                    <a class="ps-nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle"></i>${this.currentUser.username}
                    </a>
                    <ul class="dropdown-menu ps-dropdown-menu">
                        <li><a class="dropdown-item" href="#"><i class="bi bi-person"></i> Mi Perfil</a></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-gear"></i> Configuración</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="sessionManager.logout()"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>
                    </ul>
                </li>
            `;
        } else {
            // Usuario no logueado - mostrar opciones por defecto
            const currentPage = window.location.pathname.split('/').pop();
            
            let inicioActive = currentPage === 'inicio.html' ? 'active' : '';
            let loginActive = currentPage === 'login.html' ? 'active' : '';
            let registroActive = currentPage === 'registro.html' ? 'active' : '';

            navContainer.innerHTML = `
                <li class="ps-nav-item">
                    <a href="inicio.html" class="ps-nav-link ${inicioActive}">
                        <i class="bi bi-house"></i>Inicio
                    </a>
                </li>
                <li class="ps-nav-item">
                    <a href="login.html" class="ps-nav-link ${loginActive}">
                        <i class="bi bi-person"></i>Iniciar Sesión
                    </a>
                </li>
                <li class="ps-nav-item">
                    <a href="registro.html" class="ps-nav-link ${registroActive}">
                        <i class="bi bi-person-plus"></i>Registrarse
                    </a>
                </li>
            `;
        }
    }
}

// Instancia global del gestor de sesión
const sessionManager = new SessionManager();