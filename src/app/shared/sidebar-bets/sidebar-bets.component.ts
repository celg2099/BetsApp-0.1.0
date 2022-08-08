import { Component, OnInit } from '@angular/core';
import { LigaHomologada } from 'src/app/bets/interface/results.interface';
import { BetsService } from '../../bets/service/bets.service';

@Component({
  selector: 'app-sidebar-bets',
  templateUrl: './sidebar-bets.component.html'
})
export class SidebarBetsComponent {


   ligas : LigaHomologada[] = [
    {
      nombrePublico: 'Argentina',
      nombreForApi: 'argentina/primera-division/'
   },
   {
     nombrePublico: 'Guatemala',
     nombreForApi: 'guatemala/liga-nacional-apertura/'
   },
   {
     nombrePublico: 'Bulgaria',
     nombreForApi: 'bulgaria/parva-liga/'
   },
   {
     nombrePublico: 'Belgica',
     nombreForApi: 'belgium/first-division-a/'
   },
   {
     nombrePublico: 'Qatar',
     nombreForApi: 'qatar/qatar-stars-league/'
   }
];

// qatar/qatar-stars-league

   constructor( private betsService : BetsService) { }


   buscar( liga: string ) {
     
       this.betsService.buscarResultados(liga);
   }

}
