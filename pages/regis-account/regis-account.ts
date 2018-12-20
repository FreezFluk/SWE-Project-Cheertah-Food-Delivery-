import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-regis-account',
  templateUrl: 'regis-account.html',
})
export class RegisAccountPage {

  username = '';
  jAccountData = [];
  uname: string;
  pwd: string;
  repwd: string;
  auth: string;
  usr: string;
  email: string;
  telophone: string;
  code: string='';

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private http: Http, private authProvider: AuthProvider, public NavParams: NavParams, private alertCtrl: AlertController) {
  
  }

  ionViewDidLoad() {
    this.http.get('http://localhost:8080/accounts').map(res => res.json()).subscribe(data => {
      data.forEach(value => {  
        this.jAccountData.push({
          username: value.username,
        });     
      });
    });
  }

  insertAccount(){
    var same = 0
    if(this.uname != '' && this.pwd != '' && this.repwd != '' && this.usr != '' && this.email != '' && this.telophone != ''){
      this.jAccountData.forEach(data => {
        if(data.username === this.uname){
          same = same + 1;
          let alert = this.alertCtrl.create({
            title: 'Insert Acocount Failed',
            message: 'Have Account In System',
            buttons: ['OK']
          });
          alert.present();
        }
      });
      if(same === 0){
        if(this.code === '58364623' || this.code === '58364524' || this.code === ''){
          if(this.code === '58364623'){
            this.auth = 'admin'
          } else if(this.code === '58364524'){
            this.auth = 'driver'
          } else {
            this.auth = 'user'
          }
          if(this.pwd === this.repwd){
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            var body = { 
              username: this.uname,
              password: this.pwd,
              auth: this.auth,
              usr: this.usr,
              email: this.email,
              telophone: this.telophone,
              img: '../assets/profile/' + this.auth + '.png'
            }
            this.http.post('http://localhost:8080/insert_accounts_fadmin', JSON.stringify(body), {headers: headers}).map(res => res.json()).subscribe(data => {});
            this.navCtrl.setRoot('RegisAccountPage');
          } else {
            let alert = this.alertCtrl.create({
              title: 'Insert Account Failed',
              message: 'Password And Re-Password Not Same',
              buttons: ['OK']
            });
            alert.present();
          }
        } else {
          let alert = this.alertCtrl.create({
            title: 'Insert Account Failed',
            message: 'Check Your Code',
            buttons: ['OK']
          });
          alert.present();
        }
        
      }
    } else {
      let alert = this.alertCtrl.create({
        title: 'Insert Store Failed',
        message: 'Please check your data',
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
