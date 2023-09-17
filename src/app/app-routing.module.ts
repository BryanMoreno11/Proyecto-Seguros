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

const routes: Routes = [
  {path:'personas', component: PersonasComponent},
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
 
  {path:'automoviles', component: AutomovilesComponent},
  {path: 'quienes-somos', component: QuienesSomosComponent},
  {path: 'planes-personas', component: PlanesPersonasComponent},
  {path: 'planes-automoviles', component: PlanesAutomovilesComponent},
  {path:'admin-automovil',component:AdminAutomovilComponent},
  {path:'admin-add-automovil',component:AdminEditAutomovilComponent},
  {path:'admin-edit-automovil/:id', component:AdminEditAutomovilComponent},
  {path: '**', pathMatch:'full', redirectTo: 'personas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
