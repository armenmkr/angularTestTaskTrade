import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { TradeApiService } from '../core/services/trade.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  chart_Options: ChartOptions = {
    responsive: true,
  };
  chart_Labels: Label[] = [];
  chart_Plugins = [];
  chart_Data: ChartDataSets[] = [
    {
      data: [],
      label: 'Balance'
    },
  ];

  constructor(public tradeService: TradeApiService) {
  }

  ngOnInit(): void {
    this.chart_Labels = this.tradeService.years;
    this.chart_Data[0].data = this.tradeService.balanceData;
  }
}
