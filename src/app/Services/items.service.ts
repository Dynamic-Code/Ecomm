import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Items } from '../modal/Items.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  _token: string
  _id:string
  getItems() {
    const url = "https://ecomm-53669-default-rtdb.firebaseio.com/Items.json"
    return this.http.get(url);
  }

  addToCart(item: Items) {
    this.authService.user.pipe(take(1)).subscribe(data => {
      this._token = data.token
      this._id = data.id
    })
    const url: string = "https://ecomm-cart-bc253-default-rtdb.firebaseio.com/"+this._id+".json"
    return this.http.post<Items>(url, item, {
      params: new HttpParams().set(
        "auth", this._token
      )
    }
    )

  }

  fetchForCart(){
    this.authService.user.pipe(take(1)).subscribe(data => {
      this._token = data.token
      this._id = data.id
      console.log(data);
      
    })
    const url: string = "https://ecomm-cart-bc253-default-rtdb.firebaseio.com/"+this._id+".json"

    return this.http.get<Items>(url, {
      params: new HttpParams().set(
        "auth", this._token
      )
    })
  }
}
