import { Component, OnInit } from '@angular/core';
import { BetsService } from '../service/bets.service';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html'
})
export class MarcadoresComponent  {


  get resultados() {
    return this.betService.resultados;
  }

  get shortResult() {

    return this.betService.shortCount;
  }


  constructor(private betService : BetsService) {

  }  

}
