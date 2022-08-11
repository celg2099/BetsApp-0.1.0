import { Component } from '@angular/core';
import { BetsService } from '../service/bets.service';
import { Eps, HotCheck, LigaHomologada } from '../interface/results.interface';

@Component({
  selector: 'app-hot-list',
  templateUrl: './hot-list.component.html'
})
export class HotListComponent{

  public hl : HotCheck[] = [];

  constructor(private betService : BetsService) { }


  generarLista() {

    this.hl = [];

    var ligasOrdenadasByName =  this.betService.ligas;
    ligasOrdenadasByName =  ligasOrdenadasByName.sort((a,b) => (a.nombrePublico > b.nombrePublico) ? 1 : ((b.nombrePublico > a.nombrePublico) ? -1 : 0));


    ligasOrdenadasByName.forEach( e => {

      this.betService.getEventosByLiga(e.nombreForApi).subscribe(
        resp => {

          if (resp.Stages.length > 0) {
            if (resp.Stages[0].Events) {
              var conteo = 0;
              var shortSum = 0;
              var mxConteo = 0;
              var totDraw = 0;
              var lstCont : number[] =  [];

              var lstEventos = resp.Stages[0].Events;

              var lstNextGames = [...lstEventos];
              lstNextGames = lstNextGames.filter(e => (e.Eps == Eps.NS));

              lstEventos = lstEventos.filter(e => (e.Eps == Eps.Ft));

              lstEventos.forEach((itm) => {

                shortSum = conteo;
                conteo = (Number(itm.Tr1OR) == Number(itm.Tr2OR)) ? 0 : conteo += 1;
          
                if(Number(itm.Tr1OR) == Number(itm.Tr2OR)){ lstCont.push(shortSum); totDraw += 1; }
          
              });

              lstCont.push(conteo);
              if(lstCont.length > 0 ){  mxConteo = Math.max(...lstCont.map(o => o)); };

              

              

              var itmEvent: HotCheck = {
                pais: e.nombrePublico,
                liga: e.nombreForApi,
                conteoActual: conteo,
                maxConteo: mxConteo,
                totDraw: totDraw,
                gamesFinished: lstEventos.length,
                lstConteo: [...lstCont],
                dateNextGame: (lstNextGames.length > 0) ? this.getDateFormat(lstNextGames[0].Esd.toString()) : ""
              }

              this.hl.push(itmEvent);
  
            }
          } 


        }
      );

     });
  }


  getDateFormat(dateStr: string): string {

    var year = dateStr.toString().substring(0, 4);
    var month = dateStr.toString().substring(4, 6);
    var day = dateStr.toString().substring(6, 8);
    var hour = dateStr.toString().substring(8, 10);
    var min = dateStr.toString().substring(10, 12);
    var seg = dateStr.toString().substring(12, 14);

    return day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + seg;

  }

}
