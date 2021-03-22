import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class SqlServiceService {
  baseDatos: SQLiteObject;
  clientes: Cliente[] = [];
  constructor(private sqlite: SQLite, private platform: Platform) { this.abrirBaseDeDatos(); }

  abrirBaseDeDatos() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {

          db.executeSql('create table if not exists Clientes(identificacion VARCHAR(32),nombres VARCHAR(32), apellidos VARCHAR(32), telefono VARCHAR(32), correo VARCHAR(32) )', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));

          this.baseDatos = db
          this.consultarPersonas();
        })
        .catch(e => console.log("Error al crear base de datos" + e));

    })
  }

  guardarCliente(cliente: Cliente) {
    let data = [cliente.identificacion,
    cliente.nombres,
    cliente.apellidos,
    cliente.telefono,
    cliente.correo];
    this.baseDatos.executeSql('INSERT INTO Clientes(identificacion,nombres, apellidos, telefono, correo) VALUES(?,?,?,?,?)', data)
      .then(e => console.log("INSERT EXISTOSO: " + e))
      .catch(e => console.log("INSERT ERROR: " + JSON.stringify(e)));
    this.consultarPersonas();
    return of(cliente);
  }


  consultarPersonas() {
    this.clientes = []
    this.baseDatos.executeSql('SELECT * FROM Clientes', [])
      .then((r) => {
        if (r.rows.length > 0) {
          for (var i = 0; i < r.rows.length; i++) {
            var cliente: Cliente = {
              identificacion: r.rows.item(i).identificacion,
              nombres: r.rows.item(i).nombres,
              apellidos: r.rows.item(i).apellidos,
              telefono: r.rows.item(i).telefono,
              correo: r.rows.item(i).correo
            }
            this.clientes.push(cliente);
          }
        }
      });
    return this.clientes;
  }

  editar(cliente: Cliente) {
    let data = [cliente.identificacion, cliente.nombres, cliente.apellidos, cliente.telefono, cliente.correo];
    
    this.baseDatos.executeSql(`UPDATE Clientes SET identificacion=?, nombres=?, apellidos=?, telefono=?, correo=? WHERE identificacion=${cliente.identificacion}`, data)
    .then((datos)=>
      this.consultarPersonas()
    )
    .catch((datos)=>{
      console.log(JSON.stringify(datos))
    });

  }

  eliminar(id: string) {
    this.baseDatos.transaction((p) => {
      p.executeSql(`DELETE FROM Clientes WHERE identificacion = ${id}`)
    }).then((r) => {
      this.consultarPersonas();
    });
  }


}
