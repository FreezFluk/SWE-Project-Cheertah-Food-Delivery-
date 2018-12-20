import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  username = '';
  order: string;
  store: string;
  price: string;
  date: string;
  time: string;
  place: string;
  status1: string;
  status2: string;
  status3: string;
  status4: string;
  reciever: string;

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, public NavParams: NavParams, private appCtrl: App, public http: Http, private authProvider: AuthProvider) {
    this.order = NavParams.get('order');
    this.store = NavParams.get('store');
    this.price = NavParams.get('price');
    this.date = NavParams.get('date');
    this.time = NavParams.get('time');
    this.place = NavParams.get('place');
    this.reciever = NavParams.get('reciever');
    this.status1 = NavParams.get('status1');
    this.status2 = NavParams.get('status2');
    this.status3 = NavParams.get('status3');
    this.status4 = NavParams.get('status4');
  }

  ionViewDidLoad(){

  }

  payDes() {
    this.navCtrl.setRoot('StatusPage',{
      order: this.order,
      store: this.store,
      price: this.price,
      date: this.date,
      time: this.time,
      place: this.place,
      reciever: this.reciever,
      status1: this.status1,
      status2: this.status2,
      status3: this.status3,
      status4: this.status4
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
