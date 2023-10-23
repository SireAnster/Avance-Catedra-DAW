let productos = [];
let mostrar = document.getElementById('productlist');
const txtBusqueda = document.getElementById('txtBusqueda');
const selectBusqueda = document.getElementById('selectBusqueda');
let productoSeleccionadoIndex = -1;

// Listar datos por LocalStorage
productos = JSON.parse(localStorage.getItem('productos')) || [];
Mostrar();

const frmproduct = document.getElementById('frmproduct');
const errorArea = document.getElementById('error-area'); 

frmproduct.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById('txtproductid').value;
    const nombre = document.getElementById('txtproductname').value;
    const precio = document.getElementById('txtproductprice').value;
    const cantidad = document.getElementById('txtproductcode').value;
    const descripcion = document.getElementById('txtproductdescri').value;

    // Validaciones 
    const errores = [];

    if (id === '' || nombre === '' || precio === '' || cantidad === '' || descripcion === '') {
        errores.push("Todos los campos son obligatorios.");
    }

    if (productos.some(producto => producto.Id === id)) {
        errores.push("Ya existe un producto con este ID.");
    }

    if (cantidad < 0) {
        errores.push("La cantidad no puede ser negativa.");
    }

    if (isNaN(precio) || precio < 0) {
        errores.push("El precio debe ser un número positivo.");
    }

    if (errores.length > 0) {
        errorArea.style.display = 'block';
        errorArea.innerHTML = errores.join("<br>");
        return;
    }

    errorArea.style.display = 'none';

    // Funcionamiento 
    // Si no hay errores se procede a guardar el producto.
    let producto = {
        Id: id,
        nombre: nombre,
        precio: precio,
        codigodelproducto: cantidad,
        descripcion: descripcion,
        categoria: document.getElementById('selectcategory').value,
    }

    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));

    console.clear();
    console.log("Contenido de 'productos' en localStorage:");
    console.log(JSON.parse(localStorage.getItem('productos')));

    GuardarLocalStorage();
    frmproduct.reset();

});

function GuardarLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(productos));
    Mostrar();
}

// Muestra los productos
function Mostrar() {
    mostrar.innerHTML = '';

    productos.forEach((producto, i) => {
        mostrar.innerHTML += `<tr>
            <td>${producto.Id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.codigodelproducto}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categoria}</td>
            <td>
                <button class="modificar-btn" onclick="ModificarProducto(${i})">Modificar</button>
                <button class="eliminar-btn" onclick="EliminarProducto(${i})">Eliminar</button>
            </td>
        </tr>`;
    });

    txtBusqueda.dispatchEvent(new Event('input'));
}

// Eliminar datos 
function EliminarProducto(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        Mostrar();
    }
}

// Modificar datos 
function ModificarProducto(index) {
    productoSeleccionadoIndex = index;
    const producto = productos[index];

    const nuevoNombre = prompt("Ingrese el nuevo nombre para el producto:", producto.nombre);
    if (nuevoNombre !== null) {
        while (nuevoNombre === '') {
            alert("El nombre del producto es obligatorio.");
            nuevoNombre = prompt("Ingrese el nuevo nombre para el producto:", producto.nombre);
        }
        producto.nombre = nuevoNombre;
    }

    const nuevaCantidad = prompt("Ingrese la nueva cantidad para el producto:", producto.codigodelproducto);
    if (nuevaCantidad !== null) {
        while (nuevaCantidad === '') {
            alert("La cantidad del producto es obligatoria.");
            nuevaCantidad = prompt("Ingrese la nueva cantidad para el producto:", producto.codigodelproducto);
        }
        producto.codigodelproducto = parseInt(nuevaCantidad);
    }

    const nuevoPrecio = prompt("Ingrese el nuevo precio para el producto:", producto.precio);
    if (nuevoPrecio !== null) {
        while (nuevoPrecio === '' || isNaN(nuevoPrecio) || parseFloat(nuevoPrecio) < 0) {
            if (nuevoPrecio === '') {
                alert("El precio del producto es obligatorio.");
            } else {
                alert("El precio debe ser un número positivo.");
            }
            nuevoPrecio = prompt("Ingrese el nuevo precio para el producto:", producto.precio);
        }
        producto.precio = parseFloat(nuevoPrecio);
    }

    while (true) {
        const nuevaCategoria = prompt("Ingrese la nueva categoría para el producto (Alimentos, Ropa, AseoPersonal, Electrónica, Cocina):", producto.categoria);
        if (nuevaCategoria === null) {
            break;
        }

        const categoríasPermitidas = ["Alimentos", "Ropa", "Aseo Personal", "Electrónica", "Cocina"];
        if (categoríasPermitidas.includes(nuevaCategoria)) {
            producto.categoria = nuevaCategoria;
            break;
        } else {
            alert("Error: La categoría ingresada no es válida. Solo se permiten las siguientes categorías: Alimentos, Ropa, AseoPersonal, Electrónica, Cocina");
        }
    }

    localStorage.setItem('productos', JSON.stringify(productos));
    Mostrar();
}

// Busca productos por nombre
function MostrarProductosCoincidentes(productosCoincidentes) {
    mostrar.innerHTML = '';

    productosCoincidentes.forEach((producto, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.Id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.codigodelproducto}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categoria}</td>
        `;

        mostrar.appendChild(row);
    });
}

txtBusqueda.addEventListener('input', function () {
    const searchTerm = txtBusqueda.value.toLowerCase();
    const productosCoincidentes = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));

    if (searchTerm !== '') {
        MostrarProductosCoincidentes(productosCoincidentes);
    } else {
        Mostrar();
    }
});