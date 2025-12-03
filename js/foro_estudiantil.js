// ==========================================
// SISTEMA DE COMENTARIOS Y RESEÑAS CON USUARIOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si hay usuario logueado
    const user = SessionManager ? SessionManager.getUser() : null;
    const nombreInput = document.getElementById("nombre");
    const checkboxResena = document.getElementById("checkbox-resena");
    const resenaSection = document.getElementById("resena-section");
    const selectVivienda = document.getElementById("select-vivienda");
    const starRating = document.getElementById("star-rating");
    const ratingValue = document.getElementById("rating-value");

    let selectedRating = 0;

    // Autocompletar nombre si hay usuario logueado
    if (user) {
        nombreInput.value = user.nombre;
        nombreInput.readOnly = true;

        // Cargar viviendas reservadas por el usuario
        cargarViviendasReservadas(user.email);
    } else {
        nombreInput.readOnly = false;
        nombreInput.placeholder = "Tu nombre";
    }

    // Mostrar/ocultar sección de reseña
    checkboxResena.addEventListener("change", function() {
        if (this.checked) {
            if (!user) {
                alert("Debes iniciar sesión para publicar una reseña de vivienda");
                this.checked = false;
                return;
            }

            const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
            const userReservations = reservas[user.email] || [];

            if (userReservations.length === 0) {
                alert("Debes tener al menos una reserva para publicar una reseña");
                this.checked = false;
                return;
            }

            resenaSection.style.display = "block";
        } else {
            resenaSection.style.display = "none";
            selectedRating = 0;
            updateStars(0);
        }
    });

    // Sistema de estrellas
    const stars = starRating.querySelectorAll("i");
    stars.forEach(star => {
        star.addEventListener("click", function() {
            selectedRating = parseInt(this.dataset.rating);
            updateStars(selectedRating);
            ratingValue.textContent = selectedRating;
        });

        star.addEventListener("mouseenter", function() {
            const rating = parseInt(this.dataset.rating);
            updateStars(rating);
        });
    });

    starRating.addEventListener("mouseleave", function() {
        updateStars(selectedRating);
    });

    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove("far");
                star.classList.add("fas");
            } else {
                star.classList.remove("fas");
                star.classList.add("far");
            }
        });
    }

    // Cargar comentarios al inicio
    mostrarComentarios();
});

// Cargar viviendas reservadas por el usuario
function cargarViviendasReservadas(userEmail) {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
    const userReservations = reservas[userEmail] || [];
    const selectVivienda = document.getElementById("select-vivienda");

    // Limpiar opciones previas (excepto la primera)
    selectVivienda.innerHTML = '<option value="">-- Selecciona una vivienda --</option>';

    // Obtener viviendas únicas
    const viviendasUnicas = [...new Set(userReservations.map(r => r.inmueble))];

    viviendasUnicas.forEach((vivienda, index) => {
        const reserva = userReservations.find(r => r.inmueble === vivienda);
        const option = document.createElement("option");
        option.value = JSON.stringify({
            nombre: vivienda,
            precio: reserva.inmueblePrecio,
            ubicacion: reserva.inmuebleUbicacion || "Lima"
        });
        option.textContent = vivienda;
        selectVivienda.appendChild(option);
    });
}

// Guardar comentario o reseña
function guardarComentario(nombre, ubicacion, texto, esResena, viviendaData, rating, userEmail) {
    const nuevoComentario = {
        nombre,
        ubicacion,
        texto,
        avatar: `https://i.pravatar.cc/45?u=${nombre}${ubicacion}`,
        id: Date.now(),
        fecha: new Date().toLocaleDateString('es-PE'),
        esResena: esResena || false,
        vivienda: viviendaData || null,
        rating: rating || 0,
        userEmail: userEmail || null // Vincular al usuario
    };

    const comentarios = JSON.parse(localStorage.getItem("foroComentarios")) || [];
    comentarios.push(nuevoComentario);
    localStorage.setItem("foroComentarios", JSON.stringify(comentarios));

    // Si es de un usuario logueado, guardar también en su perfil
    if (userEmail) {
        guardarEnPerfilUsuario(userEmail, nuevoComentario);
    }
}

