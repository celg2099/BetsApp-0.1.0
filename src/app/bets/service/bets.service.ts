import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Summary, Liga, Eps, Event, LigaHomologada, HotCheck } from '../interface/results.interface';
import { firstValueFrom } from 'rxjs';
import { Detail } from '../interface/detail.interface';


@Injectable({
  providedIn: 'root'
})
export class BetsService {


  public ligas: LigaHomologada[] = [
    {
      nombrePublico: 'Panama EAST',
      nombreForApi: 'panama/lpf-apertura-east/'
    },
    {
      nombrePublico: 'Panama West',
      nombreForApi: 'panama/lpf-apertura-west/'
    },
    {
      nombrePublico: 'Argentina',
      nombreForApi: 'argentina/primera-division-clausura/'
    },
    {
      nombrePublico: 'Argentina B Zone A',
      nombreForApi: 'argentina/primera-nacional-zone-a/'
    },
    // {
    //   nombrePublico: 'Argentina B Grup A 2023',
    //   nombreForApi: 'argentina/primera-nacional-zone-a-2023/'
    // },
    // {
    //   nombrePublico: 'Argentina B Grup A 2021',
    //   nombreForApi: 'argentina/primera-nacional-zone-a-2021/'
    // },
    {
      nombrePublico: 'Argentina B Zone B',
      nombreForApi: 'argentina/primera-nacional-zone-b/'
    },
    // {
    //   nombrePublico: 'Argentina B Grup B 2023',
    //   nombreForApi: 'argentina/primera-nacional-zone-b-2023/'
    // },
    // {
    //   nombrePublico: 'Argentina B Grup B 2021',
    //   nombreForApi: 'argentina/primera-nacional-zone-b-2021/'
    // },
    {
      nombrePublico: 'Guatemala',
      nombreForApi: 'guatemala/liga-nacional-apertura/'
    },
    {
      nombrePublico: 'Bulgaria',
      nombreForApi: 'bulgaria/parva-liga/'
    },
    {
      nombrePublico: 'Canada',
      nombreForApi: 'canada/premier-league/'
    },
    // {
    //   nombrePublico: '1. Canada 2019',
    //   nombreForApi: 'canada/premier-league-2019/'
    // },
    // {
    //   nombrePublico: '1. Canada 2020',
    //   nombreForApi: 'canada/premier-league-2020/'
    // },
    // {
    //   nombrePublico: '1. Canada 2021',
    //   nombreForApi: 'canada/premier-league-2021/'
    // },
    // {
    //   nombrePublico: '1. Canada 2022',
    //   nombreForApi: 'canada/premier-league-2022/'
    // },
    // {
    //   nombrePublico: '1. Canada 2023',
    //   nombreForApi: 'canada/premier-league-2023/'
    // },
    // {
    //   nombrePublico: '1. Canada 2024',
    //   nombreForApi: 'canada/premier-league-2024/'
    // },
    {
      nombrePublico: 'Qatar',
      nombreForApi: 'qatar/qatar-stars-league/'
    },
    {
      nombrePublico: 'España',
      nombreForApi: 'spain/laliga/'
    },
    {
      nombrePublico: 'España L2',
      nombreForApi: 'spain/laliga-2/'
    },
    // {
    //   nombrePublico: '1. España L2 2022',
    //   nombreForApi: 'spain/laliga-2-2022-2023/'
    // },
    // {
    //   nombrePublico: '1. España L2 2023',
    //   nombreForApi: 'spain/laliga-2-2023-2024/'
    // },
    {
      nombrePublico: 'Colombia 2025 C',
      nombreForApi: 'colombia/primera-a-clausura/'
    },
    {
      nombrePublico: 'Colombia B 2025 C',
      nombreForApi: 'colombia/primera-b-clausura/'
    },
    {
      nombrePublico: 'Armenia',
      nombreForApi: 'armenia/premier-league/'
    },
    // {
    //   nombrePublico: '1. Armenia 2020',
    //   nombreForApi: 'armenia/premier-league-2020-2021/'
    // },
    // {
    //   nombrePublico: '1. Armenia 2021',
    //   nombreForApi: 'armenia/premier-league-2021-2022/'
    // },
    // {
    //   nombrePublico: '1. Armenia 2022',
    //   nombreForApi: 'armenia/premier-league-2022-2023/'
    // },
    // {
    //   nombrePublico: '1. Armenia 2023',
    //   nombreForApi: 'armenia/premier-league-2023-2024/'
    // },
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
    // {
    //   nombrePublico: 'China 2019',
    //   nombreForApi: 'china/super-league-2019/'
    // },
    // {
    //   nombrePublico: 'China 2020',
    //   nombreForApi: 'china/super-league-2020/'
    // },
    // {
    //   nombrePublico: 'China 2021',
    //   nombreForApi: 'china/super-league-2021/'
    // },
    // {
    //   nombrePublico: 'China 2022',
    //   nombreForApi: 'china/super-league-2022/'
    // },
    // {
    //   nombrePublico: 'China 2023',
    //   nombreForApi: 'china/super-league-2023/'
    // },
    // {
    //   nombrePublico: 'China 2024',
    //   nombreForApi: 'china/super-league-2024/'
    // },
    {
      nombrePublico: 'Costa Rica C',
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
      nombreForApi: 'ecuador/serie-a-1-stage/'
    },
    {
      nombrePublico: 'Ecuador B',
      nombreForApi: 'ecuador/liga-pro-serie-b/'
    },
    // {
    //   nombrePublico: 'Ecuador B 2020',
    //   nombreForApi: 'ecuador/liga-pro-serie-b-2020/'
    // },
    // {
    //   nombrePublico: 'Ecuador B 2021',
    //   nombreForApi: 'ecuador/liga-pro-serie-b-2021/'
    // },
    // {
    //   nombrePublico: 'Ecuador B 2022',
    //   nombreForApi: 'ecuador/liga-pro-serie-b-2022/'
    // },
    // {
    //   nombrePublico: 'Ecuador B 2023',
    //   nombreForApi: 'ecuador/liga-pro-serie-b-2023/'
    // },
    // {
    //   nombrePublico: 'Ecuador B 2024',
    //   nombreForApi: 'ecuador/liga-pro-serie-b-2024/'
    // },
    {
      nombrePublico: 'Egipto',
      nombreForApi: 'egypt/premier-league/'
    },
    // {
    //   nombrePublico: '1. Egipto 2019',
    //   nombreForApi: 'egypt/premier-league-2019-2020/'
    // },
    // {
    //   nombrePublico: '1. Egipto 2020',
    //   nombreForApi: 'egypt/premier-league-2020-2021/'
    // },
    // {
    //   nombrePublico: '1. Egipto 2021',
    //   nombreForApi: 'egypt/premier-league-2021-2022/'
    // },
    // {
    //   nombrePublico: '1. Egipto 2022',
    //   nombreForApi: 'egypt/premier-league-2022-2023/'
    // },
    //  {
    //   nombrePublico: '1. Egipto 2023',
    //    nombreForApi: 'egypt/premier-league-2023-2024/'
    //  },
    {
      nombrePublico: 'El Salvador A',
      nombreForApi: 'el-salvador/primera-division-apertura/'
    },
    // {
    //   nombrePublico: 'El Salvador 2019-2020 C',
    //   nombreForApi: 'el-salvador/primera-division-clausura-2019-2020/'
    // },
    // {
    //   nombrePublico: 'El Salvador 2019-2020 A',
    //   nombreForApi: 'el-salvador/primera-division-apertura-2019-2020/'
    // },
    // {
    //   nombrePublico: 'El Salvador 2021-2022 C',
    //   nombreForApi: 'el-salvador/primera-division-clausura-2021-2022/'
    // },
    // {
    //   nombrePublico: 'El Salvador 2021-2022 A',
    //   nombreForApi: 'el-salvador/primera-division-apertura-2021-2022/'
    // },
    // {
    //   nombrePublico: 'El Salvador 2022-2023 C',
    //   nombreForApi: 'el-salvador/primera-division-clausura-2022-2023/'
    // },
    // {
    //   nombrePublico: 'El Salvador 2022-2023 A',
    //   nombreForApi: 'el-salvador/primera-division-apertura-2022-2023/'
    // },
    // {
    //   nombrePublico: 'El Salvador 2023-2024 C',
    //   nombreForApi: 'el-salvador/primera-division-clausura-2023-2024/'
    // },
    // {
    //   nombrePublico: 'El Salvador 2023-2024 A',
    //   nombreForApi: 'el-salvador/primera-division-apertura-2023-2024/'
    // },
    {
      nombrePublico: 'India',
      nombreForApi: 'india/indian-super-league/'
    },
    // {
    //   nombrePublico: 'India 2019',
    //   nombreForApi: 'india/indian-super-league-2019-2020/'
    // },
    // {
    //   nombrePublico: 'India 2020',
    //   nombreForApi: 'india/indian-super-league-2020-2021/'
    // },
    // {
    //   nombrePublico: 'India 2021',
    //   nombreForApi: 'india/indian-super-league-2021-2022/'
    // },
    // {
    //   nombrePublico: 'India 2022',
    //   nombreForApi: 'india/indian-super-league-2022-2023/'
    // },
    // {
    //   nombrePublico: 'India 2023',
    //   nombreForApi: 'india/indian-super-league-2023-2024/'
    // },
    {
      nombrePublico: 'Grecia',
      nombreForApi: 'greece/super-league/'
    },
    {
      nombrePublico: 'Honduras',
      nombreForApi: 'honduras/liga-nacional-clausura/'
    },
    {
      nombrePublico: 'Israel',
      nombreForApi: 'israel/premier-league/'
    },
    // {
    //   nombrePublico: 'Israel 2021',
    //   nombreForApi: 'israel/premier-league-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Israel 2022',
    //   nombreForApi: 'israel/premier-league-2022-2023/'
    // },
    // {
    //   nombrePublico: 'Israel 2023',
    //   nombreForApi: 'israel/premier-league-2023-2024/'
    // },
    {
      nombrePublico: 'Jordania',
      nombreForApi: 'jordan/pro-league/'
    },
    // {
    //   nombrePublico: '1. Jordania 2021',
    //   nombreForApi: 'jordan/pro-league-2021/'
    // },
    // {
    //   nombrePublico: '1. Jordania 2022',
    //   nombreForApi: 'jordan/pro-league-2022/'
    // },
    // {
    //   nombrePublico: '1. Jordania 2023',
    //   nombreForApi: 'jordan/pro-league-2023-2024/'
    // },
    {
      nombrePublico: 'Japon',
      nombreForApi: 'japan/j-league/'
    },
    {
      nombrePublico: 'Uzbekistan',
      nombreForApi: 'uzbekistan/superliga/'
    },
    // {
    //   nombrePublico: '1. Uzbekistan 2019',
    //   nombreForApi: 'uzbekistan/superliga-2019/'
    // },
    // {
    //   nombrePublico: '1. Uzbekistan 2020',
    //   nombreForApi: 'uzbekistan/superliga-2020/'
    // },
    // {
    //   nombrePublico: '1. Uzbekistan 2021',
    //   nombreForApi: 'uzbekistan/superliga-2021/'
    // },
    // {
    //   nombrePublico: '1. Uzbekistan 2022',
    //   nombreForApi: 'uzbekistan/superliga-2022/'
    // },
    // {
    //   nombrePublico: '1. Uzbekistan 2023',
    //   nombreForApi: 'uzbekistan/superliga-2023/'
    // },
    // {
    //   nombrePublico: '1. Uzbekistan 2024',
    //   nombreForApi: 'uzbekistan/superliga-2024/'
    // },
    {
      nombrePublico: 'Italia',
      nombreForApi: 'italy/serie-a/'
    },
    {
      nombrePublico: 'Alemania',
      nombreForApi: 'germany/bundesliga/'
    },
    {
      nombrePublico: 'Alemania L2',
      nombreForApi: 'germany/2-bundesliga/'
    },
    // {
    //   nombrePublico: 'Alemania L2 2022',
    //   nombreForApi: 'germany/2-bundesliga-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Alemania L2 2023',
    //   nombreForApi: 'germany/2-bundesliga-2022-2023/'
    // },
    // {
    //   nombrePublico: 'Alemania L2 2024',
    //   nombreForApi: 'germany/2-bundesliga-2023-2024/'
    // },
    {
      nombrePublico: 'Alemania L3',
      nombreForApi: 'germany/3-liga/'
    },
    // {
    //   nombrePublico: 'Alemania L3 2022',
    //   nombreForApi: 'germany/3-liga-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Alemania L3 2023',
    //   nombreForApi: 'germany/3-liga-2022-2023/'
    // },    {
    //   nombrePublico: 'Alemania L3 2024',
    //   nombreForApi: 'germany/3-liga-2023-2024/'
    // },
    {
      nombrePublico: 'Francia',
      nombreForApi: 'france/ligue-1/'
    },
    {
      nombrePublico: 'Francia L2',
      nombreForApi: 'france/ligue-2/'
    },
    {
      nombrePublico: 'Portugal L2',
      nombreForApi: 'portugal/segunda-liga/'
    },
    {
      nombrePublico: 'Egipto Div A',
      nombreForApi: 'egypt/2-division-a/'
    },
    {
      nombrePublico: 'Uganda',
      nombreForApi: 'uganda/premier-league/'
    },
    // {
    //   nombrePublico: 'Egipto Div A 2024',
    //   nombreForApi: 'egypt/2-division-a-2023-2024/'
    // },
    // {
    //   nombrePublico: '1 Portugal L2 2020',
    //   nombreForApi: 'portugal/segunda-liga-2020-2021/'f
    // },
    // {
    //   nombrePublico: '1 Portugal L2 2021',
    //   nombreForApi: 'portugal/segunda-liga-2021-2022/'
    // },
    // {
    //   nombrePublico: '1 Portugal L2 2022',
    //   nombreForApi: 'portugal/segunda-liga-2022-2023/'
    // },
    // {
    //   nombrePublico: '1 Portugal L2 2023',
    //   nombreForApi: 'portugal/segunda-liga-2023-2024/'
    // },
    // {
    //   nombrePublico: 'Francia 2019',
    //   nombreForApi: 'france/ligue-1-2019-2020/'
    // },
    // {
    //   nombrePublico: 'Francia 2020',
    //   nombreForApi: 'france/ligue-1-2020-2021/'
    // },
    // {
    //   nombrePublico: 'Francia 2021',
    //   nombreForApi: 'france/ligue-1-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Francia 2022',
    //   nombreForApi: 'france/ligue-1-2022-2023/'
    // },
    // {
    //   nombrePublico: 'Francia 2023',
    //   nombreForApi: 'france/ligue-1-2023-2024/'
    // },
    {
      nombrePublico: 'Holanda',
      nombreForApi: 'netherlands/eredivisie/'
    },
    // {
    //   nombrePublico: 'Holanda 2019',
    //   nombreForApi: 'holland/eredivisie-2019-2020/'
    // },
    // {
    //   nombrePublico: 'Holanda 2020',
    //   nombreForApi: 'holland/eredivisie-2020-2021/'
    // },
    // {
    //   nombrePublico: 'Holanda 2021',
    //   nombreForApi: 'holland/eredivisie-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Holanda 2022',
    //   nombreForApi: 'holland/eredivisie-2022-2023/'
    // },
    // {
    //   nombrePublico: 'Holanda 2023',
    //   nombreForApi: 'holland/eredivisie-2023-2024/'
    // },
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
    // {
    //   nombrePublico: '1. Rep. Checa 2020',
    //   nombreForApi: 'czech-republic/1st-league-2020-2021/'
    // },
    // {
    //   nombrePublico: '1. Rep. Checa 2021',
    //   nombreForApi: 'czech-republic/1st-league-2021-2022/'
    // },
    // {
    //   nombrePublico: '1. Rep. Checa 2022',
    //   nombreForApi: 'czech-republic/1st-league-2022-2023/'
    // },
    // {
    //   nombrePublico: '1. Rep. Checa 2023',
    //   nombreForApi: 'czech-republic/1st-league-2023-2024/'
    // },
    {
      nombrePublico: 'Brasil',
      nombreForApi: 'brazil/serie-a/'
    },
    // {
    //   nombrePublico: '1. Brasil 2019',
    //   nombreForApi: 'brazil/serie-a-2019/'
    // },
    // {
    //   nombrePublico: '1. Brasil 2020',
    //   nombreForApi: 'brazil/serie-a-2020/'
    // },
    // {
    //   nombrePublico: '1. Brasil 2021',
    //   nombreForApi: 'brazil/serie-a-2021/'
    // },
    // {
    //   nombrePublico: '1. Brasil 2022',
    //   nombreForApi: 'brazil/serie-a-2022/'
    // },
    // {
    //   nombrePublico: '1. Brasil 2023',
    //   nombreForApi: 'brazil/serie-a-2023/'
    // },
    // {
    //   nombrePublico: '1. Brasil 2024',
    //   nombreForApi: 'brazil/serie-a-2024/'
    // },
    {
      nombrePublico: 'Brasil B',
      nombreForApi: 'brazil/serie-b/'
    },
    // {
    //   nombrePublico: '1. Brasil B 2019',
    //   nombreForApi: 'brazil/serie-b-2019/'
    // },
    // {
    //   nombrePublico: '1. Brasil B 2020',
    //   nombreForApi: 'brazil/serie-b-2020/'
    // },
    // {
    //   nombrePublico: '1. Brasil B 2021',
    //   nombreForApi: 'brazil/serie-b-2021/'
    // },
    // {
    //   nombrePublico: '1. Brasil B 2022',
    //   nombreForApi: 'brazil/serie-b-2022/'
    // },
    // {
    //   nombrePublico: '1. Brasil B 2023',
    //   nombreForApi: 'brazil/serie-b-2023/'
    // },
    // {
    //   nombrePublico: '1. Brasil B 2024',
    //   nombreForApi: 'brazil/serie-b-2024/'
    // },
    {
      nombrePublico: 'Estonia',
      nombreForApi: 'estonia/meistriliiga/'
    },
    // {
    //   nombrePublico: '1. Estonia 2020',
    //   nombreForApi: 'estonia/meistriliiga-2020/'
    // },
    // {
    //   nombrePublico: '1. Estonia 2021',
    //   nombreForApi: 'estonia/meistriliiga-2021/'
    // },
    // {
    //   nombrePublico: '1. Estonia 2022',
    //   nombreForApi: 'estonia/meistriliiga-2022/'
    // },
    // {
    //   nombrePublico: '1. Estonia 2023',
    //   nombreForApi: 'estonia/meistriliiga-2023/'
    // },
    // {
    //   nombrePublico: '1. Estonia 2024',
    //   nombreForApi: 'estonia/meistriliiga-2024/'
    // },
    {
      nombrePublico: 'Islas Faroe',
      nombreForApi: 'faroe-islands/premier-league/'
    },
    {
      nombrePublico: 'Hungria',
      nombreForApi: 'hungary/nb-i/'
    },
    {
      nombrePublico: 'Bolivia  A',
      nombreForApi: 'bolivia/primera-division-apertura/'
    },
    // {
    //   nombrePublico: '1. Bolivia C',
    //   nombreForApi: 'bolivia/primera-division-clausura/'
    // },
    // {
    //   nombrePublico: '1. Bolivia C 2019',
    //   nombreForApi: 'bolivia/primera-division-clausura-2019/'
    // },
    // {
    //   nombrePublico: '1. Bolivia  A 2020',
    //   nombreForApi: 'bolivia/primera-division-apertura-2020/'
    // },
    // {
    //   nombrePublico: '1. Bolivia C 2022',
    //   nombreForApi: 'bolivia/primera-division-clausura-2022/'
    // },
    // {
    //   nombrePublico: '1. Bolivia  A 2022',
    //   nombreForApi: 'bolivia/primera-division-apertura-2022/'
    // },
    // {
    //   nombrePublico: '1. Bolivia  A 2024',
    //   nombreForApi: 'bolivia/primera-division-apertura-2024/'
    // },
    {
      nombrePublico: 'Islandia',
      nombreForApi: 'iceland/urvalsdeild/'
    },
    {
      nombrePublico: 'Irlanda',
      nombreForApi: 'ireland/league-of-ireland-premier-division/'
    },
    {
      nombrePublico: 'Lituania',
      nombreForApi: 'lithuania/a-lyga/'
    },
    {
      nombrePublico: 'Camerun',
      nombreForApi: 'cameroon/elite-1/'
    },
    // {
    //   nombrePublico: '1. Lituania 2020',
    //   nombreForApi: 'lithuania/a-lyga-2020/'
    // },
    // {
    //   nombrePublico: '1. Lituania 2021',
    //   nombreForApi: 'lithuania/a-lyga-2021/'
    // },
    // {
    //   nombrePublico: '1. Lituania 2022',
    //   nombreForApi: 'lithuania/a-lyga-2022/'
    // },
    // {
    //   nombrePublico: '1. Lituania 2023',
    //   nombreForApi: 'lithuania/a-lyga-2023/'
    // },
    // {
    //   nombrePublico: '1. Lituania 2024',
    //   nombreForApi: 'lithuania/a-lyga-2024/'
    // },
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
      nombrePublico: 'Polonia L1',
      nombreForApi: 'poland/i-liga/'
    },
    // {
    //   nombrePublico: '1. Polonia L1 2020',
    //   nombreForApi: 'poland/i-liga-2020-2021/'
    // },
    // {
    //   nombrePublico: '1. Polonia L1 2021',
    //   nombreForApi: 'poland/i-liga-2021-2022/'
    // },
    // {
    //   nombrePublico: '1. Polonia L1 2022',
    //   nombreForApi: 'poland/i-liga-2022-2023/'
    // },
    // {
    //   nombrePublico: '1. Polonia L1 2023',
    //   nombreForApi: 'poland/i-liga-2023-2024'
    // },
    {
      nombrePublico: 'Eslovaquia',
      nombreForApi: 'slovakia/fortuna-liga/'
    },
    {
      nombrePublico: 'Eslovenia',
      nombreForApi: 'slovenia/prva-liga/'
    },
    // {
    //   nombrePublico: '1. Eslovenia 2020',
    //   nombreForApi: 'slovenia/prva-liga-2020-2021/'
    // },
    // {
    //   nombrePublico: '1. Eslovenia 2021',
    //   nombreForApi: 'slovenia/prva-liga-2021-2022/'
    // },
    // {
    //   nombrePublico: '1. Eslovenia 2022',
    //   nombreForApi: 'slovenia/prva-liga-2022-2023/'
    // },
    // {
    //   nombrePublico: '1. Eslovenia 2023',
    //   nombreForApi: 'slovenia/prva-liga-2023-2024/'
    // },
    {
      nombrePublico: 'Suecia',
      nombreForApi: 'sweden/allsvenskan/'
    },
    // {
    //   nombrePublico: '1. Suecia 2019',
    //   nombreForApi: 'sweden/allsvenskan-2019/'
    // },
    // {
    //   nombrePublico: '1. Suecia 2020',
    //   nombreForApi: 'sweden/allsvenskan-2020/'
    // },
    // {
    //   nombrePublico: '1. Suecia 2021',
    //   nombreForApi: 'sweden/allsvenskan-2021/'
    // },
    // {
    //   nombrePublico: '1. Suecia 2022',
    //   nombreForApi: 'sweden/allsvenskan-2022/'
    // },
    // {
    //   nombrePublico: '1. Suecia 2023',
    //   nombreForApi: 'sweden/allsvenskan-2023/'
    // },
    // {
    //   nombrePublico: '1. Suecia 2024',
    //   nombreForApi: 'sweden/allsvenskan-2024/'
    // },
    {
      nombrePublico: 'Suiza',
      nombreForApi: 'switzerland/super-league/'
    },
    {
      nombrePublico: 'Turquia',
      nombreForApi: 'turkiye/super-lig'
    },
    {
      nombrePublico: 'Turquia L1',
      nombreForApi: 'turkiye/1st-lig/'
    },
    {
      nombrePublico: 'Gales',
      nombreForApi: 'wales/cymru-premier/'
    },
    {
      nombrePublico: 'Paraguay C',
      nombreForApi: 'paraguay/division-profesional-clausura/'
    },
    {
      nombrePublico: 'Peru C',
      nombreForApi: 'peru/primera-division-clausura/'
    },
    // {
    //   nombrePublico: '1. Uruguay C 2019',
    //   nombreForApi: 'uruguay/primera-division-clausura-2019/'
    // },
    // {
    //   nombrePublico: '1. Uruguay C 2020',
    //   nombreForApi: 'uruguay/primera-division-clausura-2020/'
    // },
    // {
    //   nombrePublico: '1. Uruguay A 2020',
    //   nombreForApi: 'uruguay/primera-division-apertura-2020/'
    // },
    // {
    //   nombrePublico: '1. Uruguay A 2021',
    //   nombreForApi: 'uruguay/primera-division-apertura-2021/'
    // },
    // {
    //   nombrePublico: '1. Uruguay C 2021',
    //   nombreForApi: 'uruguay/primera-division-clausura-2021/'
    // },
    // {
    //   nombrePublico: '1. Uruguay A 2022',
    //   nombreForApi: 'uruguay/primera-division-apertura-2022/'
    // },
    // {
    //   nombrePublico: '1. Uruguay C 2022',
    //   nombreForApi: 'uruguay/primera-division-clausura-2022/'
    // },
    // {
    //   nombrePublico: '1. Uruguay A 2023',
    //   nombreForApi: 'uruguay/primera-division-apertura-2023/'
    // },
    // {
    //   nombrePublico: '1. Uruguay C 2023',
    //   nombreForApi: 'uruguay/primera-division-clausura-2023/'
    // },
    // {
    //   nombrePublico: '1. Uruguay A 2024',
    //   nombreForApi: 'uruguay/primera-division-apertura-2024/'
    // },
    // {
    //   nombrePublico: '1. Uruguay C 2024',
    //   nombreForApi: 'uruguay/primera-division-clausura/'
    // },
    {
      nombrePublico: 'Uruguay C 2025',
      nombreForApi: 'uruguay/primera-division-clausura/'
    },
    {
      nombrePublico: 'Indonesia',
      nombreForApi: 'indonesia/liga-1/'
    },
    // {
    //   nombrePublico: 'Indonesia 2021',
    //   nombreForApi: 'indonesia/liga-1-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Indonesia 2022',
    //   nombreForApi: 'indonesia/liga-1-2022-2023/'
    // },
    // {
    //   nombrePublico: 'Indonesia 2023',
    //   nombreForApi: 'indonesia/liga-1-2023-2024/'
    // },
    {
      nombrePublico: 'Singapur',
      nombreForApi: 'singapore/sg-premier-league/'
    },
    // {
    //   nombrePublico: 'Singapur 2020',
    //   nombreForApi: 'singapore/sg-premier-league-2020/'
    // },
    // {
    //   nombrePublico: 'Singapur 2021',
    //   nombreForApi: 'singapore/sg-premier-league-2021/'
    // },
    // {
    //   nombrePublico: 'Singapur 2022',
    //   nombreForApi: 'singapore/sg-premier-league-2022/'
    // },
    // {
    //   nombrePublico: 'Singapur 2023',
    //   nombreForApi: 'singapore/sg-premier-league-2023/'
    // },
    {
      nombrePublico: 'Korea del Sur',
      nombreForApi: 'republic-of-korea/k-league-1/'
    },
    {
      nombrePublico: 'Tailandia',
      nombreForApi: 'thailand/thai-league/'
    },
    // {
    //   nombrePublico: '1. Tailandia 2019',
    //   nombreForApi: 'thailand/thai-league-2019/'
    // },
    // {
    //   nombrePublico: '1. Tailandia 2020',
    //   nombreForApi: 'thailand/thai-league-2020/'
    // },
    // {
    //   nombrePublico: '1. Tailandia 2021',
    //   nombreForApi: 'thailand/thai-league-2021-2022/'
    // },
    // {
    //   nombrePublico: '1. Tailandia 2022',
    //   nombreForApi: 'thailand/thai-league-2022-2023/'
    // },
    // {
    //   nombrePublico: '1. Tailandia 2023',
    //   nombreForApi: 'thailand/thai-league-2023-2024/'
    // },
    {
      nombrePublico: 'Vietman',
      nombreForApi: 'vietnam/v-league/'
    },
    {
      nombrePublico: 'Sudáfrica',
      nombreForApi: 'south-africa/premier-league/'
    },
    {
      nombrePublico: 'Mexico Expansión C',
      nombreForApi: 'mexico/liga-de-expansion-mx-clausura/'
    },
    {
      nombrePublico: 'México Femenil',
      nombreForApi: 'mexico/liga-mx-clausura-women/'
    },
{
      nombrePublico: 'USA MLS',
      nombreForApi: 'usa/major-league-soccer/'
    },
    // {
    //   nombrePublico: 'USA MLS 2020',
    //   nombreForApi: 'usa/major-league-soccer-2020/'
    // },
    // {
    //   nombrePublico: 'USA MLS 2021',
    //   nombreForApi: 'usa/major-league-soccer-2021/'
    // },
    // {
    //   nombrePublico: 'USA MLS 2022',
    //   nombreForApi: 'usa/major-league-soccer-2022/'
    // },
    // {
    //   nombrePublico: 'USA MLS 2023',
    //   nombreForApi: 'usa/major-league-soccer-2023/'
    // },
    // {
    //   nombrePublico: 'USA MLS 2024',
    //   nombreForApi: 'usa/major-league-soccer-2024/'
    // },
    {
      nombrePublico: 'Venezuela',
      nombreForApi: 'venezuela/primera-division/'
    },
    {
      nombrePublico: 'Bielorusia',
      nombreForApi: 'belarus/premier-league/'
    },
    {
      nombrePublico: 'Camboya',
      nombreForApi: 'cambodia/c-league/'
    },
    {
      nombrePublico: 'Macedonia del Norte',
      nombreForApi: 'north-macedonia/1st-league'
    }
    ,
    {
      nombrePublico: 'Tanzania',
      nombreForApi: 'tanzania/premier-league/'
    }
    ,
    // {
    //   nombrePublico: '1. Tanzania 2020',
    //   nombreForApi: 'tanzania/premier-league-2020-2021/'
    // }
    // ,
    // {
    //   nombrePublico: '1. Tanzania 2021',
    //   nombreForApi: 'tanzania/premier-league-2021-2022/'
    // }
    // ,
    // {
    //   nombrePublico: '1. Tanzania 2022',
    //   nombreForApi: 'tanzania/premier-league-2022-2023/'
    // }
    // ,
    // {
    //   nombrePublico: '1. Tanzania 2023',
    //   nombreForApi: 'tanzania/premier-league-2023-2024/'
    // }
    // ,
    {
      nombrePublico: 'Kazajistán',
      nombreForApi: 'kazakhstan/premier-league/'
    }
    // ,
    // {
    //   nombrePublico: '1. Kazajistán 2019',
    //   nombreForApi: 'kazakhstan/premier-league-2019/'
    // }
    // ,
    // {
    //   nombrePublico: '1. Kazajistán 2020',
    //   nombreForApi: 'kazakhstan/premier-league-2020/'
    // }
    // ,
    // {
    //   nombrePublico: '1. Kazajistán 2021',
    //   nombreForApi: 'kazakhstan/premier-league-2021/'
    // }
    // ,
    // {
    //   nombrePublico: '1. Kazajistán 2022',
    //   nombreForApi: 'kazakhstan/premier-league-2022/'
    // }
    // ,
    // {
    //   nombrePublico: '1. Kazajistán 2023',
    //   nombreForApi: 'kazakhstan/premier-league-2023/'
    // }
    // ,
    // {
    //   nombrePublico: '1. Kazajistán 2024',
    //   nombreForApi: 'kazakhstan/premier-league-2024/'
    // }
    ,
    // {
    //   nombrePublico: 'Albania 2020',
    //   nombreForApi: 'albania/kategoria-superiore-2020-2021/'
    // },
    {
      nombrePublico: 'Albania ',
      nombreForApi: 'albania/kategoria-superiore/'
    },
    // {
    //   nombrePublico: 'Albania 2021',
    //   nombreForApi: 'albania/kategoria-superiore-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Albania 2022',
    //   nombreForApi: 'albania/kategoria-superiore-2022-2023/'
    // },
    // {
    //   nombrePublico: 'Albania 2023',
    //   nombreForApi: 'albania/kategoria-superiore-2023-2024/'
    // },
    {
      nombrePublico: 'Finlandia - veikkausliiga',
      nombreForApi: 'finland/veikkausliiga/'
    },
    // {
    //   nombrePublico: '1. Finlandia - veikkausliiga 2019',
    //   nombreForApi: 'finland/veikkausliiga-2019/'
    // },
    // {
    //   nombrePublico: '1. Finlandia - veikkausliiga 2020',
    //   nombreForApi: 'finland/veikkausliiga-2020/'
    // },
    // {
    //   nombrePublico: '1. Finlandia - veikkausliiga 2021',
    //   nombreForApi: 'finland/veikkausliiga-2021/'
    // },
    // {
    //   nombrePublico: '1. Finlandia - veikkausliiga 2022',
    //   nombreForApi: 'finland/veikkausliiga-2022/'
    // },
    // {
    //   nombrePublico: '1. Finlandia - veikkausliiga 2023',
    //   nombreForApi: 'finland/veikkausliiga-2023/'
    // },
    // {
    //   nombrePublico: '1. Finlandia - veikkausliiga 2024',
    //   nombreForApi: 'finland/veikkausliiga-2024/'
    // },
    {
      nombrePublico: 'Luxemburgo',
      nombreForApi: 'luxembourg/national-division/'
    },
    {
      nombrePublico: 'Argentina - Women',
      nombreForApi: 'argentina/womens-primera-division-a/'
    },
    // {
    //   nombrePublico: '2. Argentina - Women A 2022',
    //   nombreForApi: 'argentina/womens-primera-division-a-2022/'
    // },
    // {
    //   nombrePublico: '2. Argentina - Women A 2023',
    //   nombreForApi: 'argentina/womens-primera-division-a-2023/'
    // },
    // {
    //   nombrePublico: '2. Argentina - Women A 2024',
    //   nombreForApi: 'argentina/womens-primera-division-a-2024/'
    // },
    {
      nombrePublico: 'Australia - Tasmania',
      nombreForApi: 'australia/tasmania/'
    },
    {
      nombrePublico: 'Jamaica',
      nombreForApi: 'jamaica/premier-league/'
    },
    // {
    //   nombrePublico: 'Jamaica 2021',
    //   nombreForApi: 'jamaica/premier-league-2021/'
    // },
    // {
    //   nombrePublico: 'Jamaica 2022',
    //   nombreForApi: 'jamaica/premier-league-2022/'
    // },
    // {
    //   nombrePublico: 'Jamaica 2023',
    //   nombreForApi: 'jamaica/premier-league-2023-2024/'
    // },
    // {
    //   nombrePublico: 'Australia - Tasmania - 2020',
    //   nombreForApi: 'australia/tasmania-2020/'
    // },
    // {
    //   nombrePublico: 'Australia - Tasmania - 2021',
    //   nombreForApi: 'australia/tasmania-2021/'
    // },
    // {
    //   nombrePublico: 'Australia - Tasmania - 2022',
    //   nombreForApi: 'australia/tasmania-2022/'
    // },
    // {
    //   nombrePublico: 'Australia - Tasmania - 2023',
    //   nombreForApi: 'australia/tasmania-2023/'
    // },
    // {
    //   nombrePublico: 'Australia - Tasmania - 2024',
    //   nombreForApi: 'australia/tasmania-2024/'
    // },
     {
       nombrePublico: 'Australia',
       nombreForApi: 'australia/a-league/'
     },
    // {
    //   nombrePublico: '1. Australia 2020',
    //   nombreForApi: 'australia/a-league-2020-2021/'
    // },
    // {
    //   nombrePublico: '1. Australia 2021',
    //   nombreForApi: 'australia/a-league-2021-2022/'
    // },
    // {
    //   nombrePublico: '1. Australia 2022',
    //   nombreForApi: 'australia/a-league-2022-2023/'
    // },
    // {
    //   nombrePublico: '1. Australia 2023',
    //   nombreForApi: 'australia/a-league-2023-2024/'
    // },
    {
      nombrePublico: 'Moldavia',
      nombreForApi: 'moldova/national-division/'
    },
    // {
    //   nombrePublico: '1. Georgia 2019',
    //   nombreForApi: 'georgia/erovnuli-liga-2019/'
    // },
    // {
    //   nombrePublico: '1. Georgia 2021',
    //   nombreForApi: 'georgia/erovnuli-liga-2021/'
    // },
    // {
    //   nombrePublico: '1. Georgia 2022',
    //   nombreForApi: 'georgia/erovnuli-liga-2022/'
    // },
    // {
    //   nombrePublico: '1. Georgia 2023',
    //   nombreForApi: 'georgia/erovnuli-liga-2023/'
    // },
    // {
    //   nombrePublico: '1. Georgia 2024',
    //   nombreForApi: 'georgia/erovnuli-liga-2021/'
    // },
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
    // {
    //   nombrePublico: 'Kuwait 2019',
    //   nombreForApi: 'kuwait/premier-league-2019-2020/'
    // },
    // {
    //   nombrePublico: 'Kuwait 2020',
    //   nombreForApi: 'kuwait/premier-league-2020-2021/'
    // },
    // {
    //   nombrePublico: 'Kuwait 2021',
    //   nombreForApi: 'kuwait/premier-league-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Kuwait 2022',
    //   nombreForApi: 'kuwait/premier-league-2022-2023/'
    // },
    // {
    //   nombrePublico: 'Kuwait 2023',
    //   nombreForApi: 'kuwait/premier-league-2023-2024/'
    // },
    {
      nombrePublico: 'Chipre',
      nombreForApi: 'cyprus/1-division/'
    },
    {
      nombrePublico: 'Ucrania',
      nombreForApi: 'ukraine/premier-league/'
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
    // {
    //   nombrePublico: 'Italia Serie B 2020',
    //   nombreForApi: 'italy/serie-b-2020-2021/'
    // },
    // {
    //   nombrePublico: 'Italia Serie B 2021',
    //   nombreForApi: 'italy/serie-b-2021-2022/'
    // },
    // {
    //   nombrePublico: 'Italia Serie B 2022',
    //   nombreForApi: 'italy/serie-b-2022-2023/'
    // },
    // {
    //   nombrePublico: 'Italia Serie B 2023',
    //   nombreForApi: 'italy/serie-b-2023-2024/'
    // },
    {
      nombrePublico: 'Hong Kong',
      nombreForApi: 'hong-kong/premier-league/',
      historico: 1
    },
    // {
    //   nombrePublico: '1. Hong Kong 2019',
    //   nombreForApi: 'hong-kong/premier-league-2019-2020/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Hong Kong 2020',
    //   nombreForApi: 'hong-kong/premier-league-2020-2021/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Hong Kong 2021',
    //   nombreForApi: 'hong-kong/premier-league-2021-2022/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Hong Kong 2022',
    //   nombreForApi: 'hong-kong/premier-league-2022-2023/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Hong Kong 2023',
    //   nombreForApi: 'hong-kong/premier-league-2023-2024/',
    //   historico: 1
    // },
    {
      nombrePublico: 'Barein',
      nombreForApi: 'bahrain/premier-league/',
      historico: 1
    },
    {
      nombrePublico: 'Emiratos Arabes Unidos',
      nombreForApi: 'united-arab-emirates/uae-league/',
      historico: 1
    },
    // {
    //   nombrePublico: '1. Emiratos Arabes Unidos 2020',
    //   nombreForApi: 'united-arab-emirates/uae-league-2020-2021/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Emiratos Arabes Unidos 2021',
    //   nombreForApi: 'united-arab-emirates/uae-league-2021-2022/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Emiratos Arabes Unidos 2022',
    //   nombreForApi: 'united-arab-emirates/uae-league-2022-2023/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Emiratos Arabes Unidos 2023',
    //   nombreForApi: 'united-arab-emirates/uae-league-2023-2024/',
    //   historico: 1
    // },
    {
      nombrePublico: 'Angola',
      nombreForApi: 'angola/girabola/',
      historico: 1
    },
    {
      nombrePublico: 'Marruecos',
      nombreForApi: 'morocco/botola-pro/',
      historico: 1
    },
    {
      nombrePublico: 'Argelia',
      nombreForApi: 'algeria/ligue-1/',
      historico: 1
    },
    // {
    //   nombrePublico: '1. Argelia 2019',
    //   nombreForApi: 'algeria/ligue-1-2019-2020/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2020',
    //   nombreForApi: 'algeria/ligue-1-2020-2021/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2021',
    //   nombreForApi: 'algeria/ligue-1-2021-2022/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2022',
    //   nombreForApi: 'algeria/ligue-1-2022-2023/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2023',
    //   nombreForApi: 'algeria/ligue-1-2023-2024/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2020',
    //   nombreForApi: 'algeria/ligue-1-2020-2021/',
    //   historico: 1
    // },
    {
      nombrePublico: 'Senegal',
      nombreForApi: 'senegal/premier-league/',
      historico: 1
    },
    // {
    //   nombrePublico: '1. Argelia 2019',
    //   nombreForApi: 'algeria/ligue-1-2019-2020/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2020',
    //   nombreForApi: 'algeria/ligue-1-2020-2021/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2021',
    //   nombreForApi: 'algeria/ligue-1-2021-2022/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2021',
    //   nombreForApi: 'algeria/ligue-1-2021-2022/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2022',
    //   nombreForApi: 'algeria/ligue-1-2022-2023/',
    //   historico: 1
    // },
    // {
    //   nombrePublico: '1. Argelia 2023',
    //   nombreForApi: 'algeria/ligue-1-2023-2024/',
    //   historico: 1
    // },
    {
      nombrePublico: 'México U20',
      nombreForApi: 'mexico/liga-mx-u20-clausura/',
      historico: 1
    }
  ];

