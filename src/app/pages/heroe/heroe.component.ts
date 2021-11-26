import {HeroeModel} from './../../models/heroe.model';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HeroesService} from "../../services/heroes.service";
import Swal from "sweetalert2";
import {Observable} from "rxjs";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();


  constructor(private _heroe: HeroesService) {

  }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formlario no válido!');
      return;
    }
    Swal.fire({
      title: 'Espere por favor..',
      text: 'Guardando Heroe..',
      icon: 'info',
      timer: 1500,
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: any
    if (this.heroe.id) {
      peticion = this._heroe.putHeroe(this.heroe).subscribe(res => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizo correctamente....',
          icon: 'success',
          timer: 1500
        });
      });
    } else {
      peticion = this._heroe.postHeroes(this.heroe).subscribe(res => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se Creo correctamente....',
          icon: 'success',
          timer: 1500
        });
      });
    }
  }

}