// Guardar comentario/reseña en el perfil del usuario
function guardarEnPerfilUsuario(userEmail, comentario) {
    const interacciones = JSON.parse(localStorage.getItem("userInteracciones")) || {};

    if (!interacciones[userEmail]) {
        interacciones[userEmail] = {
            comentarios: [],
            resenas: []
        };
    }

    if (comentario.esResena) {
        interacciones[userEmail].resenas.push(comentario);
    } else {
        interacciones[userEmail].comentarios.push(comentario);
    }

    localStorage.setItem("userInteracciones", JSON.stringify(interacciones));
}

// ==========================================
// BASE DE DATOS DE VIVIENDAS (para navegación)
// ==========================================
const VIVIENDAS_DB = [
    {
        titulo: "Departamento moderno en Surco",
        imagen: "../asset/dept_Surco.jpg",
        zona: "surco",
        habitaciones: "2",
        banos: "1",
        wifi: "Sí",
        cercania: "Cerca a universidades",
        rating: "5.0",
        descripcion: "Acogedor departamento de 2 dormitorios ubicado en Surco, cerca de universidades y centros comerciales. Ideal para estudiantes.",
        precio: "890000",
        precioNumero: "890000"
    },
    {
        titulo: "Departamento en San Isidro",
        imagen: "../asset/dept_SanIsidro.jpeg",
        zona: "San Isidro",
        habitaciones: "3",
        banos: "2",
        wifi: "Sí",
        cercania: "Cerca al centro",
        rating: "4.8",
        descripcion: "Amplio departamento de 3 habitaciones en San Isidro, zona exclusiva y segura.",
        precio: "1200",
        precioNumero: "1200"
    },
    {
        titulo: "Departamento en Miraflores",
        imagen: "../asset/dept_benavides.jpg",
        zona: "Miraflores",
        habitaciones: "2",
        banos: "1",
        wifi: "Sí",
        cercania: "Cerca a la playa",
        rating: "4.5",
        descripcion: "Moderno departamento en Miraflores con vista al mar.",
        precio: "1500",
        precioNumero: "1500"
    },
    {
        titulo: "Departamento en Jesús María",
        imagen: "../asset/dept_JesusMaria.jpg",
        zona: "Jesús María",
        habitaciones: "1",
        banos: "1",
        wifi: "Sí",
        cercania: "Cerca a universidades",
        rating: "4.2",
        descripcion: "Acogedor departamento ideal para estudiantes.",
        precio: "800",
        precioNumero: "800"
    },
    {
        titulo: "Departamento en Monterrico",
        imagen: "../asset/dept_Monterrico.jpg",
        zona: "Monterrico",
        habitaciones: "2",
        banos: "2",
        wifi: "Sí",
        cercania: "Cerca a centros comerciales",
        rating: "4.6",
        descripcion: "Departamento moderno en Monterrico con excelentes acabados.",
        precio: "1100",
        precioNumero: "1100"
    },
    {
        titulo: "Departamento en San Borja",
        imagen: "../asset/dept_SanBorja.jpg",
        zona: "San Borja",
        habitaciones: "3",
        banos: "2",
        wifi: "Sí",
        cercania: "Cerca a parques",
        rating: "4.7",
        descripcion: "Espacioso departamento en San Borja, zona residencial tranquila.",
        precio: "1300",
        precioNumero: "1300"
    },
    {
        titulo: "Departamento en San Miguel",
        imagen: "../asset/dept_SanMiguel.jpeg",
        zona: "San Miguel",
        habitaciones: "2",
        banos: "1",
        wifi: "Sí",
        cercania: "Cerca a universidades",
        rating: "4.3",
        descripcion: "Departamento cómodo en San Miguel cerca de universidades.",
        precio: "900",
        precioNumero: "900"
    },
    {
        titulo: "Departamento en Surquillo",
        imagen: "../asset/dept_Surquillo.jpg",
        zona: "Surquillo",
        habitaciones: "1",
        banos: "1",
        wifi: "Sí",
        cercania: "Cerca al centro",
        rating: "4.0",
        descripcion: "Departamento económico en Surquillo, bien ubicado.",
        precio: "700",
        precioNumero: "700"
    }
];

