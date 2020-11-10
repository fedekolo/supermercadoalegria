let usuarioLogueado = localStorage.getItem("usuarioLogueado");

if (usuarioLogueado==null) {
    location.href="index.html";
}