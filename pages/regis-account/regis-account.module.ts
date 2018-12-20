import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisAccountPage } from './regis-account';

@NgModule({
  declarations: [
    RegisAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisAccountPage),
  ],
})
export class RegisAccountPageModule {}
