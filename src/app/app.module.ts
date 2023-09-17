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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminAutomovilComponent } from './components/admin/admin-automovil/admin-automovil.component';
import { AdminEditAutomovilComponent } from './components/admin/admin-edit-automovil/admin-edit-automovil.component';




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
    AdminEditAutomovilComponent
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [AutomovilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
