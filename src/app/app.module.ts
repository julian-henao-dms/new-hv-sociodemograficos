import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HvFormularioComponent } from './components/hv-formulario/hv-formulario.component';
import { SociodemograficosComponent } from './components/sociodemograficos/sociodemograficos.component';
import { HeaderComponent } from './templates/header/header.component';
import { ContactoComponent } from './templates/contacto/contacto.component';
import { HomeComponent } from './components/home/home.component';

// Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule} from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatosBasicosFormComponent } from './components/datos-basicos-form/datos-basicos-form.component';
import { DatosAdicionalesFormComponent } from './components/datos-adicionales-form/datos-adicionales-form.component';
import { CargaArchivosFormComponent } from './components/carga-archivos-form/carga-archivos-form.component';
import { EstudiosFormComponent } from './components/estudios-form/estudios-form.component';
import { ReferenciasFormComponent } from './components/referencias-form/referencias-form.component';
import { CargosFormComponent } from './components/cargos-form/cargos-form.component';
import { InformacionFamiliarFormComponent } from './components/informacion-familiar-form/informacion-familiar-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HvFormularioComponent,
    SociodemograficosComponent,
    HeaderComponent,
    ContactoComponent,
    HomeComponent,
    DatosBasicosFormComponent,
    DatosAdicionalesFormComponent,
    CargaArchivosFormComponent,
    EstudiosFormComponent,
    ReferenciasFormComponent,
    CargosFormComponent,
    InformacionFamiliarFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
