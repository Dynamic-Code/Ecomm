import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Items } from '../modal/Items.model';
import { AuthService } from '../Services/auth.service';
import { ItemsService } from '../Services/items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit,OnDestroy {
  subs: Subscription;
  loggedIn: boolean;
  cart: Items[] = [];

  constructor(
    private itemsService: ItemsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkLogin();
  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  checkLogin() {
    this.subs = this.authService.user.subscribe((data) => {
      if (data) {
        this.loggedIn = !!data;
        if (this.loggedIn) {
          this.itemsService
            .fetchForCart()
            .pipe(
              map((resData) => {
                const data = [];
                for (let key in resData) {
                  if (resData.hasOwnProperty(key))
                    data.push({ ...resData[key], id: key });
                }
                return data;
              })
            )
            .subscribe(
              (data) => {
                console.log(data);
                this.cart = data;
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }
    });
  }
}
