import { Component, OnInit } from '@angular/core';
import { BetsService } from '../service/bets.service';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html'
})
export class SeasonDetailComponent  {

  get seasonDetail() {
    return this.betService.proximos;
  }

  shoHTScore( ) {

    console.log("Evento actual: "+this.betService.currEvent);

     this.betService.resultados.forEach((e) => {

       var strGetByGame = e.TLName.toLocaleLowerCase().replace(' ','-') + '-vrs-' + e.TVName.toLocaleLowerCase().replace(' ','-') + '/'+ e.Eid + '/stats/';
       var url = this.betService.currEvent + strGetByGame;
       this.betService.buscarDetalleGame(url);
  
     });


  }

  constructor(private betService : BetsService) {

  }

}
