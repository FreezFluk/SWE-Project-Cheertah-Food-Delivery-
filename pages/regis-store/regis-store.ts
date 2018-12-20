import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-regis-store',
  templateUrl: 'regis-store.html',
})
export class RegisStorePage {

  username = '';
  jStoreData = [];
  name: string;
  open: string;
  close: string;
  type: string;

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private http: Http, private authProvider: AuthProvider, public NavParams: NavParams, private alertCtrl: AlertController) {
  
  }

  ionViewDidLoad() {
    this.http.get('http://localhost:8080/stores').map(res => res.json()).subscribe(data => {
      data.forEach(value => {  
        this.jStoreData.push({
          name: value.name,
          open: value.open,
          close: value.close,
          type: value.type
        });     
      });
    });
  }

  insertStore(){
    var same = 0
    if(this.name != '' && this.open != '' && this.close != '' && this.type != ''){
      this.jStoreData.forEach(data => {
        if(data.name === this.name){
          same = same + 1;
          let alert = this.alertCtrl.create({
            title: 'Insert Store Failed',
            message: 'Have Store In Application',
            buttons: ['OK']
          });
          alert.present();
        }
      });
      if(same === 0){
        if(this.type === 'Fast Food' || this.type === 'Clean Food' || this.type === 'Snack' || this.type === 'Drink' || this.type === 'Dessert'){
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          var body = { 
            name: this.name,
            open: this.open,
            close: this.close,
            type: this.type
          }
          this.http.post('http://localhost:8080/insert_stores_fadmin', JSON.stringify(body), {headers: headers}).map(res => res.json()).subscribe(data => {});
          this.navCtrl.setRoot('AdminPage');
        } else {
          let alert = this.alertCtrl.create({
            title: 'Insert Store Failed',
            message: 'Check Type Your Store',
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

  cancel(){
    this.navCtrl.setRoot('AdminPage');
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
