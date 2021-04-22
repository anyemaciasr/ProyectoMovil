import { Producto } from "../producto/producto";
import { Factura } from "./factura";

export class DetalleFactura {
    idDetalle:string;
    factura:Factura;
    descripcion:string;
    cantidad:number;
    subTotal:number;
    valorUnitario:number;
    producto:Producto;
}