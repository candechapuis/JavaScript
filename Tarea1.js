//1)
let piramide = n => {for (let i = "1", s=""; i <= n; s=s+" "+i, i++){
    console.log(s,i)}}
console.log(piramide(34))
//sumo " " al parámetro s sólo para que se vea más linda la pirámide impresa :D

//2)
arrayComun = []
let mismosElementos = (a, b) => {for (let i = 0; i < a.length; i++){
    if (a.includes(b[i])) {
        arrayComun.push(b[i]);
    }
    else {
        arrayComun;

    }
} console.log(arrayComun)}

console.log(mismosElementos([1,2,3,4,5,6],[2,5,7]))

//3.1 y .2)
class Carrito {

    constructor (){
        this.montoTotal= 0;
        this.productos = [];
    }

    agregarProducto (nombre, precio, unidades){
        this.montoTotal = this.montoTotal + (precio*unidades);
        if (this.productos.includes(nombre)){
            throw `El producto ${nombre} ya esta en el carrito`;
        }
        else {
            this.productos.push(nombre);
        }
    }}
    

let carrito1 = new Carrito();
carrito1.agregarProducto("leche", 30, 1);
console.log(carrito1);
carrito1.agregarProducto("leche", 30, 1);
console.log(carrito1)