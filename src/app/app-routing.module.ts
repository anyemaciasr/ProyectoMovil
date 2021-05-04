import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./GestionCliente/registo-cliente/registo-cliente.module').then( m => m.RegistoClientePageModule)
  },
  {
    path: 'consulta-cliente',
    loadChildren: () => import('./GestionCliente/consuta-cliente/consuta-cliente.module').then( m => m.ConsutaClientePageModule)
  },
  {
    path: 'editar-cliente/:id',
    loadChildren: () => import('./GestionCliente/editar-cliente/editar-cliente.module').then( m => m.EditarClientePageModule)
  },
  
  {
    path: 'registro-venta/:id',
    loadChildren: () => import('./GestionVenta/registro-venta/registro-venta.module').then( m => m.RegistroVentaPageModule)
  },
  {
    path: 'editar-venta',
    loadChildren: () => import('./GestionVenta/editar-venta/editar-venta.module').then( m => m.EditarVentaPageModule)
  },
  {
    path: 'consulta-venta',
    loadChildren: () => import('./GestionVenta/consulta-venta/consulta-venta.module').then( m => m.ConsultaVentaPageModule)
  },
  {
    path: 'registro-animal',
    loadChildren: () => import('./GestionAnimal/registro-animal/registro-animal.module').then( m => m.RegistroAnimalPageModule)
  },
  {
    path: 'consulta-animal',
    loadChildren: () => import('./GestionAnimal/consulta-animal/consulta-animal.module').then( m => m.ConsultaAnimalPageModule)
  },
  {
    path: 'editar-animal/:id',
    loadChildren: () => import('./GestionAnimal/editar-animal/editar-animal.module').then( m => m.EditarAnimalPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./ControlFitosanitario/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'consulta',
    loadChildren: () => import('./ControlFitosanitario/consulta/consulta.module').then( m => m.ConsultaPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./ControlFitosanitario/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'registro-producto',
    loadChildren: () => import('./GestionProducto/registro-producto/registro-producto.module').then( m => m.RegistroProductoPageModule)
  },
  {
    path: 'consulta-producto',
    loadChildren: () => import('./GestionProducto/consulta-producto/consulta-producto.module').then( m => m.ConsultaProductoPageModule)
  },
  {
    path: 'editar-producto/:id',
    loadChildren: () => import('./GestionProducto/editar-producto/editar-producto.module').then( m => m.EditarProductoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./Login/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'modal-productos',
    loadChildren: () => import('./pages/modal-productos/modal-productos.module').then( m => m.ModalProductosPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./login/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'modal-clientes',
    loadChildren: () => import('./pages/modal-clientes/modal-clientes.module').then( m => m.ModalClientesPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
