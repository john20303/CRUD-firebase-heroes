import {HeroeModel} from './../../models/heroe.model';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HeroesService} from "../../services/heroes.service";
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  id: any = {};

  constructor(private _heroe: HeroesService, private _route: ActivatedRoute, private _router: Router) {

  }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id !== 'nuevo') {
      this._heroe.getHeroeById(this.id)
        .subscribe((res: any) => {
          this.heroe = res;
          this.heroe.id = this.id;
          console.log(res);
        });
    }
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
    }
    else {
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
