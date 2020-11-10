// let products = [];

// let producto = {
//     nombre: "Coca cola",
//     tamano: "1,5L",
//     precio: 150
// }

// products.push(producto)

// localStorage.setItem('productos', JSON.stringify(products));

// let cuerpo = document.querySelector('#contenido');

// let productos = JSON.parse(localStorage.getItem('productos'));

// let table = "<div class='hola'>";

// if(productos !== null) {
//     console.log(productos);
//     cuerpo.innerHTML = table;
//     productos.forEach(producto => {
        
//         console.log(producto.nombre)
//         // cuerpo.innerHTML = "<tr>";
//         // cuerpo.innerHTML = "<td>";
//         cuerpo.innerHTML += producto.nombre
//         // cuerpo.innerHTML = "</td>";
//         // cuerpo.innerHTML = "</tr>";
//     });
//     // cuerpo.innerHTML = "</table>";
// }

// desde aca

function confirmacion() {
    Swal.fire({
        icon: 'success',
        text: 'Producto guardado!',
        showConfirmButton: false,
        timer: 1500
    })
}

let productos = [];

function guardarProducto(e) {
    e.preventDefault();

    let nombre = document.querySelector('#nombre').value;
    let cantidad = document.querySelector('#cantidad').value;
    let precio = document.querySelector('#precio').value;

    let getId = localStorage.getItem('id');
    let id;

    if(getId) {
        id = getId;
        id++;
        localStorage.setItem('id', id);
    } else {
        localStorage.setItem('id', 1);
        id = 1;
    }

    let producto = {
        id: id,
        nombre: nombre,
        cantidad: cantidad,
        precio: precio
    }

    // productos = "[{},{}]"

    let productosExistentes = JSON.parse(localStorage.getItem("productos"));

    // productos = [{},{}]
    


    // obtengo el cartel de error
    let errorModal = document.querySelector("#error-modal");
    let btnModal = document.querySelector("#guardar");
    btnModal.removeAttribute("data-dismiss");

    // validacion de productos ingresados
    if (nombre==="") {
        errorModal.textContent = "Por favor, ingrese un nombre de producto";
    } else if (cantidad==="") {
        errorModal.textContent = "Por favor, ingrese la cantidad del producto";
    } else if (precio==="") {
        errorModal.textContent = "Por favor, ingrese el precio del producto";
    } else {

        // si se validan todos los datos, ingresa el nuevo producto
        if(productosExistentes !== null) {
            productosExistentes.push(producto);
            localStorage.setItem('productos',JSON.stringify(productosExistentes));
            confirmacion();
        } else {
            productos.push(producto);
            // [{}]
            localStorage.setItem('productos',JSON.stringify(productos));
            confirmacion();
        }
        limpiarForm();
        btnModal.setAttribute("data-dismiss","modal");
        mostrarProductos();
        
    }


}

function limpiarForm() {
    document.querySelector('#nombre').value = '';
    document.querySelector('#cantidad').value = '';
    document.querySelector('#precio').value = '';
    document.querySelector('#error-modal').textContent = '';
}

function eliminarProductos() {
    localStorage.removeItem("productos");
    localStorage.removeItem("id");
}

function mostrarProductos() {
    let productosExistentes = JSON.parse(localStorage.getItem("productos"));

    let table = document.querySelector('#table');
    // eliminamos la tabla en pantalla para volver a dibujarla completa (esto evita duplicar los productos)
    table.innerHTML = `<tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acción</th>
        </tr>`;

    if(productosExistentes !== null) {

        productosExistentes.forEach(product => {
            table.insertAdjacentHTML('beforeend', `<tr>
                <td>${product.nombre}</td>
                <td>${product.cantidad}</td>
                <td>${product.precio}</td>
                <td><button class="btn btn-danger" onclick="eliminarProducto(${product.id})">Borrar</btn></td>
            </tr>`);
        });
    }
}

function eliminarProducto(id) {
    Swal.fire({
        title: 'Desea eliminar el producto?',
        showDenyButton: true,
        confirmButtonText: `Aceptar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                text: 'Producto eliminado!',
                showConfirmButton: false,
                timer: 1500
            })
            let productosExistentes = JSON.parse(localStorage.getItem("productos"));
            let filtrado = productosExistentes.filter(producto => producto.id != id);
            localStorage.setItem('productos',JSON.stringify(filtrado));
            mostrarProductos();
        }
    })
}

function exit() {
    localStorage.removeItem("usuarioLogueado");
}

mostrarProductos();


// array productos = [
//     {
//         nombre,
//         cantidad,
//         precio,
//         categoria
//     },
//     {
//         nombre,
//         cantidad,
//         precio,
//         vencimiento
//     },
//     {
//         nombre,
//         cantidad,
//         precio,
//         lote
//     },
//     {
//         nombre: "cesar",
//         cantidad,
//         precio
//     }
// ]

// [1, 2, 3, 4]
// [{},{},{},{}, 2, false]
// [nombre, cesar]