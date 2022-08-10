import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Summary, Liga, Eps, Event, LigaHomologada, HotCheck } from '../interface/results.interface';


@Injectable({
  providedIn: 'root'
})
export class BetsService {


 public ligas : LigaHomologada[] = [
    {
      nombrePublico: 'Argentina',
      nombreForApi: 'argentina/primera-division/'
   },
   {
     nombrePublico: 'Guatemala',
     nombreForApi: 'guatemala/liga-nacional-apertura/'
   },
   {
     nombrePublico: 'Bulgaria',
     nombreForApi: 'bulgaria/parva-liga/'
   },
   {
     nombrePublico: 'Belgica',
     nombreForApi: 'belgium/first-division-a/'
   },
   {
     nombrePublico: 'Qatar',
     nombreForApi: 'qatar/qatar-stars-league/'
   }
   ,
   {
     nombrePublico: 'España 21/22',
     nombreForApi: 'spain/laliga-santander-2021-2022/'
   },
   {
    nombrePublico: 'Colombia',
    nombreForApi: 'colombia/primera-a-clausura/'
  },
  {
   nombrePublico: 'Armenia',
   nombreForApi: 'armenia/premier-league/'
  }, 
  {
    nombrePublico: 'Mexico',
    nombreForApi: 'mexico/liga-mx-apertura/'
  },
  {
   nombrePublico: 'Portugal',
   nombreForApi: 'portugal/primeira-liga/'
  }, 
  {
    nombrePublico: 'Rumania',
    nombreForApi: 'romania/liga-1/'
  },
  {
   nombrePublico: 'Bolivia',
   nombreForApi: 'bolivia/primera-division-clausura/'
  }, 
  {
    nombrePublico: 'Chile',
    nombreForApi: 'chile/primera-division/'
  },
  {
   nombrePublico: 'Inglaterra',
   nombreForApi: 'england/premier-league/'
  }, 
  {
    nombrePublico: 'China',
    nombreForApi: 'china/super-league/'
  },
  {
    nombrePublico: 'Costa Rica',
    nombreForApi: 'costa-rica/primera-division-apertura/'
   }, 
   {
     nombrePublico: 'Dinamarca',
     nombreForApi: 'denmark/superliga/'
   },
   {
    nombrePublico: 'Ecuador',
    nombreForApi: 'ecuador/serie-a-2-stage/'
   }, 
   {
     nombrePublico: 'Egipto',
     nombreForApi: 'egypt/premier-league/'
   },
   {
    nombrePublico: 'El Salvador',
    nombreForApi: 'el-salvador/primera-division-apertura/'
   }, 
   {
     nombrePublico: 'India',
     nombreForApi: 'india/indian-super-league/'
   },
   {
    nombrePublico: 'Grecia',
    nombreForApi: 'greece/super-league/'
   }, 
   {
     nombrePublico: 'Honduras',
     nombreForApi: 'honduras/liga-nacional-apertura/'
   },
   {
    nombrePublico: 'Israel',
    nombreForApi: 'israel/premier-league/'
   }, 
   {
     nombrePublico: 'Jordania',
     nombreForApi: 'jordan/pro-league/'
   },
   {
    nombrePublico: 'Japon',
    nombreForApi: 'japan/j-league/'
   },
   {
    nombrePublico: 'Uzbekistan',
    nombreForApi: 'uzbekistan/superliga/'
   }  
];

//

  private servicioUrl: string = '/v1/api/app/stage/soccer/';

  public resultados: Summary[] = [];
  public proximos: Summary[] = [];

  public shortCount: number[] = [];

  public Eventos: Event[] = [];

  public ligaActual : string = "";
  public conteoActual : number = 0;

  public loading: boolean = false;

  public checkList: HotCheck[] = [];



  constructor(private http: HttpClient) {
  }

  buscarResultados(query: string = '') {

    const params = new HttpParams()
      .set('MD', '1');

    this.http.get<Liga>(`${this.servicioUrl}${query}-6`, { params })
      .subscribe((resp) => {
        this.Eventos = [];
        this.resultados = [];
        this.proximos = [];
        this.shortCount = [];

        if (resp.Stages.length > 0) {
          if (resp.Stages[0].Events) {

            this.Eventos = resp.Stages[0].Events;

            this.setProximosEventos([...this.Eventos]);
            this.setResultados(query);

          }
        }             
      });
  }

  public getEventosByLiga(liga:string) {

    const params = new HttpParams()
    .set('MD', '1');

    const url = `${this.servicioUrl}${liga}-6`;
    return  this.http.get<Liga>(url, { params });
    

 }

  setResultados(q: string){

    this.Eventos = this.Eventos.filter(e => (e.Eps == Eps.Ft));

    var conteo = 0;
    var shortSum = 0;
    this.Eventos.forEach((e) => {

      var itmEvent: Summary = this.getSummaryObj(e);
      shortSum = conteo;
      conteo = (itmEvent.TLGoals == itmEvent.TVGoals) ? 0 : conteo += 1;

      if(itmEvent.TLGoals == itmEvent.TVGoals){ this.shortCount.push(shortSum);}

      itmEvent.CurrentCount = conteo;

      this.resultados.push(itmEvent);

    });

    this.shortCount.push(conteo);

    this.resultados.reverse();
    this.shortCount.reverse();

    this.ligaActual = q;

    if(this.shortCount.length > 0){
      this.conteoActual = this.shortCount[0];
    }

    this.loading = false;


  }

  setProximosEventos(games:  Event[]) {

   var lst = games.filter(e => (e.Eps == Eps.NS));

   lst.forEach((e) => {

    var itmEvent: Summary = this.getSummaryObj(e);

    this.proximos.push(itmEvent);

  });


  }

  getSummaryObj(e: Event): Summary {

    var itmEvent: Summary = {
      TLName: e.T1[0].Nm, // Team Local Name
      TVName: e.T2[0].Nm, // Team Visit Name
      TLGoals: Number(e.Tr1OR), // Team Local Goals
      TVGoals: Number(e.Tr2OR), // Team Visit Goals
      CurrentCount: -1, // Partidos sin empate hasta nuevo empate
      Date: new Date(this.getDateFormat(e.Esd.toString()))
    }

    return itmEvent;
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