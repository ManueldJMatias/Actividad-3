var _toastContenedor = null;

function crearToast(opciones) {
    var mensaje = opciones.mensaje || "Notificación";
    var tipo = opciones.tipo || "info";
    var duracion = opciones.duracion || 4000;
    var posicion = opciones.posicion || "arriba-derecha";

    if (!_toastContenedor || !document.body.contains(_toastContenedor)) {
        _toastContenedor = document.createElement("div");
        _toastContenedor.className = "toast-contenedor";
        document.body.appendChild(_toastContenedor);
    }

    _toastContenedor.setAttribute("data-posicion", posicion);

    var toast = document.createElement("div");
    toast.className = "toast toast-" + tipo;

    var icono = "";
    if (tipo == "success") icono = "✓";
    else if (tipo == "error") icono = "✗";
    else if (tipo == "warning") icono = "⚠";
    else icono = "ℹ";

    var titulo = "";
    if (tipo == "success") titulo = "Éxito";
    else if (tipo == "error") titulo = "Error";
    else if (tipo == "warning") titulo = "Advertencia";
    else titulo = "Información";

    toast.innerHTML = '<div class="toast-icono">' + icono + '</div>' +
        '<div class="toast-contenido">' +
            '<div class="toast-titulo">' + titulo + '</div>' +
            '<div class="toast-mensaje">' + mensaje + '</div>' +
        '</div>' +
        '<button class="toast-cerrar" title="Cerrar">&times;</button>' +
        '<div class="toast-progreso"><div class="toast-progreso-barra"></div></div>';

    _toastContenedor.appendChild(toast);

    setTimeout(function() {
        toast.classList.add("toast-visible");
    }, 50);

    var barra = toast.querySelector(".toast-progreso-barra");
    barra.style.transition = "width " + duracion + "ms linear";
    setTimeout(function() {
        barra.style.width = "0%";
    }, 100);

    var timerCerrar = setTimeout(function() {
        cerrarToast(toast);
    }, duracion);

    var btnCerrar = toast.querySelector(".toast-cerrar");
    btnCerrar.addEventListener("click", function() {
        clearTimeout(timerCerrar);
        cerrarToast(toast);
    });

    return toast;
}

function cerrarToast(toast) {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-saliendo");
    setTimeout(function() {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 400);
}

function toastExito(mensaje, duracion) {
    return crearToast({ mensaje: mensaje, tipo: "success", duracion: duracion });
}

function toastError(mensaje, duracion) {
    return crearToast({ mensaje: mensaje, tipo: "error", duracion: duracion });
}

function toastAdvertencia(mensaje, duracion) {
    return crearToast({ mensaje: mensaje, tipo: "warning", duracion: duracion });
}

function toastInfo(mensaje, duracion) {
    return crearToast({ mensaje: mensaje, tipo: "info", duracion: duracion });
}
