import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PersonasComponent } from './components/personas/personas.component';
import { AutomovilesComponent } from './components/automoviles/automoviles.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { PlanesPersonasComponent } from './components/planes-personas/planes-personas.component';
import { PlanesAutomovilesComponent } from './components/planes-automoviles/planes-automoviles.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { AutomovilesService } from './services/automoviles.service';
import {  HttpClientModule } from '@angular/common/http';
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
import { AdminEditAseguradoraVehiculoComponent } from './components/admin/admin-edit-aseguradora-vehiculo/admin-edit-aseguradora-vehiculo.component';
import { AdminAseguradoraVehiculoComponent } from './components/admin/admin-aseguradora-vehiculo/admin-aseguradora-vehiculo.component';
import { AutomovilPipe } from './pipes/automovil.pipe';
import { SeguroVehiculoPipe } from './pipes/seguro-vehiculo.pipe';
import { SeguroVidaPipe } from './pipes/seguro-vida.pipe';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ControladorComponent } from './components/admin/controlador/controlador.component';
import { BaseComponent } from './components/admin/base/base.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { ClientePipe } from './pipes/cliente.pipe';
import { ModeloPipe } from './pipes/modelo.pipe';
import { AseguradoraVehiculoPipe } from './pipes/aseguradora-vehiculo.pipe';
import { AseguradoraVidaPipe } from './pipes/aseguradora-vida.pipe';
import { NgxStarsModule } from 'ngx-stars';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PersonasComponent,
    AutomovilesComponent,
    QuienesSomosComponent,
    PlanesPersonasComponent,
    PlanesAutomovilesComponent,
    LoginComponent,
    RegisterComponent,
    AdminAutomovilComponent,
    AdminEditAutomovilComponent,
    AdminPlanVidaComponent,
    AdminEditPlanVidaComponent,
    AdminSeguroVehiculoComponent,
    AdminEditSeguroVehiculoComponent,
    AdminModeloComponent,
    AdminEditModeloComponent,
    AdminAnioComponent,
    AdminEditAnioComponent,
    AdminClienteComponent,
    AdminEditClienteComponent,
    AdminAseguradoraVidaComponent,
    AdminEditAseguradoraVidaComponent,
    AdminEditAseguradoraVehiculoComponent,
    AdminAseguradoraVehiculoComponent,
    AutomovilPipe,
    SeguroVehiculoPipe,
    SeguroVidaPipe,
    DashboardComponent,
    ControladorComponent,
    BaseComponent,
    ClientePipe,
    ModeloPipe,
    AseguradoraVehiculoPipe,
    AseguradoraVidaPipe
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    NgxStarsModule
    
  ],
  providers: [AutomovilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
