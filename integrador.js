// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}


// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) {
        console.log(`Chequeando disponibilidad del producto ${sku}...`);

        // Busco el producto en la "base de datos"
        try {
        const producto = await findProductBySku(sku);
        console.log("Producto disponible", producto);
        console.log(`Agregando ${cantidad} ${sku}...`)

        // Creo un producto nuevo
        const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad, producto.precio, producto.categoria);
        const productoRepetido = this.productos.find(nuevoProducto => nuevoProducto.sku === sku)
        if (this.productos.some(nuevoProducto => nuevoProducto.sku === sku)) {
            productoRepetido.cantidad += cantidad;
        } else {
            this.productos.push(nuevoProducto);
            this.categorias.push(producto.categoria);
        }
        this.precioTotal = this.precioTotal + (producto.precio * cantidad);

        
    }
    // si no encuentro el producto en la base de datos tiro error
        catch (error) {
            console.log(error);
        }
        finally {
            console.log(carrito);
        }    
    }

    eliminarProducto(sku, cantidad) {
        return new Promise((resolve, reject) => {
            setTimeout( () => {
                console.log (`Buscando ${cantidad} ${sku} en el carrito...`)}, 2000);
            setTimeout (() => { 
                const productoAEliminar = this.productos.find(producto => producto.sku === sku);
                if (productoAEliminar) {
                    resolve(productoAEliminar);
                } else {
                    reject(`${sku} no se encuentra en el carrito`);
            }}, 3000);})

            .then((res) => {
                console.log(`${sku} encontrado`, res);
                    console.log (`Eliminando ${cantidad} ${sku} del carrito...`);
                if (cantidad < res.cantidad) {
                    res.cantidad = res.cantidad - cantidad;
                    // Actualizo el precio total
                    this.precioTotal = this.precioTotal - (res.precio * cantidad);
                    console.log(carrito);
                } else {
                    // Encuentro el indice del producto a eliminar y de su categoría
                    // y los elimino con splice
                    // podría hacerlo con un .filter pero no me salió :)
                    const index = this.productos.indexOf(res);
                    const indexC = this.categorias.indexOf(res.categoria);
                    this.categorias.splice(indexC, 1);
                    this.productos.splice(index, 1);
                    // Actualizo el precio total
                    this.precioTotal = this.precioTotal - (res.precio * res.cantidad);
                    
                    console.log(carrito);
            }})
            .catch(err => {console.log(err)})}

        }

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito
    precio;    // Agrego el precio para poder restarlo del precioTotal en eliminarProducto
    categoria; // Agrego la categoria para poder borrarla del array de categorias, de ser necesario
    
    constructor(sku, nombre, cantidad, precio, categoria) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.categoria = categoria;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1500);
    });
}

const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);
carrito.agregarProducto('WE328NJ', 4);
carrito.agregarProducto('RT324GD', 4);
carrito.eliminarProducto('WE328NJ', 3);





