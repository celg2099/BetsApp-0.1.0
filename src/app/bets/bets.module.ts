import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsPageComponent } from './bets-page/bets-page.component';
import { MarcadoresComponent } from './marcadores/marcadores.component';



@NgModule({
  declarations: [
    BetsPageComponent,
    MarcadoresComponent
  ],
  exports: [
    BetsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BetsModule { }
