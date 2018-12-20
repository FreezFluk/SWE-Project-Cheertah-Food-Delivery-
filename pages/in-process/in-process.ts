import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-in-process',
  templateUrl: 'in-process.html',
})
export class InProcessPage {

  username = '';
  jInprocessList = [];

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, private appCtrl: App, private http: Http, private authProvider: AuthProvider) {

  }

  ionViewDidLoad(){
    this.http.get('http://localhost:8080/orders').map(res => res.json()).subscribe(data => {
      data.forEach(value => {
        if((value.status1) === "1" && (value.status4) === "0"){
          this.jInprocessList.push({
            usr: value.usr,
            order: value.order,
            store: value.store,
            date: value.date,
            time: value.time,
            price: value.price,
            place: value.place,
            phone: value.phone,
            reciever: value.reciever,
            status1: value.status1,
            status2: value.status2,
            status3: value.status3,
            status4: value.status4
          });
        }
      });
    });
  }

  showStatus(order,store,price,date,time,place,reciever,status1,status2,status3,status4) {
    this.navCtrl.push('StatusPage',{
      order: order,
      store: store,
      price: price,
      date: date,
      time: time,
      place: place,
      reciever: reciever,
      status1: status1,
      status2: status2,
      status3: status3,
      status4: status4
    })
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
