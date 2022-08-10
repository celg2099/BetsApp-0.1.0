import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsPageComponent } from './bets-page/bets-page.component';
import { MarcadoresComponent } from './marcadores/marcadores.component';
import { NextGamesComponent } from './next-games/next-games.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    BetsPageComponent,
    MarcadoresComponent,
    NextGamesComponent
  ],
  exports: [
    BetsPageComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]})
export class BetsModule { }
