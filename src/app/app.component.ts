import { Component, OnInit } from '@angular/core';
import { TradeApiService } from './core/services/trade.service';
import { Observable, of } from 'rxjs';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading$: Observable<boolean> = of(false);

  constructor(public tradeService: TradeApiService) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.tradeService.isLoading$;
  }

}
