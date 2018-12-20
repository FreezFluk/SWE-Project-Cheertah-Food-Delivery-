import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams, AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-clean-food',
  templateUrl: 'clean-food.html',
})
export class CleanFoodPage {

  username = '';
  jCleanFood = [];
  orderData = {
    order: '',
    store: '',
    date: '',
    time: '',
    place: '',
    phone: '',
    reciever: ''
  };

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, public NavParams: NavParams, private appCtrl: App, private http: Http, private authProvider: AuthProvider, private alertCtrl: AlertController) {
    
  }

  ionViewDidLoad(){
    this.http.get('http://localhost:8080/stores').map(res => res.json()).subscribe(data => {
      data.forEach(value => {
        if((value.type) === 'Clean Food'){
          this.jCleanFood.push(
            { name: value.name, open: value.open, close: value.close }
          );
        }
      });
    });
  }

  sendOrder(){
    if(this.orderData.order != '' && this.orderData.store != ''  && this.orderData.date != '' && this.orderData.time != '' && this.orderData.place != '' && this.orderData.phone != ''){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body ={ 
        usr: this.authProvider.currentUser.name,
        order: this.orderData.order,
        store: this.orderData.store,
        date: this.orderData.date, 
        time: this.orderData.time, 
        place: this.orderData.place,
        price: "",
        phone: this.orderData.phone,
        reciever: this.orderData.reciever,
        status1: "0",
        status2: "0",
        status3: "0",
        status4: "0"
      }
      this.http.post('http://localhost:8080/in_order', JSON.stringify(body), {headers: headers}).map(res => res.json()).subscribe(data => {
        console.log(data);
      });      
      this.navCtrl.push('PaymentPage',{
        order: this.orderData.order,
        store: this.orderData.store,
        price: "",
        date: this.orderData.date,
        time: this.orderData.time,
        place: this.orderData.place,
        reciever: this.orderData.reciever,
        status1: "0",
        status2: "0",
        status3: "0",
        status4: "0"
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Login failed',
        message: 'Please check your credentials',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }

  cancelOrder(){
    this.navCtrl.setRoot('UserPage');
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
