// ==========================================
// AGENDAR VISITA — CARGAR INFO + RESERVAS CON LOCALSTORAGE
// ==========================================

// =====================================================
// RESERVATION MANAGER - Manejo de reservas con localStorage
// =====================================================
const ReservationManager = {
    // Obtener todas las reservas del usuario actual
    getUserReservations: function() {
        const user = SessionManager.getUser();
        if (!user) return [];

        const allReservations = JSON.parse(localStorage.getItem("reservas")) || {};
        return allReservations[user.email] || [];
    },

    // Guardar reserva para el usuario actual
    saveReservation: function(reserva) {
        const user = SessionManager.getUser();
        if (!user) return false;

        const allReservations = JSON.parse(localStorage.getItem("reservas")) || {};

        if (!allReservations[user.email]) {
            allReservations[user.email] = [];
        }

        // Generar ID único para la reserva
        reserva.id = Date.now() + Math.random().toString(36).substr(2, 9);
        reserva.fechaCreacion = new Date().toISOString();

        allReservations[user.email].push(reserva);
        localStorage.setItem("reservas", JSON.stringify(allReservations));

        return true;
    },

    // Eliminar reserva por ID
    deleteReservation: function(reservaId) {
        const user = SessionManager.getUser();
        if (!user) return false;

        const allReservations = JSON.parse(localStorage.getItem("reservas")) || {};

        if (allReservations[user.email]) {
            allReservations[user.email] = allReservations[user.email].filter(r => r.id !== reservaId);
            localStorage.setItem("reservas", JSON.stringify(allReservations));
            return true;
        }

        return false;
    }
};

