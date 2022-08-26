import { Component } from '@angular/core';

import { BetsService } from '../service/bets.service';
import { ListStatics } from '../interface/results.interface';

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

  get nextGame() {
    return (this.betService.proximos.length > 0) ? this.betService.proximos[0].Date : '';
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

  get getModa() {
    var a = -1;
    var b = -1;
    var aux : ListStatics[] = [];
    
    this.betService.shortCount.forEach( ( itm, idx) => {

      const found = aux.some(el => el.valor === itm);

      if (!found) { aux.push({ valor: itm, info: 1 }); } 
      else {                           
               aux.forEach( (e,i) => {  if(e.valor == itm){  aux[i].info = aux[i].info + 1 } })
      }         
    });

     a = Math.max(...aux.map(o => o.info));

     if(a > -1){
          aux.forEach( e => { if( e.info == a){ b = e.valor}      })
     }
    
    return b;
    
  }


  constructor(private betService : BetsService) {

  }  


}
