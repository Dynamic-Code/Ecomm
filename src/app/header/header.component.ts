import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Items } from '../modal/Items.model';
import { AuthService } from '../Services/auth.service';
import { ItemsService } from '../Services/items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn:boolean = false;
  subs:Subscription
  cartItems:Items[] = [];
  constructor(private authService:AuthService, private router:Router,private itemsService:ItemsService, private toaster:ToastrService) { }
  routeUrl:string
  ngOnInit() {
    this.subs = this.authService.user.subscribe(data =>{
      if(data)
      this.loggedIn = !!data

    })
    this.routeUrl = this.router.url

    console.log(this.routeUrl);
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  onLogout(){
    this.loggedIn = false;
    this.authService.logOut();
  }

  gotoCart(){
    if(!this.loggedIn){
      this.toaster.error("Please Login to continue",'error');
    }
    this.router.navigate(['cart'])

  }

  

}
