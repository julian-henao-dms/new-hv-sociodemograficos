import { Component, OnInit } from '@angular/core';
import { Cargos } from './interfaces/cargos.interface';
interface Cargo{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.scss']
})
export class CargosFormComponent implements OnInit {
public otrosCargos: Cargos = {
  idPerfil: 0,
  idCandidato: 0,
  idUsuario: 0,
  id: 0,
  accion: 0,
}

public cargos: Cargo[] = [
  {value: '0', viewValue: 'Director Informática'},
  {value: '1', viewValue: 'Consultor'}
];
  constructor() { }

  ngOnInit(): void {
  }

  public guardarProgreso(){
    console.log('Cargos Guardados')
  }
}
