import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SignUpandLoginInResponse } from '../modal/SignUpData.model';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logIn:FormGroup
  logInRes:SignUpandLoginInResponse
  constructor(private authService:AuthService, private toaster:ToastrService, private router:Router) { }

  ngOnInit() {
    this.logIn = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
    })
  }

  submit(){
    this.authService.login(this.logIn.value.email,this.logIn.value.password).subscribe((data:SignUpandLoginInResponse)=>{
      this.toaster.success("Sucessfully Logged In",'success')
      this.router.navigate(["/home"]);
    },(error:HttpErrorResponse)=>{
      const err = this.handleError(error)
      this.toaster.error(err.message,'error')
    })
  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error ){
      const err = new Error(errorMessage); throwError(() => err);
      return err;
    }
    switch(errorRes.error.error.message){
        case 'USER_DISABLED':
          errorMessage = 'This email has been disabled';
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
