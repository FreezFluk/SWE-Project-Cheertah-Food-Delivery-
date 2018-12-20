import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-account-manage',
  templateUrl: 'account-manage.html',
})
export class AccountManagePage {

  username = '';
  myInput: any ="";
  tdata: any;
  jdata = [];

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private http: Http, public authProvider: AuthProvider) {
    
  }

  ionViewDidLoad() {
    this.http.get('http://localhost:8080/accounts').map(res => res.json()).subscribe(data => {
      data.forEach(value => {       
        this.jdata.push({
          username: value.username,
          password: value.password,
          auth: value.auth,
          usr: value.usr,
          email: value.email,
          telophone: value.telophone,
          img: value.img
        });        
      });
      this.setFilteredItems();
    });
  }

  editAccount(uname,pwd,auth,usr,email,telophone,img) {
    this.navCtrl.setRoot('EditAccountPage',{
      username: uname,
      password: pwd,
      auth: auth,
      usr: usr,
      email: email,
      telophone: telophone,
      img: img
    });
  }

  insertAccount(){
    this.navCtrl.push('RegisAccountPage');
  }

  setFilteredItems() {
    this.tdata = this.filterItems(this.myInput);
  }

  filterItems(myInput){
    return this.jdata.filter((item) => {
         return item.auth.toLowerCase().includes(myInput.toLowerCase());
     });  
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
