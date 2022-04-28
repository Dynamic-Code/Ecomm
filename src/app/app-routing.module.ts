import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  {path:"home", component:HomepageComponent},
  {path:"", redirectTo:"home",pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SingupComponent},
  {path:"cart", component:CartComponent},
  {path:"id:/details", component:ProductDetailsComponent},
  {path:"**", redirectTo:"home"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
