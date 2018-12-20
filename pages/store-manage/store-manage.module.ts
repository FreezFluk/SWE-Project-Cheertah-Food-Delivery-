import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreManagePage } from './store-manage';

@NgModule({
  declarations: [
    StoreManagePage,
  ],
  imports: [
    IonicPageModule.forChild(StoreManagePage),
  ],
})
export class StoreManagePageModule {}
