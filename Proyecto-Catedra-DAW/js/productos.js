let productos = [];
let mostrar = document.getElementById('productlist');
const txtBusqueda = document.getElementById('txtBusqueda');
const selectBusqueda = document.getElementById('selectBusqueda');
let productoSeleccionadoIndex = -1;

//Listar datos por LocalStorage (10%)
productos = JSON.parse(localStorage.getItem('productos')) || [];
Mostrar();


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
            <td>${producto.codigodelproducto}</td>    
            <td>${producto.categoria}</td>
            <td>${producto.precio}</td>
            <td>
            </td>
        </tr>`;
        
    });

    txtBusqueda.dispatchEvent(new Event('input'));
}


// Busca productos por nombre 
function MostrarProductosCoincidentes(productosCoincidentes) {
    mostrar.innerHTML = '';

    productosCoincidentes.forEach((producto, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.Id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.codigodelproducto}</td>
            <td>${producto.categoria}</td>
            <td>${producto.precio}</td>
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


