import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarBetsComponent } from './sidebar-bets/sidebar-bets.component';



@NgModule({
  declarations: [
    SidebarComponent,
    SidebarBetsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    SidebarBetsComponent
  ]
})
export class SharedModule { }
