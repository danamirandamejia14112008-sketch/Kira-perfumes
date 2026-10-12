/* =====================================
   KIRA PERFUMES - FUNCIONES
===================================== */

// 1. CONFIGURA TU WHATSAPP AQUÍ
// Escribe el indicativo del país y el número,
// sin espacios, signos ni guiones.

const WHATSAPP = "573205810086";

// 2. CONFIGURA LOS PRODUCTOS
// Cambia nombres, precios, descripciones e imágenes.
// Los precios son ejemplos y debes reemplazarlos.

const perfumes = [
    {
        nombre: "Guess Gold",
        categoria: "dama",
        descripcion: "Un aroma elegante para momentos especiales.",
        precio: 105000,
        imagen: "imagenes-dama-1.jpeg",
        etiqueta: "DESTACADO"
    },
    {
        nombre: "Lopeie",
        categoria: "dama",
        descripcion: "Una fragancia delicada y llena de personalidad.",
        precio: 95000,
        imagen: "imagenes-dama-2.jpeg",
        etiqueta: "ELEGANCIA"
    },
    {
        nombre: "Desire",
        categoria: "dama",
        descripcion: "Un aroma sofisticado para acompañar tu estilo.",
        precio: 125000,
        imagen: "imagenes-dama-3.jpeg",
        etiqueta: "ESPECIAL"
    },
    {
        nombre: "Rive D'OR",
        categoria: "dama",
        descripcion: "Notas elegantes para quienes aman los aromas envolventes.",
        precio: 130000,
        imagen: "imagenes-dama-4.jpeg",
        etiqueta: "FAVORITO"
    },
    {
        nombre: "D'orsay",
        categoria: "caballero",
        descripcion: "Una fragancia intensa para ocasiones especiales.",
        precio: 110000,
        imagen: "caballero-1.jpeg",
        etiqueta: "DESTACADO"
    },
    {
        nombre: "Magnat",
        categoria: "caballero",
        descripcion: "Un aroma elegante con personalidad propia.",
        precio: 90000,
        imagen: "caballero-2.jpeg",
        etiqueta: "ELEGANCIA"
    },
    {
        nombre: "Bleu",
        categoria: "caballero",
        descripcion: "Una fragancia de carácter para cada ocasión.",
        precio: 90000,
        imagen: "caballero-3.jpeg",
        etiqueta: "ESPECIAL"
    },
    {
        nombre: "9PM",
        categoria: "caballero",
        descripcion: "Un aroma fresco para acompañar tus días.",
        precio: 105000,
        imagen: "caballero-4.jpeg",
        etiqueta: "FAVORITO"
    }
];

// 3. VARIABLES DE LA PÁGINA

const contenedor = document.getElementById("productos");
const campoBusqueda = document.getElementById("busqueda");
const selectorOrden = document.getElementById("ordenar");
const sinResultados = document.getElementById("sinResultados");

let filtroActual = "todos";

// 4. FORMATEAR PRECIOS EN PESOS COLOMBIANOS

function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(precio);
}

// 5. CREAR EL ENLACE DE WHATSAPP

function crearEnlaceWhatsApp(mensaje) {
    const numero = WHATSAPP.replace(/\D/g, "");

    // Evita abrir un número de ejemplo sin configurar.
    if (
        numero === "573000000000" ||
        numero.length < 10
    ) {
        return "#contacto";
    }

    return "https://wa.me/" + numero +
           "?text=" + encodeURIComponent(mensaje);
}

// 6. MOSTRAR LOS PRODUCTOS

