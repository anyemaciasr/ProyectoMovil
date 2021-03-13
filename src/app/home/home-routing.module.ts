import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,

    children: [
      {
        path: 'registroCliente',
        loadChildren: () => import('../GestionCliente/registo-cliente/registo-cliente.module').then(m => m.RegistoClientePageModule)
      },
      {
        path: 'consultaCliente',
        loadChildren: () => import('../GestionCliente/consuta-cliente/consuta-cliente.module').then(m => m.ConsutaClientePageModule)
      },
      {
        path: 'editarCliente',
        loadChildren: () => import('../GestionCliente/editar-cliente/editar-cliente.module').then(m => m.EditarClientePageModule)
      },
      {
        path: 'eliminarCliente',
        loadChildren: () => import('../GestionCliente/eliminar-cliente/eliminar-cliente.module').then(m => m.EliminarClientePageModule)
      },
      {
        path: 'registroAnimal',
        loadChildren: () => import('../GestionAnimal/registro-animal/registro-animal.module').then(m => m.RegistroAnimalPageModule)
      },
      {
        path: 'consultaAnimal',
        loadChildren: () => import('../GestionAnimal/consulta-animal/consulta-animal.module').then(m => m.ConsultaAnimalPageModule)
      },
      {
        path: 'editarAnimal',
        loadChildren: () => import('../GestionAnimal/editar-animal/editar-animal.module').then(m => m.EditarAnimalPageModule)
      },
      {
        path: 'eliminarAnimal',
        loadChildren: () => import('../GestionAnimal/eliminar-animal/eliminar-animal.module').then(m => m.EliminarAnimalPageModule)
      },
      {
        path: 'registro',
        loadChildren: () => import('../ControlFitosanitario/registro/registro.module').then(m => m.RegistroPageModule)
      },
      {
        path: 'consulta',
        loadChildren: () => import('../ControlFitosanitario/consulta/consulta.module').then(m => m.ConsultaPageModule)
      },
      {
        path: 'editar',
        loadChildren: () => import('../ControlFitosanitario/editar/editar.module').then(m => m.EditarPageModule)
      },
      {
        path: 'eliminar',
        loadChildren: () => import('../ControlFitosanitario/eliminar/eliminar.module').then(m => m.EliminarPageModule)
      },
      {
        path: 'registroProducto',
        loadChildren: () => import('../GestionProducto/registro-producto/registro-producto.module').then(m => m.RegistroProductoPageModule)
      },
      {
        path: 'consultaProducto',
        loadChildren: () => import('../GestionProducto/consulta-producto/consulta-producto.module').then(m => m.ConsultaProductoPageModule)
      },
      {
        path: 'editarProducto',
        loadChildren: () => import('../GestionProducto/editar-producto/editar-producto.module').then(m => m.EditarProductoPageModule)
      },
      {
        path: 'eliminarProducto',
        loadChildren: () => import('../GestionProducto/eliminar-producto/eliminar-producto.module').then(m => m.EliminarProductoPageModule)
      },
      {
        path: 'registroVenta',
        loadChildren: () => import('../GestionVenta/registro-venta/registro-venta.module').then(m => m.RegistroVentaPageModule)
      },
      {
        path: 'consultaVenta',
        loadChildren: () => import('../GestionVenta/consulta-venta/consulta-venta.module').then(m => m.ConsultaVentaPageModule)
      },
      {
        path: 'editarVenta',
        loadChildren: () => import('../GestionVenta/editar-venta/editar-venta.module').then(m => m.EditarVentaPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../Login/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'registrar',
        loadChildren: () => import('../Login/registrar/registrar.module').then(m => m.RegistrarPageModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
