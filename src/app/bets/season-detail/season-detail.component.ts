import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BetsService } from '../service/bets.service';
import { Detail } from '../interface/detail.interface';
import { Summary, Liga, Eps, Event, LigaHomologada, HotCheck } from '../interface/results.interface';
import { Subject, takeUntil } from 'rxjs';
import { ListStatics } from '../interface/results.interface';


@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html'
})
export class SeasonDetailComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  datos: string = "";
  conteoActualHt: number = 0;
  hideSumary: number = 0;
  errorCount: number = 0;
  
  // Cache para evitar recálculos
  private _cachedShortResultReverse: number[] | null = null;
  private _lastShortCountLength: number = 0;

  get seasonDetail() {
    return this.betService.proximos;
  }

  // Método principal para obtener y procesar los scores de medio tiempo
  shoHTScore(): void {
    try {
      this.initializeHTScoreData();
      this.processGamesForHTScores();
      this.showNotification('Procesando scores de medio tiempo...', 'info');
    } catch (error) {
      this.handleError('Error al iniciar el procesamiento', error);
    }
  }

  // Inicializa las variables y arrays necesarios para el procesamiento
  private initializeHTScoreData(): void {
    this.hideSumary = 0;
    this.errorCount = 0;
    this.betService.resultadosDetail = [];
    this.betService.shortCountHt = [];
    this.betService.totDrawHt = 0;
    this.clearCache();
  }

  // Procesa cada juego para obtener los scores de medio tiempo
  private processGamesForHTScores(): void {
    let iteracionNo = 0;
    const totalGames = this.betService.resultados.length;

    this.betService.resultados.forEach((game) => {
      const gameUrl = this.buildGameUrl(game);

      this.betService.getDetailGame(gameUrl)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => this.handleGameDataResponse(data, game, ++iteracionNo, totalGames),
          error: (error) => this.handleGameError(error, game),
          complete: () => this.finalizeHTScoreProcessing()
        });
    });
  }

  // Construye la URL específica para obtener las estadísticas del juego
  private buildGameUrl(game: Summary): string {
    const homeTeam = game.TLName.toLowerCase().replace(' ', '-');
    const awayTeam = game.TVName.toLowerCase().replace(' ', '-');
    return `${this.betService.currEvent}${homeTeam}-vrs-${awayTeam}/${game.Eid}/stats/`;
  }

  // Maneja la respuesta de datos del juego y actualiza los scores de medio tiempo
  private handleGameDataResponse(data: string, game: Summary, iteracionNo: number, totalGames: number): void {
    try {
      const detalle = this.getDetalleGame(data);
      const detallGame: Summary = { ...game };

      if (detalle) {
        detallGame.TLHtGoals = detalle.scoresByPeriod[0].home.score;
        detallGame.TVHtGoals = detalle.scoresByPeriod[0].away.score;
      }

      this.betService.resultadosDetail.push(detallGame);

      if (iteracionNo === totalGames) {
        this.processHTDrawStatistics();
      }
    } catch (error) {
      this.handleError(`Error procesando juego ${game.TLName} vs ${game.TVName}`, error);
    }
  }

  // Procesa las estadísticas de empates en medio tiempo
  private processHTDrawStatistics(): void {
    this.sortTable();
    let conteo = 0;

    this.betService.resultadosDetail.forEach((game) => {
      const shortSum = conteo;
      conteo = (game.TLHtGoals === game.TVHtGoals) ? 0 : conteo + 1;

      if (game.TLHtGoals === game.TVHtGoals) {
        this.betService.shortCountHt.push(shortSum);
        this.betService.totDrawHt += 1;
      }
    });

    this.betService.shortCountHt.push(conteo);
  }

  // Finaliza el procesamiento y actualiza la UI
  private finalizeHTScoreProcessing(): void {
    if (this.betService.shortCountHt.length > 0) {
      this.conteoActualHt = this.betService.shortCountHt[0];
    }
    this.hideSumary = 1;
    
    // Limpiar cache cuando hay nuevos datos
    this.clearCache();

    const message = this.errorCount > 0
      ? `Procesamiento completado con ${this.errorCount} errores`
      : 'Scores de medio tiempo procesados exitosamente';

    this.showNotification(message, this.errorCount > 0 ? 'warning' : 'success');
  }

  getDetalleGame(htlm: string): Detail | null {
    try {
      const inicioString = htlm.indexOf('scoresByPeriod');
      const finString = htlm.indexOf('aggregateHomeScore');

      if (inicioString > 0) {
        const textoExtraido = "{" + htlm.substring(inicioString - 1, finString - 2) + "}";
        return JSON.parse(textoExtraido);
      }
      return null;
    } catch (error) {
      this.handleError('Error al parsear datos del juego', error);
      return null;
    }
  }

get currentCountHt() {
  return this.conteoActualHt;
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

get shortResultReverse() {
  // Usar cache si los datos no han cambiado
  if (this._cachedShortResultReverse && this._lastShortCountLength === this.betService.shortCountHt.length) {
    return this._cachedShortResultReverse;
  }
  
  // Calcular y cachear el resultado
  this._cachedShortResultReverse = [...this.betService.shortCountHt].reverse();
  this._lastShortCountLength = this.betService.shortCountHt.length;
  
  return this._cachedShortResultReverse;
}

// Limpia el cache cuando hay nuevos datos
private clearCache(): void {
  this._cachedShortResultReverse = null;
  this._lastShortCountLength = 0;
}

constructor(
  private betService: BetsService,
  private snackBar: MatSnackBar
) {}

  // Maneja errores específicos de juegos individuales
  private handleGameError(error: any, game: Summary): void {
    this.errorCount++;
    console.error(`Error en juego ${game.TLName} vs ${game.TVName}:`, error);
  }

  // Maneja errores generales y muestra notificaciones
  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.showNotification(`${message}. Ver consola para detalles.`, 'error');
  }

  // Muestra notificaciones al usuario
  private showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    const config = {
      duration: type === 'error' ? 5000 : 3000,
      panelClass: [`snackbar-${type}`]
    };

    this.snackBar.open(message, 'Cerrar', config);
  }

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

}
