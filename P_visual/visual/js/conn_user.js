// conn_user.js - Manejo de conexión y autenticación de usuarios

// Verificar si sessionManager existe antes de usarlo
function getSessionManager() {
    if (typeof sessionManager !== 'undefined') {
        return sessionManager;
    } else {
        console.error('sessionManager no está definido. Asegúrate de cargar session.js primero.');
        return null;
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `ps-notification ps-notification-${type}`;
    notification.innerHTML = `
        <div class="ps-notification-content">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Agregar al body
    document.body.appendChild(notification);

    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('ps-notification-show');
    }, 100);

    // Ocultar después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('ps-notification-show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Función para autenticar usuario
function authenticateUser(email, password) {
    // Simulación de autenticación - reemplazar con tu lógica real
    console.log('Autenticando usuario:', email);
    
    // Validación básica
    if (!email || !password) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }

    // Aquí deberías hacer una petición a tu servidor/API
    // Por ahora simulamos una autenticación exitosa después de 1 segundo
    setTimeout(() => {
        // Datos de usuario de ejemplo (deberían venir del servidor)
        const userData = {
            id: 1,
            username: email.split('@')[0], // Usamos la parte antes del @ como username
            email: email,
            nombres: 'Usuario',
            apellidos: 'Ejemplo'
        };

        // Guardar usuario en sesión
        const manager = getSessionManager();
        if (manager) {
            manager.setUser(userData);
            
            // Mostrar mensaje de éxito
            showNotification('¡Inicio de sesión exitoso!', 'success');
            
            // Redirigir a inicio después de 1.5 segundos
            setTimeout(() => {
                window.location.href = 'inicio.html';
            }, 1500);
        } else {
            showNotification('Error al iniciar sesión', 'error');
        }
        
    }, 1000);
}

// Función para registrar usuario
function registerUser(userData) {
    console.log('Registrando usuario:', userData);
    
    // Validación básica
    if (!userData.username || !userData.password) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }

    // Simulación de registro exitoso
    setTimeout(() => {
        // Guardar usuario en sesión automáticamente después del registro
        const manager = getSessionManager();
        if (manager) {
            manager.setUser({
                id: Date.now(), // ID temporal
                username: userData.username,
                email: userData.email,
                nombres: userData.nombres,
                apellidos: userData.apellidos
            });

            showNotification('¡Registro exitoso! Bienvenido a PlayStation', 'success');
            
            // Redirigir a inicio después de 2 segundos
            setTimeout(() => {
                window.location.href = 'inicio.html';
            }, 2000);
        } else {
            showNotification('Error en el registro', 'error');
        }
        
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Manejar formulario de login
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const user = document.getElementById('floatingInput').value;
            const pass = document.getElementById('floatingPassword').value;

            // Simulación de autenticación
            authenticateUser(user, pass);
        });
    }

    // Manejar formulario de registro
    const formRegister = document.querySelector('.needs-validation');
    if (formRegister) {
        formRegister.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!formRegister.checkValidity()) {
                e.stopPropagation();
                formRegister.classList.add('was-validated');
                return;
            }

            // Obtener datos del formulario
            const userData = {
                nombres: document.getElementById('firstName').value,
                apellidos: document.getElementById('lastName').value,
                tipo_doc: document.getElementById('tipo_doc').value,
                num_doc: document.getElementById('num_doc').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };

            registerUser(userData);
        });
    }
});