import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Cargos } from './interfaces/cargos.interface';

interface Cargo{
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.scss']
})
export class CargosFormComponent implements OnInit {

  public disabledButtonNext: boolean = true;

  public idEmp: number = 3;
  public numRegla: number = 159;
  public cargos: Cargo[] = [];

  public otrosCargos: Cargos = {
    idPerfil: 0,
    idCandidato: 0,
    idUsuario: 0,
    id: 0,
    accion: 0,
  }

  constructor(
    private _storaged: SessionStorageService,
    private apiService: ApiService,
    private messageService: MessagesService
    ) { }

  async ngOnInit(): Promise<void> {
    // const loading = await this.messageService.waitInfo('Estamos cargando la información... Por favor espere.');
    const idEmp = this.idEmp;
    const numRegla = this.numRegla

    const cargoAplica = await this.getAnyInformationAlt('/ReglaNegocio/' + idEmp + '/' + numRegla + '/' + 'p' + '/' + 'perfil');
    console.log(cargoAplica);
    this.cargos = cargoAplica;
    // loading.close();
  }

  private async getAnyInformationAlt(service: string): Promise<any> {
    return new Promise((resolve, reject) => {
       this.apiService.getInformacionMaestros(service).subscribe({
        next: (v) => resolve(v),
        error: (e) => {
          console.info(e);
          resolve(null);
        }
      });
    });
  }

  public guardarProgreso(){
    // console.log('Cargos Guardados', this.otrosCargos);
    // this._storaged.set('otrosCargosStorage', this.otrosCargos);
    this.disabledButtonNext = false;

  }
  public getLocalStorage(){
    // console.log('Cargar Cargos', this.otrosCargos);
    // this._storaged.get('otrosCargosStorage');
  }
}
