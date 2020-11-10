function inicioSesion(e) {
    e.preventDefault();

    // obtengo los datos del usuario
    let usuario = document.querySelector("#usuario").value;
    let contraseña = document.querySelector("#contraseña").value;

    // obtengo el cartel de error
    let error = document.querySelector("#cartel-error");

    // validación de contenido
    if (usuario==="") {
        error.textContent = "Por favor, ingrese un nombre de usuario";
    } else if (contraseña==="") {
        error.textContent = "Por favor, ingrese una contraseña";
    } else if (JSON.parse(localStorage.getItem("contenedorUsuarios"))===null) {
        error.textContent = "El usuario y/o contraseña son erroneas";
    } else if (usuario!=="" && contraseña!=="") {
        for (let index = 0; index < JSON.parse(localStorage.getItem("contenedorUsuarios")).length; index++) {
            const verificacionUsuario = JSON.parse(localStorage.getItem("contenedorUsuarios"))[index].usuario;
            if (verificacionUsuario===usuario) {
                if (JSON.parse(localStorage.getItem("contenedorUsuarios"))[index].contraseña===contraseña) {
                    usuarioLogueado(usuario);
                    location.href ="cargar-productos.html";
                } else {
                    error.textContent = "La contraseña ingreada es erronea";
                }
            } else {
                error.textContent = "El usuario no está registrado";
            }
        }
    } 

}

function usuarioLogueado(usuario) {
    localStorage.setItem("usuarioLogueado",usuario);
}

// boton que ejecuta el registro
let btnInicioSesion = document.querySelector("#btn-inicio-sesion");
btnInicioSesion.addEventListener("click",inicioSesion);