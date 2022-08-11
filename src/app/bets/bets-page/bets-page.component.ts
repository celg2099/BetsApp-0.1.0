import { Component } from '@angular/core';

import { BetsService } from '../service/bets.service';

@Component({
  selector: 'app-bets-page',
  templateUrl: './bets-page.component.html'
})
export class BetsPageComponent  {

  get loading(){
    return this.betService.loading;
  }

  get currentLegue() {
    return this.betService.ligaActual;
  }

  get juegosFinalizados() {
    return this.betService.resultados;
  }

  get juegosProximos() {
    return this.betService.proximos;
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
