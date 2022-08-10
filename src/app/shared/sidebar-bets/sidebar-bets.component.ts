import { Component, OnInit } from '@angular/core';
import { LigaHomologada } from 'src/app/bets/interface/results.interface';
import { BetsService } from '../../bets/service/bets.service';

@Component({
  selector: 'app-sidebar-bets',
  templateUrl: './sidebar-bets.component.html'
})
export class SidebarBetsComponent {


  get ligasApp() {
    this.betsService.ligas.sort((a,b) => (a.nombrePublico > b.nombrePublico) ? 1 : ((b.nombrePublico > a.nombrePublico) ? -1 : 0));
    return this.betsService.ligas;
  }

   constructor( private betsService : BetsService) { }


   buscar( liga: string ) {
       this.betsService.loading = true;
       this.betsService.buscarResultados(liga);
   }

}
