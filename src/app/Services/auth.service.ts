import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject , tap } from 'rxjs';
import { SignUpandLoginInResponse, User } from '../modal/SignUpData.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user = new BehaviorSubject <User>(null);
  private tokenExpirationTimer: any;

  ngOnInit() {
  }

  getAuthDetails(){
    const userData :{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
    }
   = JSON.parse(localStorage.getItem('userData'));
   if(!userData){
    return;
    }
    const loadeduser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    this.user.next(loadeduser)
    this.user.subscribe(data => {
    })
    }
  

constructor(private http: HttpClient) { }

singUp(email: string, password: string,) {
  const url: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?"
  return this.http.post<SignUpandLoginInResponse>(url,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    , {
      params: new HttpParams().set('key', 'AIzaSyA16Iw_phxrKiZnNcBlZ1-YvLvO9gQbRm4')
    }).pipe(tap(resData => {
      this.handelAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
}

login(email: string, password: string) {
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?"
  return this.http.post<SignUpandLoginInResponse>(url,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }, {
    params: new HttpParams().set('key', 'AIzaSyA16Iw_phxrKiZnNcBlZ1-YvLvO9gQbRm4'),
  }).pipe(tap(resData => {
    this.handelAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
  }))
}

logOut(){
  this.user.next(null);
  localStorage.removeItem('userData');
  if (this.tokenExpirationTimer) {
    clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer = null;

}

autoLogOut(expirationDuration : number){
  this.tokenExpirationTimer = setTimeout(() => {
    this.logOut();
  }, expirationDuration);
}

  private handelAuth(email: string, localId: string, idToken: string, expiresIn: number){
  const expDate = new Date(new Date().getTime() + expiresIn * 1000)
  const user = new User(email, localId, idToken, expDate);
  this.user.next(user);
  this.autoLogOut(expiresIn * 1000);
  localStorage.setItem('userData', JSON.stringify(user));
}

  
}
