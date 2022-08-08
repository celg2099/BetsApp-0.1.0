import { Component, OnInit } from '@angular/core';
import { BetsService } from '../service/bets.service';

@Component({
  selector: 'app-bets-page',
  templateUrl: './bets-page.component.html'
})
export class BetsPageComponent  {

  get currentLegue() {
    return this.betService.ligaActual;
  }

  get currentCount() {
    return this.betService.conteoActual;
  }

  get shortResult() {

    var a = -1;

    if(this.betService.shortCount.length > 0){
       a = Math.max(...this.betService.shortCount.map(o => o));
    }
    return a;
  }




  constructor(private betService : BetsService) {

  }  


}
