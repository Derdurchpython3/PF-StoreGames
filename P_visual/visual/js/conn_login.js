// p_visual/js/conexion_server/conn_user.js - MANEJO DEL FORMULARIO DE LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('formLogin');
    const btnLogin = loginForm?.querySelector('button[type="submit"]');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            iniciarSesion();
        });
    }

    async function iniciarSesion() {
        const formData = {
            user: document.getElementById('floatingInput').value,
            pass: document.getElementById('floatingPassword').value
        };

        console.log('🔐 Intentando login:', formData.user);

        try {
            if (btnLogin) {
                btnLogin.disabled = true;
                btnLogin.innerHTML = '<i class="bi bi-hourglass-split"></i> Iniciando sesión...';
            }

            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                mostrarMensaje('✅ ' + data.message, 'success');
                
                // Guardar datos de usuario en localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'inicio.html';
                }, 2000);
            } else {
                mostrarMensaje('❌ ' + data.message, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarMensaje('❌ Error de conexión con el servidor. Verifica tu internet.', 'error');
        } finally {
            if (btnLogin) {
                btnLogin.disabled = false;
                btnLogin.innerHTML = 'Iniciar Sesión';
            }
        }
    }

    // FUNCIÓN PARA MOSTRAR MENSAJES EMERGENTES
    function mostrarMensaje(mensaje, tipo) {
        // Eliminar mensajes anteriores
        const mensajesAnteriores = document.querySelectorAll('.alert-message');
        mensajesAnteriores.forEach(msg => msg.remove());

        // Crear elemento de mensaje
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${tipo === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 400px;
            max-width: 500px;
        `;
        
        alertDiv.innerHTML = `
            <strong>${tipo === 'success' ? '✅ Éxito:' : '❌ Error:'}</strong> ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(alertDiv);

        // Auto-eliminar después de 5 segundos (solo para éxito)
        if (tipo === 'success') {
            setTimeout(() => {
                if (alertDiv.parentElement) {
                    alertDiv.remove();
                }
            }, 5000);
        }
    }
});