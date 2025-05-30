import { Component } from '@angular/core';
import { BetsService } from '../service/bets.service';
//import { Eps, HotCheck, LigaHomologada, Liga, Event } from '../interface/results.interface';
import { isNgTemplate } from '@angular/compiler';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Summary, Liga, Eps, Event, HotCheck, LigaHomologada } from '../interface/results.interface';
import { Detail, ScoresByPeriod, Away } from '../interface/detail.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-hot-list-ht',
  templateUrl: './hot-list-ht.component.html'
})
export class HotListComponentHt {

  public hl: HotCheck[] = [];

  constructor(private betService: BetsService, private http: HttpClient) { }


  async generarLista() {

    this.hl = [];

    var ligasOrdenadasByName = [...this.betService.ligas].slice(0, 2);
    ligasOrdenadasByName = ligasOrdenadasByName.filter(itm => itm.historico != 0);

    ligasOrdenadasByName = ligasOrdenadasByName.sort((a, b) => (a.nombrePublico > b.nombrePublico) ? 1 : ((b.nombrePublico > a.nombrePublico) ? -1 : 0));

      console.log(ligasOrdenadasByName);
  for (let i = 0; i < ligasOrdenadasByName.length; i++) {

     try {
         var e = ligasOrdenadasByName[i];
         var resp = await firstValueFrom(this.betService.getEventosByLiga2(e.nombreForApi));
          console.log('e:',e);
           if (resp.Stages.length > 0) {

             var listDetalle: ScoresByPeriod[] = [];

             if (resp.Stages[0].Events) {

               console.log(e.nombreForApi);

               var iteracionNo = 0;
               var lenghStages = resp.Stages[0].Events.length;

               console.log('length: ',resp.Stages[0].Events.length);
               this.fillList(resp.Stages[0].Events, e.nombreForApi);

             }


           }


        
      }
      catch (error) {
        console.error(`Error al obtener el ID`, error);
      }

  }

 }


  async fillList(eventos: Event[], nombreForApi: string) {

    var listDetalle: ScoresByPeriod[] = [];

    var lstEventos = eventos.filter(e => (e.Eps == Eps.Ft));

    for (let j = 0; j <= lstEventos.length; j++) {

      var g = lstEventos[j];

      var strGetByGame = g.T1[0].Nm.toLocaleLowerCase().replace(' ', '-') + '-vrs-' + g.T2[0].Nm.toLocaleLowerCase().replace(' ', '-') + '/' + g.Eid + '/stats/';
      var url = nombreForApi + strGetByGame;

      this.betService.totDrawHt = 0;

      var data = await firstValueFrom(this.betService.getDetailGame(url));

      var detalle = this.getDetalleGame(data);
      if (detalle != null) {

        if (detalle.scoresByPeriod[0].home.score != undefined) {
          var homeScore: Away = { score: detalle.scoresByPeriod[0].home.score }
          var awayScore: Away = { score: detalle.scoresByPeriod[0].away.score }

          var x: ScoresByPeriod = {

            label: "",
            home: homeScore,
            away: awayScore,
            shouldDisplayFirst: false
          };
          listDetalle.push(x);
        }
      }

      if (j == (lstEventos.length-1)){
           console.log('aqui finaliza',listDetalle);

                        var conteo = 0;
                        var shortSum = 0;
                        var mxConteo = 0;
                        var totDraw = 0;
                        var lstCont: number[] = [];

                        listDetalle.forEach((itm) => {

                          shortSum = conteo;
                          conteo = (itm.home.score == itm.away.score) ? 0 : conteo += 1;

                          if (itm.home.score == itm.away.score) { lstCont.push(shortSum); totDraw += 1; }

                        });

                        if (lstCont.length > 0) { mxConteo = Math.max(...lstCont.map(o => o)); };

                        var itmEvent: HotCheck = {
                          pais: nombreForApi,
                          liga: nombreForApi,
                          conteoActual: conteo,
                          maxConteo: mxConteo,
                          totDraw: totDraw,
                          gamesFinished: listDetalle.length,
                          lstConteo: [...lstCont],
                          percentDraw: (listDetalle.length > 0) ? (totDraw / listDetalle.length) * 100 : 0,
                          dateNextGame: ""
                        }
                        console.log(itmEvent);

                        this.hl.push(itmEvent);


      }
     
    }



  }

