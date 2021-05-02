export class Producto {
    codigo:string;
    nombre:string;
    categoria:string;
    precio:number;
    descripcion:string;

}

export class ProductoTemporal extends Producto{
    agregado:boolean;
    cantidad:number;
    color:string;
}