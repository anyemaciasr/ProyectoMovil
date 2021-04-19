import { Producto } from "../producto/producto";

export class Factura {
    idFactura:string;
    fecha:Date;
    total:number;
    descuento:number;
    
}
export class DetalleFactura {
    idFactura:string;
    idDetalle:string;
    cantidad:number;
    subTotal:number;
    producto:Producto;
}