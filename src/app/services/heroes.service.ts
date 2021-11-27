import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeroeModel} from "../models/heroe.model";
import {map,delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-firebase-heroes-default-rtdb.firebaseio.com/heroes';

  constructor(private _http: HttpClient) {
  }


  getHeroeById(id: string) {
    return this._http.get(`${this.url}/${id}.json`);
  }

  //Esta es la función con la que enviamos un nuevo héroe al server
  postHeroes(heroe: HeroeModel) {
    return this._http.post<HeroeModel>(`${this.url}.json`, heroe)
      .pipe(
        map((res: any) => {
          heroe.id = res.name;
          return heroe;
        })
      )
  }

//  Esta es la función con la que actualizamos un héroe existente.
  putHeroe(heroe: HeroeModel) {
    const heroeTemporal = {
      ...heroe
    };
    delete heroeTemporal.id;
    return this._http.put(`${this.url}/${heroe.id}.json`, heroe)
      .pipe(
        map(res => {
          return res;
        })
      )
  }


//  Esta es la función Con la que treamos todos los datos desde nuestro server.
  getHeroes() {
    return this._http.get(`${this.url}.json`)
      .pipe(
        map(this.crearArr),
        delay(500)//Este delay , lo que hace es reatardar el server , solo para ver si el loading esta funcionando!!!

      );
  }

  //Esta es la función que nos permite filtar los datos que vienen como objetos.
  private crearArr(heroesObj: any) {
    const heroes: HeroeModel[] = [];
    if (heroesObj === null) {
      return;
    }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }


  deleteHeroeById(id: any){
    return this._http.delete(`${this.url}/${id}.json`);
  }
}
