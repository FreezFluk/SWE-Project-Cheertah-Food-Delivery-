import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  username = '';
  jProfileData = [];

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private http: Http, private authProvider: AuthProvider) {
    
  }

  ionViewDidLoad(){
    this.http.get('http://localhost:8080/accounts').map(res => res.json()).subscribe(data => {
      data.forEach(value => {
        if((value.username) === this.authProvider.currentUser.name){
          this.jProfileData.push({
            username: value.username,
            password: value.password,
            auth: value.auth,
            usr: value.usr,
            email: value.email,
            telophone: value.telophone,
            img: value.img
          });
        }
      });
    });
  }

  goToHome() {
    this.navCtrl.setRoot('UserPage');
  }

  edit(uname,pwd,auth,usr,email,telophone,img) {
    this.navCtrl.setRoot('EditProfilePage',{
      username: uname,
      password: pwd,
      auth: auth,
      usr: usr,
      email: email,
      telophone: telophone,
      img: img
    });
  }

  Register(){
    this.navCtrl.push('RegisAccountPage');
  }

  ionViewWillEnter() {
    this.username = this.authProvider.currentUser.name;
  }

  logout() {
    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot('LoginPage')
  }

  ionViewEnter(){
    return this.authProvider.isLoggedIn();
  }

}
