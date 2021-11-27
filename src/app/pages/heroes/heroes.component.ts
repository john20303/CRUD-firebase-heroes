import {Component, OnInit} from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {HeroeModel} from "../../models/heroe.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: any;
  loading = true;

  constructor(private _heroe: HeroesService) {
  }

  ngOnInit(): void {

    this._heroe.getHeroes().subscribe(res => {
      this.loading = false;
      this.heroes = res;
    })
  }

  deleteHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: `Estas seguro que quieres eliminar el ${heroe.nombre}?`,
      text: "No podras revertir esta acción!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then(res => {
      if (res.value) {
        this.heroes.splice(i, 1);
        this._heroe.deleteHeroeById(heroe.id).subscribe();
      }
    })
  }


}
