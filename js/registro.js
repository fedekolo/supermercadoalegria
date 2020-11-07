// contenedor de usuarios
let contenedorUsuarios = [];

function nuevoUsuario(e) {
    e.preventDefault();

    // obtengo los datos del registro
    let usuario = document.querySelector("#usuario").value;
    let contraseña = document.querySelector("#contraseña").value;
    let confirmacionContraseña = document.querySelector("#confirmacion-contraseña").value;

    // obtengo el cartel de error
    let error = document.querySelector("#cartel-error");

    // validación de contenido
    if (usuario==="") {
        error.textContent = "Por favor, ingrese un nombre de usuario";
    } else if (contraseña==="") {
        error.textContent = "Por favor, ingrese una contraseña";
    } else if (contraseña!==confirmacionContraseña) {
        error.textContent = "Las contraseñas ingresadas no son iguales";
    } else if (usuario!=="" && JSON.parse(localStorage.getItem("contenedorUsuarios"))!==null) {
        for (let index = 0; index < JSON.parse(localStorage.getItem("contenedorUsuarios")).length; index++) {
            const verificacionUsuario = JSON.parse(localStorage.getItem("contenedorUsuarios"))[index].usuario;
            if (verificacionUsuario===usuario) {
                error.textContent = "El usuario ingresado ya existe, prueba con otro";
            }
        }
    } else {
        error.textContent = "";
        const usuarioNuevo = {
            usuario: usuario,
            contraseña: contraseña,
        }

        // guardo el usuario en el local storage
        let usuariosExistentes = JSON.parse(localStorage.getItem("contenedorUsuarios"));

        if (usuariosExistentes !== null) {
            usuariosExistentes.push(usuarioNuevo);
            localStorage.setItem("contenedorUsuarios",JSON.stringify(usuariosExistentes));
        } else {
            contenedorUsuarios.push(usuarioNuevo);
            localStorage.setItem("contenedorUsuarios",JSON.stringify(contenedorUsuarios));
        }

        // redirecciono la pagina con el logueo nuevo
        location.href ="productos.html";
    }

}

// boton que ejecuta el registro
let btnRegistro = document.querySelector("#btn-registro");
btnRegistro.addEventListener("click",nuevoUsuario);




