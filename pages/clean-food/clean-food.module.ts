import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CleanFoodPage } from './clean-food';

@NgModule({
  declarations: [
    CleanFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(CleanFoodPage),
  ],
})
export class CleanFoodPageModule {}
