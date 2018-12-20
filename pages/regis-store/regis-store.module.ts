import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisStorePage } from './regis-store';

@NgModule({
  declarations: [
    RegisStorePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisStorePage),
  ],
})
export class RegisStorePageModule {}
