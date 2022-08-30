import { Component, OnInit } from '@angular/core';
interface CategoriaLicencia{
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.scss']
})
export class CargosFormComponent implements OnInit {
  categorias: CategoriaLicencia[] = [
    {value: 0, viewValue: 'A1'},
    {value: 1, viewValue: 'B1'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
