import { Producto } from "../producto/producto";

export class DetalleFactura {
    idFactura:string;
    idDetalle:string;
    cantidad:number;
    subTotal:number;
    producto:Producto;
}