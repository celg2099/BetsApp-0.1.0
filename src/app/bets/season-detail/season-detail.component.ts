import { Component, OnInit } from '@angular/core';
import { BetsService } from '../service/bets.service';
import { Detail } from '../interface/detail.interface';
import { Summary, Liga, Eps, Event, LigaHomologada, HotCheck } from '../interface/results.interface';
import { of, concatMap } from 'rxjs';
import { ListStatics } from '../interface/results.interface';


@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html'
})
export class SeasonDetailComponent  {

  datos: string = "";
  conteoActualHt: number = 0;
  hideSumary: number = 0;

  get seasonDetail() {
    return this.betService.proximos;
  }

  shoHTScore( ) {
    this.hideSumary = 0;
    this.betService.resultadosDetail = [];
    this.betService.shortCountHt = [];
    var conteo = 0;
    var shortSum = 0;
    var iteracionNo = 0;
    this.betService.totDrawHt = 0;
    this.betService.resultados.forEach((e) => {

      var strGetByGame = e.TLName.toLocaleLowerCase().replace(' ','-') + '-vrs-' + e.TVName.toLocaleLowerCase().replace(' ','-') + '/'+ e.Eid + '/stats/';
      var url = this.betService.currEvent + strGetByGame;

       this.betService.getDetailGame(url).subscribe({
        next: (data) => {
          iteracionNo += 1;
          var detalle = this.getDetalleGame(data);
          var detallGame: Summary = e;

          if (detalle){
             detallGame.TLHtGoals = detalle.scoresByPeriod[0].home.score;
             detallGame.TVHtGoals = detalle.scoresByPeriod[0].away.score;
          }
          this.betService.resultadosDetail.push(detallGame);
        },
        error: (error) => {
          console.error('Error al obtener HTML:', error);
        },
        complete: () => {

          if (iteracionNo == this.betService.resultados.length){
            this.sortTable();
            this.betService.resultadosDetail.forEach((f) => {
              shortSum = conteo;
              conteo = (f.TLHtGoals == f.TVHtGoals) ? 0 : conteo += 1;
              if (f.TLHtGoals == f.TVHtGoals) { this.betService.shortCountHt.push(shortSum); this.betService.totDrawHt += 1; }
            });
            this.betService.shortCountHt.push(conteo);
          }

          if (this.betService.shortCountHt.length > 0) {
            this.conteoActualHt = this.betService.shortCountHt[0];
          }
          this.hideSumary = 1;
        }
       });
     });
   //  this.betService.shortCountHt.push(conteo);
 }

  getDetalleGame(htlm: string): Detail | null {

    var inicioString = htlm.indexOf('scoresByPeriod');
    var finString = htlm.indexOf('aggregateHomeScore');

    var detalle: Detail;

    if (inicioString > 0){
       var textoExtraido: string = "{"+htlm.substring(inicioString-1, finString-2)+"}";
       detalle = JSON.parse(textoExtraido);
       return detalle;
    }
    else {
      console.log('No data detected.')
      return null;
    }
};

get currentCount() {
  return this.betService.conteoActual;
}

sortTable() {
  this.betService.resultadosDetail.sort((a, b) => b.Date.getTime() - a.Date.getTime());
}

get resultados() {
  return this.betService.resultadosDetail;
}

get shortResultHt() {
  return this.betService.shortCountHt;
}

get maxCountHt() {
  var a = -1;

  if(this.betService.shortCountHt.length > 0){
     a = Math.max(...this.betService.shortCountHt.map(o => o));
  }
  return a;

}

  get getModa() {
    var a = -1;
    var b = -1;
    var aux : ListStatics[] = [];

    this.betService.shortCountHt.forEach( ( itm, idx) => {

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

get juegosFinalizadosHt() {
  return this.betService.resultados;
}

constructor(private betService : BetsService) {
}

}
