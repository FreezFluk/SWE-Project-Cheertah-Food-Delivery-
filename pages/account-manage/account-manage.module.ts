import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountManagePage } from './account-manage';

@NgModule({
  declarations: [
    AccountManagePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountManagePage),
  ],
})
export class AccountManagePageModule {}
