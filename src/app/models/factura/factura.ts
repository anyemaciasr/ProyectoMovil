import { Cliente } from "../cliente/cliente";
import { DetalleFactura } from "./detalleFactura";

export class Factura {
    idFactura:string;
    fecha:Date;
    total:number;
    descuento:number;
    subTotal:number;
    cliente:Cliente;
    detallesFactura:DetalleFactura[]; 
}
