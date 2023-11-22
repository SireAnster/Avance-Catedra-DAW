// Variables y constantes
const API_URL = 'https://fakestoreapi.com/products';
let productos = [];
let mostrar = document.getElementById('productlist');
const txtBusqueda = document.getElementById('txtBusqueda');


//Listar datos por LocalStorage 
productos = JSON.parse(localStorage.getItem('productos')) || [];
Mostrar();


//  Obtiene los datos mediante la api
function DatosDeAPI() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            productos = data;
            Mostrar();
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
}
DatosDeAPI();

//Muestra los datos
function Mostrar() {
    mostrar.innerHTML = '';

    productos.forEach((producto, i) => {
        mostrar.innerHTML += `<tr>
            <td>${producto.id}</td>
            <td>${producto.title}</td>
            <td>${producto.description}</td>    
            <td>${producto.category}</td>
            <td>${producto.price}</td>
            <td>${producto.image}</td>
            <td>${producto.rating.rate}</td>
            <td>${producto.rating.count}</td>
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
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>    
        <td>${producto.category}</td>
        <td>${producto.price}</td>
        <td>${producto.image}</td>
        <td>${producto.rating.rate}</td>
        <td>${producto.rating.count}</td>
        `;

        mostrar.appendChild(row);
    });

}

txtBusqueda.addEventListener('input', function () {
    const searchTerm = txtBusqueda.value.toLowerCase();
    const productosCoincidentes = productos.filter(producto => producto.title.toLowerCase().includes(searchTerm));

    if (searchTerm !== '') {
        MostrarProductosCoincidentes(productosCoincidentes);
    } else {
        Mostrar();
    }
});

// Para descargar el archivo Excel
document.addEventListener("DOMContentLoaded", function () {
    const btnDescargar = document.getElementById("btnDescargar");
    btnDescargar.addEventListener("click", function () {
        const tabla = document.getElementById("datostable");
        const datos = XLSX.utils.table_to_book(tabla);
        XLSX.writeFile(datos, "ventasTotales.xlsx", { bookType: 'xlsx', bookSST: false, type: 'binary' });
    });
});













//Pipio
