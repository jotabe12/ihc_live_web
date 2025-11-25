// ==========================================
// AGENDAR VISITA — CARGAR INFO + RESERVAS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

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

    let reservaCounter = 0;

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

        reservaCounter++;

        const fechaObj = new Date(reservaInfo.fecha + 'T00:00:00');
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);

        const reservaElement = document.createElement('div');
        reservaElement.className = 'reserva-confirmada';
        reservaElement.innerHTML = `
            <div class="reserva-header">
                <h3>✅ Reserva ${reservaCounter}</h3>
                <button class="btn-eliminar-reserva" onclick="eliminarReserva(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="reserva-info">
                <p><i class="fas fa-calendar"></i> <strong>Fecha:</strong> ${fechaFormateada}</p>
                <p><i class="fas fa-clock"></i> <strong>Hora:</strong> ${reservaInfo.hora}</p>
                <p><i class="fas fa-bell"></i> <strong>Notificaciones:</strong> ${reservaInfo.notificacion ? 'Sí' : 'No'}</p>
            </div>
        `;

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

        reservasContainer.insertBefore(reservaElement, reservasContainer.firstChild);

        alert(`✅ ¡Reserva ${reservaCounter} confirmada!\n${fechaFormateada}, ${reservaInfo.hora}`);

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
});

// ==========================================
// ELIMINAR RESERVA
// ==========================================
function eliminarReserva(button) {
    if (confirm('¿Eliminar esta reserva?')) {
        const reservaElement = button.closest('.reserva-confirmada');
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
}
