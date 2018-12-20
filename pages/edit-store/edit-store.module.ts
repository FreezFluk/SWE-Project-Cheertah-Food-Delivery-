import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditStorePage } from './edit-store';

@NgModule({
  declarations: [
    EditStorePage,
  ],
  imports: [
    IonicPageModule.forChild(EditStorePage),
  ],
})
export class EditStorePageModule {}
