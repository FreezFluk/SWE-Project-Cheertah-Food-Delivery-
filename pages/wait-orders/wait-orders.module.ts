import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitOrdersPage } from './wait-orders';

@NgModule({
  declarations: [
    WaitOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitOrdersPage),
  ],
})
export class WaitOrdersPageModule {}
