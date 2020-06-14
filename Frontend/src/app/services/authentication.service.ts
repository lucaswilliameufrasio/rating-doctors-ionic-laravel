import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(environment.TOKEN).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  login(token) {
    return this.storage.set(environment.TOKEN, token).then(() => {
      this.authenticationState.next(true);
    });
    
  }
 
  logout() {
    return this.storage.remove(environment.TOKEN).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  getToken(){
    return this.storage.get(environment.TOKEN).then((token) => {
      return token;
    });
  }
  
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}
