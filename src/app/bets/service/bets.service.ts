import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage, Summary, Liga, Eps, Event } from '../interface/results.interface';


@Injectable({
  providedIn: 'root'
})
export class BetsService {


  private servicioUrl: string = '/v1/api/app/stage/soccer/';

  public resultados: Summary[] = [];

  public shortCount: number[] = [];

  public Eventos: Event[] = [];

  public ligaActual : string = "";
  public conteoActual : number = 0;

  constructor(private http: HttpClient) {

  }

  buscarResultados(query: string = '') {


    const params = new HttpParams()
      .set('MD', '1');

    this.http.get<Liga>(`${this.servicioUrl}${query}-6`, { params })
      .subscribe((resp) => {
        this.Eventos = [];
        this.resultados = [];
        this.shortCount = [];

        if (resp.Stages.length > 0) {
          if (resp.Stages[0].Events) {
            this.Eventos = resp.Stages[0].Events;

            this.Eventos = this.Eventos.filter(e => (e.Tr2OR != undefined));
            this.Eventos = this.Eventos.filter(e => (e.Eps == Eps.Ft));

            var conteo = 0;
            var shortSum = 0;
            this.Eventos.forEach((e) => {

              var itmEvent: Summary = {
                TLName: e.T1[0].Nm, // Team Local Name
                TVName: e.T2[0].Nm, // Team Visit Name
                TLGoals: Number(e.Tr1OR), // Team Visit Goals
                TVGoals: Number(e.Tr2OR), // Team Visit Goals
                CurrentCount: -1, // Partidos sin empate hasta nuevo empate
                Date: new Date(this.getDateFormat(e.Esd.toString()))
              }

              shortSum = conteo;
              conteo = (itmEvent.TLGoals == itmEvent.TVGoals) ? 0 : conteo += 1;

              if(itmEvent.TLGoals == itmEvent.TVGoals){ this.shortCount.push(shortSum);}

              itmEvent.CurrentCount = conteo;

              this.resultados.push(itmEvent);

            });

            this.shortCount.push(conteo);

            this.resultados.reverse();
            this.shortCount.reverse();

            this.ligaActual = query;

            if(this.shortCount.length > 0){
              this.conteoActual = this.shortCount[0];
            }
            

          }
        }
        //  localStorage.setItem('resultados', JSON.stringify( this.resultados ));               
      })
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

}