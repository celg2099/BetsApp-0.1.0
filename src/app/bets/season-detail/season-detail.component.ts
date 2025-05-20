import { Component, OnInit } from '@angular/core';
import { BetsService } from '../service/bets.service';
import { Detail } from '../interface/detail.interface';
import { Summary, Liga, Eps, Event, LigaHomologada, HotCheck } from '../interface/results.interface';
import { of, concatMap } from 'rxjs';


@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html'
})
export class SeasonDetailComponent  {

  datos: string = "";

  get seasonDetail() {
    return this.betService.proximos;
  }

  shoHTScore2( ) {

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
        }
       });
     });






   //  this.betService.shortCountHt.push(conteo);
 }


  shoHTScore( ) {

    console.log("Evento actual: "+this.betService.currEvent);
    this.betService.resultadosDetail = [];
    this.betService.shortCountHt = [];
    var conteo = 0;
    var shortSum = 0;
    this.betService.totDrawHt = 0;

    of(...this.betService.resultados).pipe(
        concatMap(e => this.betService.getDetailGame2(e) )
      ).subscribe( {
                    next: data => {
                          var detalle = this.getDetalleGame(data);

                          var detallGame: Summary = this.betService.currentDetallGame;

                          if (detalle){
                              detallGame.TLHtGoals = detalle.scoresByPeriod[0].home.score;
                              detallGame.TVHtGoals = detalle.scoresByPeriod[0].away.score;

                              shortSum = conteo;
                              conteo = (detallGame.TLHtGoals == detallGame.TVHtGoals) ? 0 : conteo += 1;
                              if (detallGame.TLHtGoals == detallGame.TVHtGoals) { this.betService.shortCountHt.push(shortSum); this.betService.totDrawHt += 1; }
                          }
                          console.log("Esto devuelve: ", detallGame);
                          this.betService.resultadosDetail.push(detallGame);
                     },
                    error: err => console.error('Error al obtener HTML:', err),
                    complete: () => this.betService.shortCountHt.push(conteo)
    })
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

sortTable() {
  this.betService.resultadosDetail.sort((a, b) => b.Date.getTime() - a.Date.getTime());
}

get resultados() {
  return this.betService.resultadosDetail;
}

get shortResultHt() {
  return this.betService.shortCountHt;
}

constructor(private betService : BetsService) {
}

}
