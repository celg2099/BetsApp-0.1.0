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
              var lstCont : number[] =  [];

              var lstEventos = resp.Stages[0].Events;
              lstEventos = lstEventos.filter(e => (e.Eps == Eps.Ft));

    
              lstEventos.forEach((itm) => {

                shortSum = conteo;
                conteo = (Number(itm.Tr1OR) == Number(itm.Tr2OR)) ? 0 : conteo += 1;
          
                if(Number(itm.Tr1OR) == Number(itm.Tr2OR)){ lstCont.push(shortSum);}
          
              });

              lstCont.push(conteo);
              if(lstCont.length > 0 ){  mxConteo = Math.max(...lstCont.map(o => o)); };

              var itmEvent: HotCheck = {
                pais: e.nombrePublico,
                liga: e.nombreForApi,
                conteoActual: conteo,
                maxConteo: mxConteo,
                lstConteo: [...lstCont]
              }

              this.hl.push(itmEvent);
  
            }
          } 


        }
      );

     });

  
  }

}
