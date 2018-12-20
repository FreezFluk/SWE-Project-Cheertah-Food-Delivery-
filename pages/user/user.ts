import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  username = '';

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private authProvider: AuthProvider) {
    
  }

  gotoPage(page){
    this.navCtrl.push(page);  
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