  sortList() {
    this.betService.resultadosDetail.sort((a, b) => b.Date.getTime() - a.Date.getTime());
  }


  getDetalleGame(htlm: string): Detail | null {

    var inicioString = htlm.indexOf('scoresByPeriod');
    var finString = htlm.indexOf('aggregateHomeScore');

    var detalle: Detail;

    if (inicioString > 0) {
      var textoExtraido: string = "{" + htlm.substring(inicioString - 1, finString - 2) + "}";
      detalle = JSON.parse(textoExtraido);
      return detalle;
    }
    else {
      console.log('No data detected.')
      return null;
    }
  };

  getDateFormat(dateStr: string): string {

    var year = dateStr.toString().substring(0, 4);
    var month = dateStr.toString().substring(4, 6);
    var day = dateStr.toString().substring(6, 8);
    var hour = dateStr.toString().substring(8, 10);
    var min = dateStr.toString().substring(10, 12);
    var seg = dateStr.toString().substring(12, 14);

    return day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + seg;

  }

  getDateMinusHour(dateStr: string): string {
    var x = new Date(this.getDateFormat(dateStr));
    var y = new Date(x.getTime() - 6 * 60 * 60 * 1000);
    console.log(y.toString());

    return y.getDate().toString().padStart(2, '0') + '/' + (y.getMonth() + 1).toString().padStart(2, '0') + '/' + y.getFullYear().toString() + ' ' + y.getHours().toString().padStart(2, '0') + ':' + y.getMinutes().toString().padStart(2, '0') + ':' + y.getSeconds().toString().padStart(2, '0');

  }

  getLiga(strComplete: string): string {

    var dashPosition = strComplete.indexOf('/');
    return strComplete.substring(dashPosition + 1, strComplete.length - 1);
  }

  setInfoLeague(evento: HotCheck) {

    console.log(evento);
    this.betService.loading = true;
    this.betService.buscarResultados(evento.liga);

  }



  sortTable(column: number) {

    switch (column) {
      case 1: { this.hl.sort((a, b) => (a.liga > b.liga) ? 1 : ((b.liga > a.liga) ? -1 : 0)); break }
      case 2: { this.hl.sort((a, b) => (b.conteoActual > a.conteoActual) ? 1 : ((a.conteoActual > b.conteoActual) ? -1 : 0)); break }
      case 3: { this.hl.sort((a, b) => (b.maxConteo > a.maxConteo) ? 1 : ((a.maxConteo > b.maxConteo) ? -1 : 0)); break }
      case 4: { this.hl.sort((a, b) => (b.gamesFinished > a.gamesFinished) ? 1 : ((a.gamesFinished > b.gamesFinished) ? -1 : 0)); break }
      case 5: { this.hl.sort((a, b) => (b.totDraw > a.totDraw) ? 1 : ((a.totDraw > b.totDraw) ? -1 : 0)); break }
      case 6: { this.hl.sort((a, b) => (a.percentDraw > b.percentDraw) ? 1 : ((b.percentDraw > a.percentDraw) ? -1 : 0)); break }
      //  case 7: {  this.hl.sort((a,b) => (a.dateNextGame > b.dateNextGame) ? 1 : ((b.dateNextGame > a.dateNextGame) ? -1 : 0)); break}
      case 7: { this.hl.sort((a, b) => this.compareDateString(a.dateNextGame, b.dateNextGame) ? 1 : ((this.compareDateString(b.dateNextGame, a.dateNextGame)) ? -1 : 0)); break }
      default:
        this.hl.sort((a, b) => (a.liga > b.liga) ? 1 : ((b.liga > a.liga) ? -1 : 0));
    }
  }


  compareDateString(str1: string, str2: string): boolean {

    var a = this.getDateFromString(str1);
    var b = this.getDateFromString(str2);

    var date1 = new Date(a);
    var date2 = new Date(b);

    return date1 > date2;

  }

  getDateFromString(str1: string): Date {
    var dia = str1.substring(0, 2);
    var mes = str1.substring(3, 5);
    var year = str1.substring(6, 10);
    var hour = str1.substring(11, 13);
    var minute = str1.substring(14, 16);
    var seconds = str1.substring(17);

    return new Date(Number(year), Number(mes) - 1, Number(dia), Number(hour), Number(minute), Number(seconds));

  }


}
