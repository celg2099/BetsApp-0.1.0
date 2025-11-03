import { Component, OnInit } from '@angular/core';
import { BetsService } from '../service/bets.service';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html'
})
export class MarcadoresComponent  {

  // Cache para evitar recálculos
  private _cachedShortResultReverse: number[] | null = null;
  private _lastShortCountLength: number = 0;

  get resultados() {
    return this.betService.resultados;
  }

  get shortResult() {
    // Limpiar cache si hay nuevos datos
    if (this._lastShortCountLength !== this.betService.shortCount.length) {
      this.clearCache();
    }
    return this.betService.shortCount;
  }

  get shortResultReverse() {
    // Usar cache si los datos no han cambiado
    if (this._cachedShortResultReverse && this._lastShortCountLength === this.betService.shortCount.length) {
      return this._cachedShortResultReverse;
    }
    
    // Calcular y cachear el resultado
    this._cachedShortResultReverse = [...this.betService.shortCount].reverse();
    this._lastShortCountLength = this.betService.shortCount.length;
    
    return this._cachedShortResultReverse;
  }

  // Limpia el cache cuando hay nuevos datos
  private clearCache(): void {
    this._cachedShortResultReverse = null;
    this._lastShortCountLength = 0;
  }

  constructor(private betService : BetsService) {

  }

}
