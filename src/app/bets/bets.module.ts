import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsPageComponent } from './bets-page/bets-page.component';
import { MarcadoresComponent } from './marcadores/marcadores.component';
import { NextGamesComponent } from './next-games/next-games.component';
import { SharedModule } from '../shared/shared.module';
import { HotListComponent } from './hot-list/hot-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HotListItemComponent } from './hot-list-item/hot-list-item.component';


@NgModule({
  declarations: [
    BetsPageComponent,
    MarcadoresComponent,
    NextGamesComponent,
    HotListComponent,
    HotListItemComponent
  ],
  exports: [
    BetsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule
  ]})
export class BetsModule { }
