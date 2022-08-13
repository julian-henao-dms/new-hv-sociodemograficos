import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HvFormularioComponent } from './components/hv-formulario/hv-formulario.component';
import { SociodemograficosComponent } from './components/sociodemograficos/sociodemograficos.component';
import { HeaderComponent } from './templates/header/header.component';
import { ContactoComponent } from './templates/contacto/contacto.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HvFormularioComponent,
    SociodemograficosComponent,
    HeaderComponent,
    ContactoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
