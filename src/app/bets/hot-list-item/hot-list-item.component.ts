import { Component, Input, OnInit } from '@angular/core';
import { HotCheck } from '../interface/results.interface';

@Component({
  selector: 'app-hot-list-item',
  templateUrl: './hot-list-item.component.html'
})
export class HotListItemComponent {

@Input() itm : HotCheck = {
pais: "",
liga: "",
conteoActual: 0,
maxConteo: 0,
gamesFinished: 0,
totDraw: 0,
lstConteo: [],
dateNextGame: ""
};

}
