import { Producto } from "../producto/producto";
import { Factura } from "./factura";

export class DetalleFactura {
    idDetalle:string;
    nombre:string;
    cantidad:number;
    valorUnitario:number;
    subTotal:number;  
}