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
     nombreForApi: 'spain/laliga-santander-2021-2022/',
     historico: 1
   },
   {
     nombrePublico: 'España',
     nombreForApi: 'spain/laliga-santander/'
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
    nombrePublico: 'Dinamarca - 1 Div',
    nombreForApi: 'denmark/1-division/'
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
   }, 
   {
     nombrePublico: 'Italia',
     nombreForApi: 'italy/serie-a/'
   },
   {
    nombrePublico: 'Alemania',
    nombreForApi: 'germany/bundesliga/'
   }, 
   {
     nombrePublico: 'Francia',
     nombreForApi: 'france/ligue-1/'
   },
   {
    nombrePublico: 'Holanda',
    nombreForApi: 'holland/eredivisie/'
   }, 
   {
     nombrePublico: 'Escocia',
     nombreForApi: 'scotland/scotland-premiership/'
   },
   {
    nombrePublico: 'Austria',
    nombreForApi: 'austria/bundesliga/'
   }, 
   {
     nombrePublico: 'Croacia',
     nombreForApi: 'croatia/1st-league/'
   },
   {
    nombrePublico: 'Rep. Checa',
    nombreForApi: 'czech-republic/1st-league/'
   },
   {
    nombrePublico: 'Brasil',
    nombreForApi: 'brazil/serie-a/'
   },
   {
    nombrePublico: 'Estonia',
    nombreForApi: 'estonia/meistriliiga/'
   }, 
   {
     nombrePublico: 'Islas Faroe',
     nombreForApi: 'faroe-islands/premier-league/'
   },
   {
    nombrePublico: 'Hungria',
    nombreForApi: 'hungary/nb-i/'
   },
   {
    nombrePublico: 'Islandia',
    nombreForApi: 'iceland/urvalsdeild/'
   },
   {
    nombrePublico: 'Irlanda',
    nombreForApi: 'ireland/premier-division/'
   }, 
   {
     nombrePublico: 'Lituania',
     nombreForApi: 'lithuania/a-lyga/'
   },
   {
    nombrePublico: 'Noruega',
    nombreForApi: 'norway/1-division/'
   },
   {
    nombrePublico: 'Irlanda del Norte',
    nombreForApi: 'northern-ireland/premiership/'
   },
   {
    nombrePublico: 'Polonia',
    nombreForApi: 'poland/ekstraklasa/'
   }, 
   {
    nombrePublico: 'Eslovaquia',
    nombreForApi: 'slovakia/fortuna-liga/'
   },
   {
    nombrePublico: 'Eslovenia',
    nombreForApi: 'slovenia/prva-liga/'
   },
   {
    nombrePublico: 'Suecia',
    nombreForApi: 'sweden/allsvenskan/'
   }, 
   {
     nombrePublico: 'Suiza',
     nombreForApi: 'switzerland/super-league/'
   },
   {
    nombrePublico: 'Turquia',
    nombreForApi: 'turkey/super-lig/'
   },
   {
    nombrePublico: 'Gales',
    nombreForApi: 'wales/cymru-premier/'
   },
   {
    nombrePublico: 'Paraguay',
    nombreForApi: 'paraguay/division-profesional-clausura/'
   }, 
   {
     nombrePublico: 'Peru',
     nombreForApi: 'peru/primera-division-clausura/'
   },
   {
    nombrePublico: 'Uruguay',
    nombreForApi: 'uruguay/primera-division-clausura/'
   },
   {
    nombrePublico: 'Indonesia',
    nombreForApi: 'indonesia/liga-1/'
   },
   {
    nombrePublico: 'Singapur',
    nombreForApi: 'singapore/sg-premier-league/'
   }, 
   {
     nombrePublico: 'Korea del Sur',
     nombreForApi: 'korea-republic/k-league-2/'
   },
   {
    nombrePublico: 'Tailandia',
    nombreForApi: 'thailand/thai-league/'
   },
   {
    nombrePublico: 'Vietman',
    nombreForApi: 'vietnam/v-league/'
   },
   {
    nombrePublico: 'Sudáfrica',
    nombreForApi: 'south-africa/premier-league/'
   }
   , 
   {
     nombrePublico: 'Mexico Expansión',
     nombreForApi: 'mexico/liga-de-expansion-mx-apertura/'
   },
   {
    nombrePublico: 'México Femenil',
    nombreForApi: 'mexico/womens-liga-mx-apertura/'
   },
   {
    nombrePublico: 'USA MLS',
    nombreForApi: 'usa/major-league-soccer/'
   },
   {
    nombrePublico: 'Venezuela',
    nombreForApi: 'venezuela/primera-division/'
   }
   , 
   {
     nombrePublico: 'Bielorusia',
     nombreForApi: 'belarus/premier-league/'
   },
   {
    nombrePublico: 'Camboya',
    nombreForApi: 'cambodia/c-league/'
   },
   {
    nombrePublico: 'Macedonia',
    nombreForApi: 'macedonia/1st-league/'
   }
   , 
   {
     nombrePublico: 'Tanzania',
     nombreForApi: 'tanzania/premier-league/'
   }
   , 
   {
     nombrePublico: 'Zambia',
     nombreForApi: 'zambia/super-league/'
   }
   , 
   {
     nombrePublico: 'Kazajistán',
     nombreForApi: 'kazakhstan/premier-league/'
   }
   , 
   {
     nombrePublico: 'Albania',
     nombreForApi: 'albania/kategoria-superiore/'
   }
   , 
   {
     nombrePublico: 'Finlandia - veikkausliiga',
     nombreForApi: 'finland/veikkausliiga/'
   },
   {
    nombrePublico: 'Finlandia - ykkonen',
    nombreForApi: 'finland/ykkonen/'
  },
  {
   nombrePublico: 'Luxemburgo',
   nombreForApi: 'luxembourg/national-division/'
  },
  {
   nombrePublico: 'Argentina - Women',
   nombreForApi: 'argentina/womens-primera-division-a/'
  },
  {
   nombrePublico: 'Australia - Tasmania',
   nombreForApi: 'australia/tasmania/'
  },
  {
   nombrePublico: 'Moldavia',
   nombreForApi: 'moldova/national-division/'
  },
  {
   nombrePublico: 'Georgia',
   nombreForApi: 'georgia/erovnuli-liga/'
  },
  {
   nombrePublico: 'Montenegro',
   nombreForApi: 'montenegro/1-cfl/'
  },
  {
   nombrePublico: 'Arabia Saudita',
   nombreForApi: 'saudi-arabia/saudi-professional-league/'
  },
  {
   nombrePublico: 'Kuwait',
   nombreForApi: 'kuwait/premier-league/'
  },
  {
   nombrePublico: 'Chipre',
   nombreForApi: 'cyprus/1-division/'
  },
  {
   nombrePublico: 'Ucrania',
   nombreForApi: 'ukraine/premier-league/'
  },
  {
   nombrePublico: 'Argentina 1er B Metro.',
   nombreForApi: 'argentina/primera-b-metropolitana-clausura/'
  },
  {
   nombrePublico: 'Argentina Nacional B',
   nombreForApi: 'argentina/primera-nacional/'
  },
  {
   nombrePublico: 'Brasil Serie B',
   nombreForApi: 'brazil/serie-b/'
  },
  {
   nombrePublico: 'Chile Primera B',
   nombreForApi: 'chile/primera-b/'
  },
  {
   nombrePublico: 'Colombia Primera B',
   nombreForApi: 'colombia/primera-b-clausura/'
  },
  {
   nombrePublico: 'Ecuador Primera B',
   nombreForApi: 'ecuador/liga-pro-serie-b/'
  },
  {
   nombrePublico: 'Inglaterra Liga 1',
   nombreForApi: 'england/league-1/'
  },
  {
   nombrePublico: 'Birmania',
   nombreForApi: 'myanmar/national-league/'
  },
  {
   nombrePublico: 'Inglaterra Liga 2',
   nombreForApi: 'england/league-2/'
  }, 
  {
    nombrePublico: 'Italia Serie B',
    nombreForApi: 'italy/serie-b/'
  }, 
  {
    nombrePublico: 'España la Liga 2',
    nombreForApi: 'spain/laliga-smartbank/'
  }
  , 
  {
    nombrePublico: 'España la Liga2 2021-2022',
    nombreForApi: 'spain/laliga-smartbank-2021-2022/',
    historico: 1
  }
   
];

// myanmar/national-league/

  private servicioUrl: string = '/v1/api/app/stage/soccer/';

  public resultados: Summary[] = [];
  public proximos: Summary[] = [];

  public shortCount: number[] = [];

  public Eventos: Event[] = [];

  public ligaActual : string = "";
  public conteoActual : number = 0;
  public totDraw : number = 0;

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
    this.totDraw = 0;
    this.Eventos.forEach((e) => {

      var itmEvent: Summary = this.getSummaryObj(e);
      shortSum = conteo;
      conteo = (itmEvent.TLGoals == itmEvent.TVGoals) ? 0 : conteo += 1;

      if(itmEvent.TLGoals == itmEvent.TVGoals){ this.shortCount.push(shortSum); this.totDraw +=1; }

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