  // myanmar/national-league/

   private url = '/en/football/';

   private servicioUrl: string = '/v1/api/app/stage/soccer/';

   public resultados: Summary[] = [];
   public resultadosDetail: Summary[] = [];
   public proximos: Summary[] = [];



   public shortCount: number[] = [];
   public shortCountHt: number[] = [];

   public Eventos: Event[] = [];

   public ligaActual: string = "";
   public conteoActual: number = 0;
   public totDraw: number = 0;
   public totDrawHt: number = 0;

   public loading: boolean = false;

   public checkList: HotCheck[] = [];

   public currEvent: string = "";

   public currentDetallGame: any;



   constructor(private http: HttpClient) {
   }


   async getDetailGame2(item: Summary): Promise<string> {

    var strGetByGame = item.TLName.toLocaleLowerCase().replace(' ','-') + '-vrs-' + item.TVName.toLocaleLowerCase().replace(' ','-') + '/'+ item.Eid + '/stats/';
    var url = this.currEvent + strGetByGame;
    var urlArmed = this.url + url;
    this.currentDetallGame = item;

    const datos = await firstValueFrom(this.http.get(urlArmed, {  responseType: 'text' }));
    return datos;
  }


   public getDetailGame(query: string): Observable<string> {


    var urlArmed = this.url + query;
    return this.http.get(urlArmed, { responseType: 'text' });
   }


