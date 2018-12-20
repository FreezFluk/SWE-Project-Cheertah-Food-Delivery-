import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

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
  statusData = [];
  reciever: string;

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private authProvider: AuthProvider, public navParams: NavParams) {
    this.order = navParams.get('order');
    this.store = navParams.get('store');
    this.price = navParams.get('price');
    this.date = navParams.get('date');
    this.time = navParams.get('time');
    this.place = navParams.get('place');
    this.reciever = navParams.get('reciever');
    this.status1 = navParams.get('status1');
    this.status2 = navParams.get('status2');
    this.status3 = navParams.get('status3');
    this.status4 = navParams.get('status4');
  }

  ionViewDidLoad(){
    if(this.price === ""){
      this.price = "รอดำเนินการ";
    }
    if(this.status1 === "0"){
      this.status1 = "รอดำเนินการ";
    }
    if(this.status2 === "0"){
      this.status2 = "รอดำเนินการ";
    }
    if(this.status3 === "0"){
      this.status3 = "รอดำเนินการ";
    }
    if(this.status4 === "0"){
      this.status4 = "รอดำเนินการ";
    }
    if(this.status1 === "1"){
      this.status1 = "ดำเนินการ";
    }
    if(this.status2 === "1"){
      this.status2 = "ดำเนินการ";
    }
    if(this.status3 === "1"){
      this.status3 = "ดำเนินการ";
    }
    if(this.status4 === "1"){
      this.status4 = "ดำเนินการ";
    }
    this.statusData.push({
      order: this.order,
      store: this.store,
      date: this.date,
      time: this.time,
      place: this.place,
      price: this.price,
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