// ==========================================
// NAVEGAR A VIVIENDA DESDE RESEÑA
// ==========================================
function navegarAVivienda(nombreVivienda) {
    // Buscar la vivienda en la base de datos
    const vivienda = VIVIENDAS_DB.find(v =>
        v.titulo.toLowerCase().includes(nombreVivienda.toLowerCase()) ||
        nombreVivienda.toLowerCase().includes(v.titulo.toLowerCase())
    );

    if (vivienda) {
        // Guardar en localStorage igual que en el catálogo
        const inmueble = {
            titulo: vivienda.titulo,
            descripcion: vivienda.descripcion,
            precio: vivienda.precio,
            imagen: vivienda.imagen,
            zona: vivienda.zona,
            habitaciones: vivienda.habitaciones,
            banos: vivienda.banos,
            wifi: vivienda.wifi,
            cercania: vivienda.cercania,
            rating: vivienda.rating,
            desc: vivienda.descripcion,
            precioNumero: vivienda.precioNumero
        };

        localStorage.setItem("inmuebleSeleccionado", JSON.stringify(inmueble));
        window.location.href = "agendar_visita.html";
    } else {
        alert("⚠️ No se encontró información de esta vivienda");
    }
}

// Función para mostrar comentarios
function mostrarComentarios() {
    const contenedor = document.getElementById("lista-comentarios");
    contenedor.innerHTML = "";

    const comentarios = JSON.parse(localStorage.getItem("foroComentarios")) || [];

    // Mostrar comentarios en orden inverso (más recientes primero)
    comentarios.reverse().forEach(c => {
        const div = document.createElement("div");
        div.classList.add("comentario");
        div.dataset.comentarioId = c.id;

        let resenaHTML = "";
        if (c.esResena && c.vivienda) {
            const stars = Array(c.rating).fill('<i class="fas fa-star"></i>').join("");
            resenaHTML = `
                <span class="resena-badge">RESEÑA</span>
                <span class="rating-stars">${stars}</span>
                <div class="vivienda-info" onclick="navegarAVivienda('${c.vivienda.nombre}')" style="cursor: pointer; transition: background 0.3s;" 
                     onmouseover="this.style.background='#e0f2f3'" 
                     onmouseout="this.style.background='#f0f8f9'">
                    🏠 <strong>${c.vivienda.nombre}</strong> - ${c.vivienda.ubicacion}
                    <small style="display: block; font-size: 0.85em; color: #666; margin-top: 3px;">
                        ▶ Click para ver esta vivienda
                    </small>
                </div>
            `;
        }

        div.innerHTML = `
            <div class="usuario">
                <img src="${c.avatar}">
                <div>
                    <h3>${c.nombre} ${resenaHTML}</h3>
                    <small>${c.ubicacion} • ${c.fecha || 'Hoy'}</small>
                </div>
            </div>
            <p>${c.texto}</p>
        `;

        contenedor.appendChild(div);
    });
}

// Manejar publicación
document.getElementById("btn-publicar").addEventListener("click", () => {
    const user = SessionManager ? SessionManager.getUser() : null;
    const nombre = document.getElementById("nombre").value.trim();
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const comentario = document.getElementById("comentario").value.trim();
    const esResena = document.getElementById("checkbox-resena").checked;

    if (!nombre || !ubicacion || !comentario) {
        alert("Por favor completa todos los campos.");
        return;
    }

    let viviendaData = null;
    let rating = 0;

    if (esResena) {
        const selectVivienda = document.getElementById("select-vivienda");
        const selectedValue = selectVivienda.value;

        if (!selectedValue) {
            alert("Por favor selecciona una vivienda para tu reseña");
            return;
        }

        viviendaData = JSON.parse(selectedValue);
        rating = parseInt(document.getElementById("rating-value").textContent);

        if (rating === 0) {
            alert("Por favor selecciona una calificación de estrellas");
            return;
        }
    }

    guardarComentario(
        nombre,
        ubicacion,
        comentario,
        esResena,
        viviendaData,
        rating,
        user ? user.email : null
    );

    mostrarComentarios();

    // Limpiar formulario
    if (!user) {
        document.getElementById("nombre").value = "";
    }
    document.getElementById("ubicacion").value = "";
    document.getElementById("comentario").value = "";
    document.getElementById("checkbox-resena").checked = false;
    document.getElementById("resena-section").style.display = "none";
    document.getElementById("rating-value").textContent = "0";

    const stars = document.querySelectorAll("#star-rating i");
    stars.forEach(star => {
        star.classList.remove("fas");
        star.classList.add("far");
    });

    alert(esResena ? "¡Reseña publicada exitosamente!" : "¡Comentario publicado exitosamente!");
});
