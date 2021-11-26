import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeroeModel} from "../models/heroe.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-firebase-heroes-default-rtdb.firebaseio.com/heroes';

  constructor(private _http: HttpClient) {
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
}
