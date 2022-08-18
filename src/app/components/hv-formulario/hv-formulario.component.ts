import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-hv-formulario',
  templateUrl: './hv-formulario.component.html',
  styleUrls: ['./hv-formulario.component.scss']
})
export class HvFormularioComponent implements OnInit {
  public ImageBaseData:any  | ArrayBuffer=null;
  public formData = new FormData();
  // public dataPickerConfig: Partial<BsDatepickerConfig>;

   // Pestaña Datos Basico

   public txtusuario:string = "";
   public CBOtipo_candidato:string = "";
   public txtidentificacion:string="";
   public cbopais:string="";
   public cbociudad:string="";
   public cboTipo:string="";
   public cboDpto:string="";
   public txtnombre:string="";
   public txtapellido:string="";
   public CBOentidad:string="";
   public CBOestadocivil:string="";
   public RadioSexo:string="";
   public txtfechanace:string="";
   public txtdireccion:string="";
   public txttelefono:string="";
   public txtcelular:string="";
   public txtcorreo:string="";
   public cbocargo:string="";
   public cbonivel_academico:string="";
   public cboexperiencia:string="";
   public cbolengua_extranjera:string="";
 
   public DisplayEntidad:string="";

   // Validaciones
   public FormValida:any = [];

  public isLinear = false;
  public isActive = true;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  seventhFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

}