function mostrarPerfumes() {
    const busqueda = campoBusqueda.value
        .trim()
        .toLowerCase();

    let lista = perfumes.filter(function(perfume) {
        const coincideCategoria =
            filtroActual === "todos" ||
            perfume.categoria === filtroActual;

        const coincideBusqueda =
            perfume.nombre.toLowerCase().includes(busqueda) ||
            perfume.descripcion.toLowerCase().includes(busqueda) ||
            perfume.categoria.toLowerCase().includes(busqueda);

        return coincideCategoria && coincideBusqueda;
    });

    // ORDENAR LOS RESULTADOS

    if (selectorOrden.value === "menor") {
        lista.sort((a, b) => a.precio - b.precio);
    }

    if (selectorOrden.value === "mayor") {
        lista.sort((a, b) => b.precio - a.precio);
    }

    if (selectorOrden.value === "nombre") {
        lista.sort((a, b) =>
            a.nombre.localeCompare(b.nombre, "es")
        );
    }

    contenedor.innerHTML = "";

    sinResultados.hidden = lista.length !== 0;

    // CREAR UNA TARJETA POR CADA PERFUME

    lista.forEach(function(perfume) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto";

        const imagen = document.createElement("img");
        imagen.src = perfume.imagen;
        imagen.alt = perfume.nombre;
        imagen.loading = "lazy";

        // Si falta una foto, mostrar un espacio decorativo.
        imagen.onerror = function() {
            const espacio = document.createElement("div");
            espacio.className = "foto-placeholder";

            const simbolo = document.createElement("span");
            simbolo.textContent = "K";

            const texto = document.createElement("small");
            texto.textContent = perfume.imagen;

            espacio.append(simbolo, texto);
            imagen.replaceWith(espacio);
        };

        const zonaFoto = document.createElement("div");
        zonaFoto.className = "producto-foto";

        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta-producto";
        etiqueta.textContent = perfume.etiqueta;

        zonaFoto.append(imagen, etiqueta);

        const informacion = document.createElement("div");
        informacion.className = "producto-info";

        const categoria = document.createElement("span");
        categoria.className = "categoria-producto";
        categoria.textContent =
            perfume.categoria === "dama"
                ? "Perfume para dama"
                : "Perfume para caballero";

        const nombre = document.createElement("h3");
        nombre.textContent = perfume.nombre;

        const descripcion = document.createElement("p");
        descripcion.className = "producto-descripcion";
        descripcion.textContent = perfume.descripcion;

        const pie = document.createElement("div");
        pie.className = "producto-pie";

        const precio = document.createElement("span");
        precio.className = "precio";
        precio.textContent = formatearPrecio(perfume.precio);

        const boton = document.createElement("a");
        boton.className = "boton-consultar";
        boton.textContent = "CONSULTAR ↗";
        boton.href = crearEnlaceWhatsApp(
            "Hola, quiero más información sobre el perfume " +
            perfume.nombre + " de Kira Perfumes."
        );
        boton.target = "_blank";
        boton.rel = "noopener noreferrer";

        pie.append(precio, boton);

        informacion.append(
            categoria,
            nombre,
            descripcion,
            pie
        );

        tarjeta.append(zonaFoto, informacion);
        contenedor.appendChild(tarjeta);
    });
}

// 7. FILTROS DE DAMA, CABALLERO Y TODOS

document.querySelectorAll(".filtro").forEach(function(boton) {
    boton.addEventListener("click", function() {
        filtroActual = boton.dataset.filtro;

        document.querySelectorAll(".filtro").forEach(function(filtro) {
            filtro.classList.remove("activo");
        });

        boton.classList.add("activo");
        mostrarPerfumes();
    });
});

// 8. BUSCADOR

campoBusqueda.addEventListener("input", mostrarPerfumes);

// 9. ORDENAR PRECIOS Y NOMBRES

selectorOrden.addEventListener("change", mostrarPerfumes);

// 10. MENÚ PARA CELULARES

const menuToggle = document.getElementById("menuToggle");
const navegacion = document.getElementById("navegacion");

menuToggle.addEventListener("click", function() {
    const abierto = navegacion.classList.toggle("abierto");

    menuToggle.setAttribute("aria-expanded", abierto);
    menuToggle.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.textContent = abierto ? "✕" : "☰";
});

navegacion.querySelectorAll("a").forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        navegacion.classList.remove("abierto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    });
});

// 11. CONECTAR LOS BOTONES GENERALES A WHATSAPP

document.querySelectorAll(".whatsapp-link").forEach(function(enlace) {
    enlace.href = crearEnlaceWhatsApp(
        "Hola, vengo de la página web de Kira Perfumes. " +
        "Quiero más información sobre sus fragancias."
    );
});

// 12. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA

document.getElementById("anio").textContent =
    new Date().getFullYear();

// 13. MOSTRAR EL CATÁLOGO AL ABRIR LA PÁGINA

mostrarPerfumes();