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

  get getTotDrawsPercent(){
       if(this.betService.totDraw > 0 && this.betService.resultados.length > 0){
             return (this.betService.totDraw/this.betService.resultados.length)*100;
       }
       else {
        return 0;
       }
  }

  getLiga( strComplete: string): string {

    var dashPosition = strComplete.indexOf('/');
    return strComplete.substring(dashPosition+1, strComplete.length-1);
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
