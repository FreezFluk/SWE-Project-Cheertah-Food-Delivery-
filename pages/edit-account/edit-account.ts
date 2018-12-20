import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {

  username = '';
  jAccountData = [];
  ouname: string;
  uname: string;
  pwd: string;
  auth: string;
  usr: string;
  email: string;
  telophone: string;
  img: string;

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private http: Http, private authProvider: AuthProvider, public NavParams: NavParams, private alertCtrl: AlertController) {
    this.ouname = NavParams.get('username');
    this.uname = NavParams.get('username');
    this.pwd = NavParams.get('password');
    this.auth = NavParams.get('auth');
    this.usr = NavParams.get('usr');
    this.email = NavParams.get('email');
    this.telophone = NavParams.get('telophone');
    this.img = NavParams.get('img');
  }

  ionViewDidLoad(){
    this.http.get('http://localhost:8080/accounts').map(res => res.json()).subscribe(data => {
      data.forEach(value => {
        if((value.username) === this.uname){
          this.jAccountData.push({
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
    this.navCtrl.setRoot('AdminPage');
  }

  edit() {
    if(this.uname != '' && this.pwd != ''&& this.auth != '' && this.usr != '' && this.email != '' && this.telophone != ''){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if(this.auth === 'user' || this.auth === 'admin' || this.auth === 'driver'){
        var body = { 
          oldusername: this.ouname,
          username: this.uname,
          password: this.pwd,
          auth: this.auth,
          usr: this.usr,
          email: this.email,
          telophone: this.telophone,
          img: this.img
        }
      }
    this.http.post('http://localhost:8080/edit_account_fadmin', JSON.stringify(body), {headers: headers}).map(res => res.json()).subscribe(data => {});
    this.navCtrl.setRoot('AdminPage');
    }else {
      let alert = this.alertCtrl.create({
        title: 'Edit failed',
        message: 'Please check your credentials',
        buttons: ['OK']
      });
      alert.present();
    }
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

