import { Component, OnInit } from '@angular/core';
import { BetsService } from '../service/bets.service';

@Component({
  selector: 'app-next-games',
  templateUrl: './next-games.component.html'
})
export class NextGamesComponent  {

  get nextGames() {
    return this.betService.proximos;
  }


  constructor(private betService : BetsService) {

  }  

}
