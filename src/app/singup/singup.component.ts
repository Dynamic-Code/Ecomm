import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SignUpandLoginInResponse} from '../modal/SignUpData.model';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  isLoggedin:boolean = false
  signUp: FormGroup;
  response:SignUpandLoginInResponse;
  constructor (private authService:AuthService, private toastr: ToastrService, private router:Router) {

  }

  onSubmit() {
    this.authService.singUp(this.signUp.value.email,this.signUp.value.password).subscribe((data:SignUpandLoginInResponse) => {
     
      this.toastr.success("Sucessfully Singup, Please login to continue",'success')
      this.router.navigate(["/home"]);
    },error => {
      const err = this.handleError(error);
      this.toastr.error(err.message,'Error') 
    })
    
  }
  ngOnInit() {
    this.signUp = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    })

  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error ){
      const err = new Error(errorMessage); throwError(() => err);
      return err;
    }
    switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct';
            break;
      }
       const err = new Error(errorMessage); throwError(() => err);
       return err;

}

}

  // signUpFormData() {
  //   if (this.signUp.valid) {
  //     this.signUp = new FormGroup({
  //       name: new FormControl(this.signUp.value.name, Validators.required),
  //       email: new FormControl(this.signUp.value.email, Validators.required),
  //       password: new FormControl(this.signUp.value.password, Validators.required)

  //     }
  //     )
  //   }
  //   else {
  //     console.log("form not valid");
  //   }
  //   this.signUp.reset();
  // }

