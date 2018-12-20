import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';
import { Http, Headers } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-active-order',
  templateUrl: 'active-order.html',
})
export class ActiveOrderPage {

  username = '';
  usr: string;
  oorder: string;
  order: string;
  store: string;
  price: string;
  date: string;
  time: string;
  place: string;
  phone: string;
  status1: string;
  status2: string;
  status3: string;
  status4: string;
  statusData = [];
  reciever: string;
  astatus1: string;
  astatus2: string;
  astatus3: string;
  astatus4: string;

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private authProvider: AuthProvider, public navParams: NavParams,public http: Http) {
    this.usr = navParams.get('usr');
    this.order = navParams.get('order');
    this.oorder = navParams.get('order');
    this.store = navParams.get('store');
    this.price = navParams.get('price');
    this.date = navParams.get('date');
    this.time = navParams.get('time');
    this.place = navParams.get('place');
    this.phone = navParams.get('phone');
    this.reciever = navParams.get('reciever');
    this.status1 = navParams.get('status1');
    this.status2 = navParams.get('status2');
    this.status3 = navParams.get('status3');
    this.status4 = navParams.get('status4'); 
  }

  ionViewDidLoad(){
    if(this.status1 === '0' && this.status2 === '0' && this.status3 === '0' && this.status4 === '0'){
      this.astatus1 = 'isenabled';
      this.astatus2 = '!isenabled';
      this.astatus3 = '!isenabled';
      this.astatus4 = '!isenabled';
    } else if(this.status1 === '1' && this.status2 === '0' && this.status3 === '0' && this.status4 === '0'){
      this.astatus1 = '!isenabled';
      this.astatus2 = 'isenabled';
      this.astatus3 = '!isenabled';
      this.astatus4 = '!isenabled';
    } else if(this.status1 === '1' && this.status2 === '1' && this.status3 === '0' && this.status4 === '0'){
      this.astatus1 = '!isenabled';
      this.astatus2 = '!isenabled';
      this.astatus3 = 'isenabled';
      this.astatus4 = '!isenabled';
    } else if(this.status1 === '1' && this.status2 === '1' && this.status3 === '1' && this.status4 === '0'){
      this.astatus1 = '!isenabled';
      this.astatus2 = '!isenabled';
      this.astatus3 = '!isenabled';
      this.astatus4 = 'isenabled';
    } else {
      this.astatus1 = '!isenabled';
      this.astatus2 = '!isenabled';
      this.astatus3 = '!isenabled';
      this.astatus4 = '!isenabled';
    }
    this.statusData.push({
      usr: this.usr,
      order: this.order,
      store: this.store,
      date: this.date,
      time: this.time,
      place: this.place,
      price: this.price,
      phone: this.phone,
      reciever: this.reciever,
      astatus1: this.astatus1,
      astatus2: this.astatus2,
      astatus3: this.astatus3,
      astatus4: this.astatus4
    });
  }

  updateStatus(usr,order,store,date,time,place,phone,price,reciever,astatus1,astatus2,astatus3,astatus4){
    if(astatus1 === 'isenabled' && astatus2 === '!isenabled' && astatus3 === '!isenabled' && astatus4 === '!isenabled'){
      astatus1 = '1';
      astatus2 = '0';
      astatus3 = '0';
      astatus4 = '0';
      reciever = this.authProvider.currentUser.name;
    } else if(astatus1 === '!isenabled' && astatus2 === 'isenabled' && astatus3 === '!isenabled' && astatus4 === '!isenabled'){
      astatus1 = '1';
      astatus2 = '1';
      astatus3 = '0';
      astatus4 = '0';
    } else if(astatus1 === '!isenabled' && astatus2 === '!isenabled' && astatus3 === 'isenabled' && astatus4 === '!isenabled'){
      astatus1 = '1';
      astatus2 = '1';
      astatus3 = '1';
      astatus4 = '0';
    } else if(astatus1 === '!isenabled' && astatus2 === '!isenabled' && astatus3 === '!isenabled' && astatus4 === 'isenabled'){
      astatus1 = '1';
      astatus2 = '1';
      astatus3 = '1';
      astatus4 = '1';
    } else {
      console.log('error');
    }
    var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body ={ 
        oldorder: this.oorder,
        usr: usr,
        order: order,
        store: store,
        date: date,
        time: time,
        place: place,
        phone: phone,
        price: this.price,
        reciever: reciever,
        astatus1: astatus1,
        astatus2: astatus2,
        astatus3: astatus3,
        astatus4: astatus4
      }
      this.http.post('http://localhost:8080/active_status_fdriver', JSON.stringify(body), {headers: headers}).map(res => res.json()).subscribe(data => {});
      this.navCtrl.setRoot('WaitOrdersPage');
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

