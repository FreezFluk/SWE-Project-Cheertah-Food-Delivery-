import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, App, Nav, NavParams, AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-store-manage',
  templateUrl: 'store-manage.html',
})
export class StoreManagePage {

  username = '';
  myInput: any ="";
  tdata: any;
  otype: string;
  type: string;
  jdata = [];

  @ViewChild(Nav) nav:Nav;

  constructor(public navCtrl: NavController, public NavParams: NavParams, private appCtrl: App, private http: Http, private authProvider: AuthProvider, public alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {
    this.http.get('http://localhost:8080/stores').map(res => res.json()).subscribe(data => {
      data.forEach(value => {  
        if(value.type === 'Fast Food'){
          this.otype = 'Fast Food';
          this.type = 'fastfood';
        } else if (value.type === 'Clean Food'){
          this.otype = 'Clean Food';
          this.type = 'cleanfood';
        } else if (value.type === 'Snack'){
          this.otype = 'Snack';
          this.type = 'snack';
        } else if (value.type === 'Dessert'){
          this.otype = 'Dessert';
          this.type = 'dessert';
        } else {
          this.otype = 'Drink';
          this.type = 'drink';
        }
        this.jdata.push({
          name: value.name,
          open: value.open,
          close: value.close,
          type: this.type,
          otype: this.otype
        });        
      });
      this.setFilteredItems();
    });
  }

  editStore(name,open,close,type) {
    this.navCtrl.setRoot('EditStorePage',{
      name: name,
      open: open,
      close: close,
      type: type
    });
  }

  deleteStore(name,open,close,otype) {
    var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body = { 
        name: name,
        open: open,
        close: close,
        type: otype
      }
    this.http.delete('http://localhost:8080/delete_stores', new RequestOptions({
      headers: headers,
      body: body
    })).map(res => res.json()).subscribe(data => {
      this.navCtrl.setRoot('StoreManagePage');
    });
  }

  insertStore(){
    this.navCtrl.setRoot('RegisStorePage');
  }

  setFilteredItems() {
    this.tdata = this.filterItems(this.myInput);
  }

  
  filterItems(myInput){
    return this.jdata.filter((item) => {
         return item.name.toLowerCase().includes(myInput.toLowerCase());
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