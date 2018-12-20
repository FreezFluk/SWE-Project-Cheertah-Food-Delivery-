import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-edit-store',
  templateUrl: 'edit-store.html',
})
export class EditStorePage {

  username = '';
  jStoreData = [];
  oname: string;
  name: string;
  open: string;
  close: string;
  type: string;
  otype: string;

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private http: Http, private authProvider: AuthProvider, public NavParams: NavParams, private alertCtrl: AlertController) {
    this.oname = NavParams.get('name');
    this.name = NavParams.get('name');
    this.open = NavParams.get('open');
    this.close = NavParams.get('close');
    this.otype = NavParams.get('type');
    if (NavParams.get('type') === 'fastfood'){
      this.type = 'Fast Food';
    } else if (NavParams.get('type') === 'cleanfood'){
      this.type = 'Clean Food';
    } else if (NavParams.get('type') === 'snack'){
      this.type = 'Snack';
    } else if (NavParams.get('type') === 'dessert'){
      this.type = 'Dessert';
    } else {
      this.type = 'Drink';
    }
  }

  ionViewDidLoad(){
    this.http.get('http://localhost:8080/stores').map(res => res.json()).subscribe(data => {
      data.forEach(value => {
        if((value.name) === this.name){
          this.jStoreData.push({
            name: value.name,
            open: value.open,
            close: value.close,
            type: this.type,
            oldtype: this.otype
          });
        }
      });
    });
  }

  goToHome() {
    this.navCtrl.setRoot('AdminPage');
  }

  edit() {
    if(this.name != '' && this.open != '' && this.close != '' && this.type != ''){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body ={ 
        oldname: this.oname,
        name: this.name,
        open: this.open,
        close: this.close,
        type: this.type
      }
    this.http.post('http://localhost:8080/edit_store_fadmin', JSON.stringify(body), {headers: headers}).map(res => res.json()).subscribe(data => {});
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
