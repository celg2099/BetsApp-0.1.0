import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarBetsComponent } from './sidebar-bets/sidebar-bets.component';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    SidebarComponent,
    SidebarBetsComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    SidebarComponent,
    SidebarBetsComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
