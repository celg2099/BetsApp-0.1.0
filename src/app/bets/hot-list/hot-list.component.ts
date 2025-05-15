import { Component } from '@angular/core';
import { BetsService } from '../service/bets.service';
import { Eps, HotCheck, LigaHomologada, Liga } from '../interface/results.interface';
import { isNgTemplate } from '@angular/compiler';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-hot-list',
  templateUrl: './hot-list.component.html'
})
export class HotListComponent{

  public hl : HotCheck[] = [];

  constructor(private betService : BetsService, private http: HttpClient) { }


  generarLista() {

    this.hl = [];

    var ligasOrdenadasByName =  [...this.betService.ligas];
    ligasOrdenadasByName = ligasOrdenadasByName.filter( itm => itm.historico != 0);

    ligasOrdenadasByName =  ligasOrdenadasByName.sort((a,b) => (a.nombrePublico > b.nombrePublico) ? 1 : ((b.nombrePublico > a.nombrePublico) ? -1 : 0));


    var url = '/en/football/';

    ligasOrdenadasByName.forEach( e => {

      var urlArmed = url + e.nombreForApi + '/results/'    
      this.http.get(urlArmed, {  responseType: 'text' }).subscribe(
        resp => {

        var inicioString = resp.indexOf('"initialStageData"');
        var finString = resp.indexOf('],"stage":{');

        var textoExtraido: string = resp.substring(inicioString+19, finString+1)+"}";

        textoExtraido = textoExtraido.replace('stages','Stages');

        const liga: Liga = JSON.parse(textoExtraido);

          if (liga.Stages.length > 0) {
            if (liga.Stages[0].Events) {
              var conteo = 0;
              var shortSum = 0;
              var mxConteo = 0;
              var totDraw = 0;
              var lstCont : number[] =  [];

              var lstEventos = liga.Stages[0].Events;

              var lstNextGames = [...lstEventos];

              lstNextGames = lstNextGames.filter(e => (e.Eps == Eps.NS));

              lstEventos = lstEventos.filter(e => (e.Eps == Eps.Ft));

              lstEventos.forEach((itm) => {

                shortSum = conteo;
                conteo = (Number(itm.Tr1) == Number(itm.Tr2)) ? 0 : conteo += 1;
          
                if(Number(itm.Tr1) == Number(itm.Tr2)){ lstCont.push(shortSum); totDraw += 1; }
          
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
                percentDraw: (lstEventos.length > 0) ? (totDraw/lstEventos.length)*100 : 0,
                dateNextGame: (lstNextGames.length > 0) ? this.getDateMinusHour(lstNextGames[0].Esd.toString()) : ""
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

    return month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + seg;

  }

  getDateMinusHour(dateStr: string): string {
    var x = new Date(this.getDateFormat(dateStr));
    var y = new Date(x.getTime() - 6 * 60 * 60 * 1000);
    console.log(y.toString());

   return y.getDate().toString().padStart(2,'0') + '/' + (y.getMonth() + 1).toString().padStart(2,'0') + '/' + y.getFullYear().toString() + ' ' + y.getHours().toString().padStart(2,'0') + ':' + y.getMinutes().toString().padStart(2,'0') + ':' + y.getSeconds().toString().padStart(2,'0');

  }

  getLiga( strComplete: string): string {

    var dashPosition = strComplete.indexOf('/');
    return strComplete.substring(dashPosition+1, strComplete.length-1);
  }

  setInfoLeague( evento: HotCheck){

    console.log(evento);
    this.betService.loading = true;
    this.betService.buscarResultados(evento.liga);

  }



  sortTable(column: number) {
    
    switch (column)
    {
       case 1: {  this.hl.sort((a,b) => (a.liga > b.liga) ? 1 : ((b.liga > a.liga) ? -1 : 0)); break}
       case 2: {  this.hl.sort((a,b) => (b.conteoActual > a.conteoActual) ? 1 : ((a.conteoActual > b.conteoActual) ? -1 : 0)); break}
       case 3: {  this.hl.sort((a,b) => (b.maxConteo > a.maxConteo) ? 1 : ((a.maxConteo > b.maxConteo) ? -1 : 0)); break}
       case 4: {  this.hl.sort((a,b) => (b.gamesFinished > a.gamesFinished) ? 1 : ((a.gamesFinished > b.gamesFinished) ? -1 : 0)); break}
       case 5: {  this.hl.sort((a,b) => (b.totDraw > a.totDraw) ? 1 : ((a.totDraw > b.totDraw) ? -1 : 0)); break}
       case 6: {  this.hl.sort((a,b) => (a.percentDraw > b.percentDraw) ? 1 : ((b.percentDraw > a.percentDraw) ? -1 : 0)); break}
      //  case 7: {  this.hl.sort((a,b) => (a.dateNextGame > b.dateNextGame) ? 1 : ((b.dateNextGame > a.dateNextGame) ? -1 : 0)); break}
      case 7: {  this.hl.sort((a,b) => this.compareDateString(a.dateNextGame, b.dateNextGame) ? 1 : ((this.compareDateString(b.dateNextGame, a.dateNextGame)) ? -1 : 0)); break}
       default: 
       this.hl.sort((a,b) => (a.liga > b.liga) ? 1 : ((b.liga > a.liga) ? -1 : 0));
    }       
  }


   compareDateString( str1: string, str2: string):boolean {
     
        var a = this.getDateFromString(str1);
        var b = this.getDateFromString(str2);

       var date1 = new Date(a);
       var date2 = new Date(b);

       return date1 > date2;
     
   }

   getDateFromString( str1: string ): Date {
    var dia = str1.substring(0,2);
    var mes = str1.substring(3,5);
    var year = str1.substring(6,10);
    var hour = str1.substring(11,13);
    var minute = str1.substring(14,16);
    var seconds = str1.substring(17);

    return new Date(Number(year),Number(mes)-1,Number(dia), Number(hour), Number(minute), Number(seconds));

   }


}
