import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  username = '';
  pages = [];

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private appCtrl: App) {
  }

  ionViewWillEnter() {
    if(this.authProvider.isAdmin()){
      this.pages = [
        { title: 'Home', page: 'AdminPage', icon: 'list-box' }, // status order finished
        { title: 'Waiting Order', page: 'WaitOrdersPage', icon: 'cart' }, // wait recieve
        { title: 'Inprocess Order', page: 'InProcessPage', icon: 'paper-plane' }, // in process
        { title: 'Stores Manage', page: 'StoreManagePage', icon: 'home' }, // edit stores
        { title: 'Account Manage', page: 'AccountManagePage', icon: 'person' } // edit accounts
      ];
      this.openPage('AdminPage');
    } else if (this.authProvider.isDriver()){
      this.pages = [
        { title: 'Home', page: 'DriverPage', icon: 'play' }, //recieved order => check status => edit cost and status
        { title: 'Waiting Oder', page: 'WaitOrdersPage', icon: 'cart' } // orderlist for don't recieved
        //{ title: 'Home', page: 'DriverPage', icon: 'list-box' } // check order finished
      ];
      this.openPage('DriverPage');
    } else {
      this.pages = [
        { title: 'Home', page: 'UserPage', icon: 'home'},
        { title: 'Order List', page: 'OrderListPage', icon: 'list-box'},
        { title: 'Account', page: 'AccountPage', icon: 'person'}
      ];
      this.openPage('UserPage');
    }
    this.username = this.authProvider.currentUser.name;
  }

  openPage(page){
    this.nav.setRoot(page);
  }

  logout() {
    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot('LoginPage')
  }

  ionViewEnter(){
    return this.authProvider.isLoggedIn();
  }

}
