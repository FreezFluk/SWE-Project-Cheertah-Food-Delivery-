import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export interface User {
  name: string;
  role: number;
}

@Injectable()
export class AuthProvider {
  currentUser: User;
  
  constructor(public http: Http) {  }

  login(name: string, pw: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      var user = [];
      var pass = [];
      var auth = [];
      var n_usr = [];
      var profile = [];
      this.http.get('http://localhost:8080/accounts').map(res => res.json()).subscribe(data => {
          data.forEach(value => {
            user.push(value.username);
            pass.push(value.password);
            auth.push(value.auth);
            n_usr.push(value.usr);
            profile.push(value.profile);
          });
          for (var i=0;i<user.length;i++) {
            if (user[i] === name && pass[i] === pw) {
              if (auth[i] === 'admin') {
                this.currentUser = {
                  name: user[i],
                  role: 1
                };
                resolve(true);
              } else if (auth[i] === 'user') {
                this.currentUser = {
                  name: user[i],
                  role: 2
                };
                resolve(true);
              }  else if (auth[i] === 'driver') {
                this.currentUser = {
                  name: user[i],
                  role: 3
                };
                resolve(true);
              } else {
                resolve(false);
              }
            }
          }
      });
      // if (name === 'admin' && pw === 'admin') {
      //   this.currentUser = {
      //     name: name,
      //     role: 1
      //   };
      //   resolve(true);
      //   } else if (name === 'user' && pw === 'user') {
      //   this.currentUser = {
      //     name: name,
      //     role: 2
      //   };
      //   resolve(true);
      //   } else {
      //   resolve(false);
      // }
    });
  }
 
  isLoggedIn() {
    return this.currentUser != null;
  }
 
  isAdmin() {
    return this.currentUser.role === 1;
  }
 
  isUser() {
    return this.currentUser.role === 2;
  }

  isDriver() {
    return this.currentUser.role === 3;
  }

  logout() {
    this.currentUser = null;
  }
}