document.addEventListener('DOMContentLoaded', function() {

    // =====================================================
    // VERIFICAR SESIÓN - Requerir login para reservar
    // =====================================================
    const user = SessionManager.getUser();
    if (!user) {
        alert('⚠️ Debes iniciar sesión para hacer reservas');
        window.location.href = 'iniciar_sesion.html';
        return;
    }

    // =====================================================
    // 🔥 CARGAR INFO DEL INMUEBLE SELECCIONADO (localStorage)
    // =====================================================
    const inmueble = JSON.parse(localStorage.getItem("inmuebleSeleccionado"));

    if (inmueble) {
        // Imagen principal
        const imageBox = document.querySelector(".image-placeholder");
        imageBox.innerHTML = `<img src="${inmueble.imagen}" alt="${inmueble.titulo}" class="property-image">`;

        // Título
        document.querySelector(".details-title").textContent = inmueble.titulo;

        // Descripción
        document.querySelector(".description-text").textContent =
            inmueble.descripcion || "Sin descripción disponible.";

        // Precio
        document.querySelector(".price-amount").textContent = `S/ ${inmueble.precio}`;

        // Rating número
        const ratingNum = document.querySelector(".rating-number");
        ratingNum.textContent = `(${inmueble.rating})`;

        // ⭐ Estrellas dinámicas
        const starsContainer = document.querySelector(".stars");
        starsContainer.innerHTML = "";
        const ratingValue = parseFloat(inmueble.rating);

        for (let i = 1; i <= 5; i++) {
            starsContainer.innerHTML += `<span class="star">${i <= ratingValue ? "⭐" : "☆"}</span>`;
        }

        // ====================================================
        // CARACTERÍSTICAS — AHORA 100% COMPATIBLES
        // ====================================================

        document.querySelector(".feature-item.hab span").textContent =
            `${inmueble.habitaciones} Habitación(es)`;

        document.querySelector(".feature-item.ban span").textContent =
            `${inmueble.banos} Baño(s)`;

        document.querySelector(".feature-item.wifi span").textContent =
            inmueble.wifi.toLowerCase() === "sí" ? "WiFi Incluido" : "Sin WiFi";

        document.querySelector(".feature-item.cer span").textContent =
            inmueble.cercania;
    }

    // =====================================================
    // SISTEMA DE RESERVAS INTERACTIVO
    // =====================================================

    const scheduleButtons = document.querySelectorAll('.btn-circle');
    const confirmarBtn = document.querySelector('.btn-confirmar');
    const scheduleItems = document.querySelectorAll('.schedule-item');


    let reservaInfo = {
        fecha: null,
        hora: null,
        notificacion: false
    };

    // ==========================================
    // BOTÓN DE FECHA
    // ==========================================
    scheduleButtons[0].addEventListener('click', function() {
        const scheduleItem = scheduleItems[0];

        if (scheduleItem.querySelector('input[type="date"]')) return;

        const fechaInput = document.createElement('input');
        fechaInput.type = 'date';
        fechaInput.className = 'input-reserva';
        fechaInput.min = new Date().toISOString().split('T')[0];

        fechaInput.addEventListener('change', function() {
            reservaInfo.fecha = this.value;
            scheduleButtons[0].style.backgroundColor = '#28a745';
            scheduleButtons[0].innerHTML = '<i class="fas fa-check"></i>';
        });

        scheduleItem.appendChild(fechaInput);
        fechaInput.focus();
    });

    // ==========================================
    // BOTÓN DE HORA
    // ==========================================
    scheduleButtons[1].addEventListener('click', function() {
        const scheduleItem = scheduleItems[1];

        if (scheduleItem.querySelector('input[type="time"]')) return;

        const horaInput = document.createElement('input');
        horaInput.type = 'time';
        horaInput.className = 'input-reserva';

        horaInput.addEventListener('change', function() {
            reservaInfo.hora = this.value;
            scheduleButtons[1].style.backgroundColor = '#28a745';
            scheduleButtons[1].innerHTML = '<i class="fas fa-check"></i>';
        });

        scheduleItem.appendChild(horaInput);
        horaInput.focus();
    });

    // ==========================================
    // BOTÓN DE NOTIFICACIÓN
    // ==========================================
    scheduleButtons[2].addEventListener('click', function() {
        const scheduleItem = scheduleItems[2];

        if (scheduleItem.querySelector('input[type="checkbox"]')) {
            const checkbox = scheduleItem.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            reservaInfo.notificacion = checkbox.checked;

            if (checkbox.checked) {
                scheduleButtons[2].style.backgroundColor = '#28a745';
                scheduleButtons[2].innerHTML = '<i class="fas fa-check"></i>';
            } else {
                scheduleButtons[2].style.backgroundColor = '#007c91';
                scheduleButtons[2].innerHTML = '<i class="fas fa-plus"></i>';
            }
            return;
        }

        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';
        checkboxContainer.innerHTML = `
            <input type="checkbox" id="notificacion-checkbox" class="input-checkbox">
            <label for="notificacion-checkbox">¿Desea recibir notificaciones?</label>
        `;

        scheduleItem.appendChild(checkboxContainer);

        const checkbox = checkboxContainer.querySelector('input[type="checkbox"]');
        checkbox.checked = true;
        reservaInfo.notificacion = true;

        scheduleButtons[2].style.backgroundColor = '#28a745';
        scheduleButtons[2].innerHTML = '<i class="fas fa-check"></i>';

        checkbox.addEventListener('change', function() {
            reservaInfo.notificacion = this.checked;

            if (this.checked) {
                scheduleButtons[2].style.backgroundColor = '#28a745';
                scheduleButtons[2].innerHTML = '<i class="fas fa-check"></i>';
            } else {
                scheduleButtons[2].style.backgroundColor = '#007c91';
                scheduleButtons[2].innerHTML = '<i class="fas fa-plus"></i>';
            }
        });
    });

    // ==========================================
    // CONFIRMAR RESERVA
    // ==========================================
    confirmarBtn.addEventListener('click', function() {
        if (!reservaInfo.fecha || !reservaInfo.hora) {
            alert('⚠️ Completa la fecha y hora antes de confirmar.');
            return;
        }

        if (!inmueble) {
            alert('⚠️ No hay inmueble seleccionado');
            return;
        }

        const fechaObj = new Date(reservaInfo.fecha + 'T00:00:00');
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);

        // Crear objeto de reserva completo
        const nuevaReserva = {
            inmueble: inmueble.titulo,
            inmuebleImagen: inmueble.imagen,
            inmueblePrecio: inmueble.precio,
            inmuebleZona: inmueble.zona,
            fecha: reservaInfo.fecha,
            fechaFormateada: fechaFormateada,
            hora: reservaInfo.hora,
            notificacion: reservaInfo.notificacion
        };

        // Guardar en localStorage
        const saved = ReservationManager.saveReservation(nuevaReserva);

        if (!saved) {
            alert('⚠️ Error al guardar la reserva. Por favor, inicia sesión.');
            return;
        }

        // Mostrar en la interfaz
        mostrarReserva(nuevaReserva);

        alert(`✅ ¡Reserva confirmada!\n${inmueble.titulo}\n${fechaFormateada}, ${reservaInfo.hora}`);

        resetearFormulario();
    });

    // ==========================================
    // RESET FORMULARIO
    // ==========================================
    function resetearFormulario() {
        reservaInfo = { fecha: null, hora: null, notificacion: false };

        scheduleButtons.forEach(btn => {
            btn.style.backgroundColor = '#007c91';
            btn.innerHTML = '<i class="fas fa-plus"></i>';
        });

        document.querySelectorAll('.input-reserva, .checkbox-container')
            .forEach(el => el.remove());
    }

    // ==========================================
    // MOSTRAR RESERVA EN LA INTERFAZ
    // ==========================================
    function mostrarReserva(reserva) {
        let reservasContainer = document.getElementById('reservas-lista');

        if (!reservasContainer) {
            reservasContainer = document.createElement('div');
            reservasContainer.id = 'reservas-lista';
            reservasContainer.className = 'reservas-lista';

            const tituloReservas = document.createElement('h2');
            tituloReservas.className = 'titulo-reservas';
            tituloReservas.textContent = 'Mis Reservas';

            const mainContent = document.querySelector('.main-content');
            mainContent.appendChild(tituloReservas);
            mainContent.appendChild(reservasContainer);
        }

        const reservaElement = document.createElement('div');
        reservaElement.className = 'reserva-confirmada';
        reservaElement.dataset.reservaId = reserva.id;
        reservaElement.innerHTML = `
            <div class="reserva-header">
                <h3>✅ ${reserva.inmueble}</h3>
                <button class="btn-eliminar-reserva" onclick="eliminarReservaClick('${reserva.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="reserva-info">
                <p><i class="fas fa-home"></i> <strong>Inmueble:</strong> ${reserva.inmueble}</p>
                <p><i class="fas fa-map-marker-alt"></i> <strong>Zona:</strong> ${reserva.inmuebleZona || 'N/A'}</p>
                <p><i class="fas fa-calendar"></i> <strong>Fecha:</strong> ${reserva.fechaFormateada}</p>
                <p><i class="fas fa-clock"></i> <strong>Hora:</strong> ${reserva.hora}</p>
                <p><i class="fas fa-bell"></i> <strong>Notificaciones:</strong> ${reserva.notificacion ? 'Sí' : 'No'}</p>
                <p><i class="fas fa-dollar-sign"></i> <strong>Precio:</strong> S/ ${reserva.inmueblePrecio}</p>
            </div>
        `;

        reservasContainer.insertBefore(reservaElement, reservasContainer.firstChild);
    }

    // ==========================================
    // CARGAR RESERVAS EXISTENTES AL INICIO
    // ==========================================
    function cargarReservasExistentes() {
        const reservas = ReservationManager.getUserReservations();

        if (reservas.length > 0) {
            reservas.reverse().forEach(reserva => {
                mostrarReserva(reserva);
            });
        }
    }

    // Cargar reservas al iniciar la página
    cargarReservasExistentes();

    // ==========================================
    // CARGAR RESEÑAS DE LA VIVIENDA
    // ==========================================
    function cargarResenasVivienda() {
        if (!inmueble) return;

        const reviewsContainer = document.getElementById('reviews-container');
        const comentarios = JSON.parse(localStorage.getItem("foroComentarios")) || [];

        // Filtrar solo las reseñas de esta vivienda
        const resenasVivienda = comentarios.filter(c =>
            c.esResena &&
            c.vivienda &&
            c.vivienda.nombre === inmueble.titulo
        );

        if (resenasVivienda.length === 0) {
            reviewsContainer.innerHTML = '<p class="no-reviews">No hay reseñas aún para esta vivienda</p>';
            return;
        }

        // Mostrar últimas 3 reseñas
        const ultimasResenas = resenasVivienda.slice(-3).reverse();

        reviewsContainer.innerHTML = ultimasResenas.map(resena => {
            const stars = Array(resena.rating).fill('<i class="fas fa-star"></i>').join('');
            return `
                <div class="review-item" onclick="window.location.href='foro_estudiantil.html'">
                    <div class="review-header">
                        <span class="review-author">👤 ${resena.nombre}</span>
                        <span class="review-stars">${stars}</span>
                    </div>
                    <p class="review-text">${resena.texto}</p>
                    <span class="review-date">📅 ${resena.fecha}</span>
                </div>
            `;
        }).join('');

        // Actualizar el rating promedio si hay reseñas
        if (resenasVivienda.length > 0) {
            const promedioRating = resenasVivienda.reduce((sum, r) => sum + r.rating, 0) / resenasVivienda.length;
            const ratingNumber = document.querySelector('.rating-number');
            if (ratingNumber) {
                ratingNumber.textContent = `(${promedioRating.toFixed(1)} - ${resenasVivienda.length} reseña${resenasVivienda.length > 1 ? 's' : ''})`;
            }

            // Actualizar estrellas visuales
            const starsContainer = document.querySelector(".stars");
            if (starsContainer) {
                starsContainer.innerHTML = "";
                for (let i = 1; i <= 5; i++) {
                    starsContainer.innerHTML += `<span class="star">${i <= Math.round(promedioRating) ? "⭐" : "☆"}</span>`;
                }
            }
        }
    }

    // Cargar reseñas al iniciar
    cargarResenasVivienda();
});

// ==========================================
// ELIMINAR RESERVA - FUNCIÓN GLOBAL
// ==========================================
function eliminarReservaClick(reservaId) {
    if (confirm('¿Eliminar esta reserva?')) {
        // Eliminar del localStorage
        const deleted = ReservationManager.deleteReservation(reservaId);

        if (!deleted) {
            alert('⚠️ Error al eliminar la reserva');
            return;
        }

        // Eliminar de la interfaz
        const reservaElement = document.querySelector(`[data-reserva-id="${reservaId}"]`);
        if (reservaElement) {
            reservaElement.style.animation = 'fadeOut 0.3s ease';

            setTimeout(() => {
                reservaElement.remove();

                const reservasContainer = document.getElementById('reservas-lista');
                if (reservasContainer && reservasContainer.children.length === 0) {
                    reservasContainer.previousElementSibling.remove();
                    reservasContainer.remove();
                }
            }, 300);
        }

        alert('✅ Reserva eliminada correctamente');
    }
}