   buscarDetalleGame(query: string = '') {
       var urlArmed = this.url + query;
       this.http.get(urlArmed, {  responseType: 'text' })
         .subscribe((resp) => {
          var inicioString = resp.indexOf('scoresByPeriod');
          var finString = resp.indexOf('aggregateHomeScore');

          if (inicioString > 0){
            var textoExtraido: string = "{"+resp.substring(inicioString-1, finString-2)+"}";
            const detail: Detail = JSON.parse(textoExtraido);
          }
          else {
            console.log('No data detected.')
          }
        },
        (error) => {
          console.error('Ocurrió un error al obtener el detalle del Juego:', error);
          this.loading = false;
        }
      );
   }


  buscarResultados(query: string = '') {

    this.currEvent = query;

    const params = new HttpParams()
      .set('MD', '1');

    this.http.get<Liga>(`${this.servicioUrl}${query}-6`, { params })
      .subscribe((resp) => {
        console.log(resp);
        console.log(`${this.servicioUrl}${query}-6`);

        this.resultadosDetail = [];
        this.shortCountHt = [];

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

  public getEventosByLiga(liga: string) {
    const params = new HttpParams()
      .set('MD', '1');

    const url = `${this.servicioUrl}${liga}-6`;
    return this.http.get<Liga>(url, { params });
  }

  public getEventosByLiga2(liga: string) : Observable<Liga> {

      const params = new HttpParams()
      .set('MD', '1');
      const url = `${this.servicioUrl}${liga}-6`;
    return this.http.get<Liga>(url, { params });
  }


  setResultados(q: string) {

    this.Eventos = this.Eventos.filter(e => (e.Eps == Eps.Ft));

    var conteo = 0;
    var shortSum = 0;
    this.totDraw = 0;
    this.Eventos.forEach((e) => {

      var itmEvent: Summary = this.getSummaryObj(e);
      shortSum = conteo;
      conteo = (itmEvent.TLGoals == itmEvent.TVGoals) ? 0 : conteo += 1;

      if (itmEvent.TLGoals == itmEvent.TVGoals) { this.shortCount.push(shortSum); this.totDraw += 1; }

      itmEvent.CurrentCount = conteo;
      itmEvent.Eid = e.Eid.toString();

      this.resultados.push(itmEvent);

    });

    this.shortCount.push(conteo);

    this.resultados.reverse();
    this.shortCount.reverse();

    this.ligaActual = q;

    if (this.shortCount.length > 0) {
      this.conteoActual = this.shortCount[0];
    }

    this.loading = false;
  }

  setProximosEventos(games: Event[]) {

    var lst = games.filter(e => (e.Eps == Eps.NS));

    lst.forEach((e) => {

      var itmEvent: Summary = this.getSummaryObj(e);

      this.proximos.push(itmEvent);

    });


  }

  getSummaryObj(e: Event): Summary {

    var x = new Date(this.getDateFormat(e.Esd.toString()));
    var y = new Date(x.getTime() - 6 * 60 * 60 * 1000);

    var itmEvent: Summary = {
      TLName: e.T1[0].Nm, // Team Local Name
      TVName: e.T2[0].Nm, // Team Visit Name
      TLGoals: Number(e.Tr1), // Team Local Goals
      TVGoals: Number(e.Tr2), // Team Visit Goals
      CurrentCount: -1, // Partidos sin empate hasta nuevo empate
      Date: new Date(x)
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
