// Sistema de notificaciones para la aplicación

// Función especial para mostrar mensaje de bienvenida con estilo mejorado
function showWelcomeMessage(userName, userType = 'Cliente') {
    // Crear contenedor especial para mensaje de bienvenida si no existe
    if (!document.getElementById('welcome-container')) {
        const container = document.createElement('div');
        container.id = 'welcome-container';
        container.className = 'welcome-container position-fixed';
        // Use a vertical stacking container so welcome messages and toasts can be stacked
        container.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 15px;
            max-width: 380px;
        `;
        document.body.appendChild(container);
    }
    
    const welcomeContainer = document.getElementById('welcome-container');
    const welcomeId = 'welcome-' + Date.now();
    
    // Crear el mensaje de bienvenida con animación
    const welcomeHtml = `
        <div id="${welcomeId}" class="welcome-message">
            <div class="welcome-card">
                <div class="welcome-header">
                    <div class="welcome-icon">
                        <i class="fas ${userType === 'Administrador' ? 'fa-user-shield' : 'fa-user'}"></i>
                    </div>
                    <div class="welcome-info">
                        <h3 class="welcome-title">¡Bienvenido/a!</h3>
                        <div class="welcome-badge">${userType}</div>
                    </div>
                </div>
                <p class="welcome-subtitle">${userName}</p>
                <div class="welcome-animation">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar estilos CSS si no existen
    if (!document.getElementById('welcome-styles')) {
        const styles = document.createElement('style');
        styles.id = 'welcome-styles';
        styles.textContent = `
            .welcome-message {
                animation: welcomeSlideInRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: auto;
            }
            
            .welcome-card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 15px;
                padding: 20px 25px;
                text-align: left;
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
                color: white;
                position: relative;
                overflow: hidden;
                min-width: 280px;
                max-width: 320px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .welcome-header {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .welcome-info {
                flex: 1;
            }
            
            .welcome-icon {
                font-size: 1.5rem;
                margin-bottom: 0;
                animation: welcomeIconBounce 1s ease-in-out 0.3s;
                margin-right: 12px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .welcome-title {
                font-size: 1.1rem;
                font-weight: 700;
                margin-bottom: 5px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                margin: 0;
            }
            
            .welcome-subtitle {
                font-size: 1rem;
                margin-bottom: 0;
                opacity: 0.95;
                font-weight: 500;
                margin: 0;
            }
            
            .welcome-badge {
                display: inline-block;
                background: rgba(255,255,255,0.25);
                padding: 3px 10px;
                border-radius: 15px;
                font-size: 0.75rem;
                font-weight: 600;
                border: 1px solid rgba(255,255,255,0.3);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-top: 3px;
            }
            
            .welcome-animation .particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: rgba(255,255,255,0.6);
                border-radius: 50%;
                animation: welcomeParticle 2s infinite;
            }
            
            .welcome-animation .particle:nth-child(1) {
                top: 20%;
                left: 20%;
                animation-delay: 0s;
            }
            
            .welcome-animation .particle:nth-child(2) {
                top: 60%;
                right: 20%;
                animation-delay: 0.7s;
            }
            
            .welcome-animation .particle:nth-child(3) {
                bottom: 20%;
                left: 50%;
                animation-delay: 1.4s;
            }
            
            @keyframes welcomeSlideInRight {
                0% {
                    opacity: 0;
                    transform: translateX(100px) scale(0.8);
                }
                50% {
                    opacity: 1;
                    transform: translateX(-10px) scale(1.02);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }
            
            @keyframes welcomeIconBounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
            
            @keyframes welcomeParticle {
                0%, 100% {
                    opacity: 0;
                    transform: translateY(0) scale(0);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-20px) scale(1);
                }
            }
            
            @keyframes welcomeFadeOut {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.8);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Insert the new welcome message at the end so multiple messages stack
    welcomeContainer.insertAdjacentHTML('beforeend', welcomeHtml);
    
    // Auto-ocultar después de 4 segundos con animación
    setTimeout(() => {
        const welcomeElement = document.getElementById(welcomeId);
        if (welcomeElement) {
            welcomeElement.style.animation = 'welcomeFadeOut 0.5s ease-in-out forwards';
            setTimeout(() => {
                const parent = welcomeElement.parentElement;
                welcomeElement.remove();
                // If parent is the welcome-container and it's empty (no messages and no toasts), remove it
                if (parent && parent.id === 'welcome-container') {
                    const toastCont = document.getElementById('toast-container');
                    const hasToasts = toastCont && toastCont.children.length > 0;
                    // If there are no child nodes (or only an empty text), and no toasts, remove container
                    if (parent.children.length === 0 && !hasToasts) {
                        parent.remove();
                    }
                    // If there are no welcome messages but toastContainer exists but is empty, also remove it
                    if (toastCont && toastCont.children.length === 0 && parent.children.length === 0) {
                        toastCont.remove();
                    }
                }
            }, 500);
        }
    }, 4000);
    
    return welcomeId;
}

// Función para mostrar notificaciones toast
function showToast(type, title, message, duration = 5000) {
    // Crear contenedor de toasts si no existe
    // Create toast container if not exists
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        // Default styles; will be adjusted if welcome container exists
        container.className = 'toast-container p-0';
        container.style.zIndex = '9999';
        container.style.maxWidth = '380px';
        container.style.pointerEvents = 'none';

        const welcomeEl = document.getElementById('welcome-container');
        if (welcomeEl) {
            // When welcome container exists, append toast container inside it so elements stack
            // and inherit the fixed position of the parent. Use column layout so multiple
            // toasts appear one below another.
            container.style.position = 'relative';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'flex-end';
            container.style.gap = '15px';
            welcomeEl.appendChild(container);
        } else {
            // No welcome message: position fixed at top-right of viewport
            container.className = 'toast-container position-fixed';
            container.style.top = '20px';
            container.style.right = '20px';
            document.body.appendChild(container);
        }
    }

    const toastContainer = document.getElementById('toast-container');
    const toastId = 'toast-' + Date.now();

    // Si es una reserva exitosa, mostrar un centro destacado y más bonito
    try {
        const lowerMsg = (message || '').toString().toLowerCase();
        const lowerTitle = (title || '').toString().toLowerCase();
        if (type === 'success' && (lowerMsg.includes('cita reservad') || lowerTitle.includes('cita reservad'))) {
            return showCenteredNotification('success', title, message, duration);
        }
    } catch (e) {
        // ignore
    }
    
    // Determinar colores según el tipo
    let bgClass, iconClass, textClass;
    switch(type) {
        case 'success':
            bgClass = 'bg-success';
            iconClass = 'fas fa-check-circle';
            textClass = 'text-white';
            break;
        case 'error':
        case 'danger':
            bgClass = 'bg-danger';
            iconClass = 'fas fa-exclamation-triangle';
            textClass = 'text-white';
            break;
        case 'warning':
            bgClass = 'bg-warning';
            iconClass = 'fas fa-exclamation-circle';
            textClass = 'text-dark';
            break;
        case 'info':
            bgClass = 'bg-info';
            iconClass = 'fas fa-info-circle';
            textClass = 'text-white';
            break;
        default:
            bgClass = 'bg-primary';
            iconClass = 'fas fa-bell';
            textClass = 'text-white';
    }
    
    // Crear el toast. Apply small inline styles so it doesn't overlap and respects container gap.
    const toastHtml = `
        <div id="${toastId}" class="toast ${bgClass} ${textClass}" role="alert" aria-live="assertive" aria-atomic="true" style="pointer-events: auto; margin: 0;">
            <div class="toast-header ${bgClass} ${textClass} border-0">
                <i class="${iconClass} me-2"></i>
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;

    // Insert at the end so newer toasts appear below older ones inside the column
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Inicializar y mostrar el toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: duration
    });
    
    toast.show();
    
    // Remover el toast del DOM después de que se oculte
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
    
    return toast;
}

