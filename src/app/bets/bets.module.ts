import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BetsPageComponent } from './bets-page/bets-page.component';
import { MarcadoresComponent } from './marcadores/marcadores.component';
import { NextGamesComponent } from './next-games/next-games.component';
import { SharedModule } from '../shared/shared.module';
import { HotListComponent } from './hot-list/hot-list.component';
import { HotListItemComponent } from './hot-list-item/hot-list-item.component';



@NgModule({
  declarations: [
    BetsPageComponent,
    MarcadoresComponent,
    NextGamesComponent,
    HotListComponent,
    HotListItemComponent,
  ],
  exports: [
    BetsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]})
export class BetsModule { }
