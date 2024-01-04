import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './components/personas/personas.component';
import { AutomovilesComponent } from './components/automoviles/automoviles.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { PlanesPersonasComponent } from './components/planes-personas/planes-personas.component';
import { PlanesAutomovilesComponent } from './components/planes-automoviles/planes-automoviles.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminAutomovilComponent } from './components/admin/admin-automovil/admin-automovil.component';
import { AdminEditAutomovilComponent } from './components/admin/admin-edit-automovil/admin-edit-automovil.component';
import { AdminPlanVidaComponent } from './components/admin/admin-plan-vida/admin-plan-vida.component';
import { AdminEditPlanVidaComponent } from './components/admin/admin-edit-plan-vida/admin-edit-plan-vida.component';
import { AdminSeguroVehiculoComponent } from './components/admin/admin-seguro-vehiculo/admin-seguro-vehiculo.component';
import { AdminEditSeguroVehiculoComponent } from './components/admin/admin-edit-seguro-vehiculo/admin-edit-seguro-vehiculo.component';
import { AdminModeloComponent } from './components/admin/admin-modelo/admin-modelo.component';
import { AdminEditModeloComponent } from './components/admin/admin-edit-modelo/admin-edit-modelo.component';
import { AdminAnioComponent } from './components/admin/admin-anio/admin-anio.component';
import { AdminEditAnioComponent } from './components/admin/admin-edit-anio/admin-edit-anio.component';
import { AdminClienteComponent } from './components/admin/admin-cliente/admin-cliente.component';
import { AdminEditClienteComponent } from './components/admin/admin-edit-cliente/admin-edit-cliente.component';
import { AdminAseguradoraVidaComponent } from './components/admin/admin-aseguradora-vida/admin-aseguradora-vida.component';
import { AdminEditAseguradoraVidaComponent } from './components/admin/admin-edit-aseguradora-vida/admin-edit-aseguradora-vida.component';
import { AdminAseguradoraVehiculoComponent } from './components/admin/admin-aseguradora-vehiculo/admin-aseguradora-vehiculo.component';
import { AdminEditAseguradoraVehiculoComponent } from './components/admin/admin-edit-aseguradora-vehiculo/admin-edit-aseguradora-vehiculo.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ControladorComponent } from './components/admin/controlador/controlador.component';
import { BaseComponent } from './components/admin/base/base.component';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';

const routes: Routes = [
  {path:'personas', component: PersonasComponent},
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/:id', component: RegisterComponent},
 

  {path:'automoviles', component: AutomovilesComponent},
  {path: 'quienes-somos', component: QuienesSomosComponent},
  {path: 'planes-personas', component: PlanesPersonasComponent},
  {path: 'planes-automoviles', component: PlanesAutomovilesComponent},
  {path:'admin-aseguradora-vehiculo',component:AdminAseguradoraVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-aseguradora-vehiculo/:id',component:AdminEditAseguradoraVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-add-aseguradora-vehiculo',component:AdminEditAseguradoraVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-aseguradora-vida',component:AdminAseguradoraVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-aseguradora-vida/:id',component:AdminEditAseguradoraVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-add-aseguradora-vida',component:AdminEditAseguradoraVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-automovil',component:AdminAutomovilComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-add-automovil',component:AdminEditAutomovilComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-automovil/:id', component:AdminEditAutomovilComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-plan-vida', component: AdminPlanVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-add-plan-vida', component: AdminEditPlanVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-plan-vida/:id', component: AdminEditPlanVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-seguro-vehiculo', component:AdminSeguroVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-seguro-vehiculo',component:AdminEditSeguroVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-seguro-vehiculo/:id',component:AdminEditSeguroVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-modelo',component:AdminModeloComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-add-modelo',component:AdminEditModeloComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-modelo/:id',component:AdminEditModeloComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-anio',component:AdminAnioComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-add-anio',component:AdminEditAnioComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-anio/:id',component:AdminEditAnioComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-cliente', component:AdminClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-add-cliente', component:AdminEditClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-edit-cliente/:id', component:AdminEditClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'admin-dashboard',component:DashboardComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
  {path:'controlador',component:ControladorComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
 
  {path:'admin',component:BaseComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas'])), children:[
    {path:'admin-users',component:AdminUsersComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-aseguradora-vehiculo',component:AdminAseguradoraVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-aseguradora-vehiculo/:id',component:AdminEditAseguradoraVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-add-aseguradora-vehiculo',component:AdminEditAseguradoraVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-aseguradora-vida',component:AdminAseguradoraVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-aseguradora-vida/:id',component:AdminEditAseguradoraVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-add-aseguradora-vida',component:AdminEditAseguradoraVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-automovil',component:AdminAutomovilComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-add-automovil',component:AdminEditAutomovilComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-automovil/:id', component:AdminEditAutomovilComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-plan-vida', component: AdminPlanVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-add-plan-vida', component: AdminEditPlanVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-plan-vida/:id', component: AdminEditPlanVidaComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-seguro-vehiculo', component:AdminSeguroVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-seguro-vehiculo',component:AdminEditSeguroVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-seguro-vehiculo/:id',component:AdminEditSeguroVehiculoComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-modelo',component:AdminModeloComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-add-modelo',component:AdminEditModeloComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-modelo/:id',component:AdminEditModeloComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-anio',component:AdminAnioComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-add-anio',component:AdminEditAnioComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-anio/:id',component:AdminEditAnioComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-cliente', component:AdminClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-add-cliente', component:AdminEditClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-edit-cliente/:id', component:AdminEditClienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    {path:'admin-dashboard',component:DashboardComponent, ...canActivate(() => redirectUnauthorizedTo(['/personas']))},
    
  ]},
  {path: '**', pathMatch:'full', redirectTo: 'personas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