// Función para mostrar notificación de éxito
function showSuccess(message, title = 'Éxito') {
    return showToast('success', title, message);
}

// Función para mostrar notificación de error
function showError(message, title = 'Error') {
    return showToast('error', title, message);
}

// Función para mostrar notificación de advertencia
function showWarning(message, title = 'Advertencia') {
    return showToast('warning', title, message);
}

// Función para mostrar notificación de información
function showInfo(message, title = 'Información') {
    return showToast('info', title, message);
}

// Mostrar una notificación centrada y destacada (ideal para confirmaciones importantes como reserva de cita)
function showCenteredNotification(type, title, message, duration = 4000) {
    // Crear contenedor si no existe
    if (!document.getElementById('centered-notification-root')) {
        const root = document.createElement('div');
        root.id = 'centered-notification-root';
        root.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 11000;
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 100%;
        `;
        document.body.appendChild(root);
    }

    // Añadir estilos globales solo una vez
    if (!document.getElementById('centered-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'centered-notification-styles';
        style.textContent = `
            .centered-card {
                pointer-events: auto;
                background: linear-gradient(135deg, rgba(17,153,142,0.95) 0%, rgba(56,239,125,0.95) 100%);
                color: white;
                padding: 22px 26px;
                border-radius: 14px;
                box-shadow: 0 18px 50px rgba(0,0,0,0.25);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                min-width: 320px;
                max-width: 560px;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.15);
                backdrop-filter: blur(6px);
                transform: translateY(-10px) scale(0.98);
                opacity: 0;
                animation: centeredPopIn 420ms cubic-bezier(0.2,1,0.2,1) forwards;
            }

            .centered-card .centered-title {
                font-size: 20px;
                font-weight: 700;
                text-shadow: 0 6px 18px rgba(0,0,0,0.25);
            }

            .centered-card .centered-message {
                font-size: 15px;
                opacity: 0.95;
                margin: 0;
            }

            .centered-card .centered-icon {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                background: rgba(255,255,255,0.12);
                box-shadow: inset 0 -6px 18px rgba(0,0,0,0.06);
            }

            @keyframes centeredPopIn {
                0% { transform: translateY(-10px) scale(0.98); opacity: 0; }
                60% { transform: translateY(6px) scale(1.02); opacity: 1; }
                100% { transform: translateY(0) scale(1); opacity: 1; }
            }

            @keyframes centeredPopOut {
                0% { transform: translateY(0) scale(1); opacity: 1; }
                100% { transform: translateY(-10px) scale(0.98); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    const root = document.getElementById('centered-notification-root');
    const id = 'centered-' + Date.now();

    const iconHtml = type === 'success' ? '<i class="fas fa-check"></i>' : (type === 'error' ? '<i class="fas fa-times"></i>' : '<i class="fas fa-info"></i>');

    const cardHtml = `
        <div id="${id}" class="centered-card">
            <div class="centered-icon">${iconHtml}</div>
            <div class="centered-title">${title}</div>
            <div class="centered-message">${message}</div>
        </div>
    `;

    root.insertAdjacentHTML('beforeend', cardHtml);

    const el = document.getElementById(id);
    // Auto-dismiss
    setTimeout(() => {
        if (!el) return;
        el.style.animation = 'centeredPopOut 300ms ease-in forwards';
        setTimeout(() => {
            if (el) el.remove();
            // remove root if empty
            const rootEl = document.getElementById('centered-notification-root');
            if (rootEl && rootEl.children.length === 0) rootEl.remove();
        }, 300);
    }, duration);

    return id;
}

// Función para mostrar confirmación con SweetAlert2 (si está disponible)
function showConfirm(title, text, confirmButtonText = 'Sí', cancelButtonText = 'No') {
    if (typeof Swal !== 'undefined') {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#667eea',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        });
    } else {
        // Fallback a confirm nativo
        return new Promise((resolve) => {
            const result = confirm(title + '\n\n' + text);
            resolve({ isConfirmed: result });
        });
    }
}

// Función para mostrar loading con SweetAlert2 (si está disponible)
function showLoading(title = 'Cargando...', text = 'Por favor espere') {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: title,
            text: text,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }
}

// Función para cerrar loading
function hideLoading() {
    if (typeof Swal !== 'undefined') {
        Swal.close();
    }
}

// Función de compatibilidad para mostrar alertas (reemplaza alert nativo)
function showAlert(message, title = 'Aviso', type = 'info') {
    // Mapear tipos comunes
    const typeMap = {
        'success': 'success',
        'error': 'error', 
        'warning': 'warning',
        'info': 'info',
        'danger': 'error'
    };
    
    const finalType = typeMap[type] || 'info';
    return showNotification(message, finalType, title);
}

// Asignar funciones al objeto window para uso global
window.showToast = showToast;
window.showSuccess = showSuccess;
window.showError = showError;
window.showWarning = showWarning;
window.showInfo = showInfo;
window.showConfirm = showConfirm;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showAlert = showAlert;
window.showWelcomeMessage = showWelcomeMessage;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de notificaciones inicializado');
});