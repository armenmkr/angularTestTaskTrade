import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AddEditTradeComponent } from '../add-edit-trade/add-edit-trade.component';
import { ITrade, ViewModeEnum } from '../core/interfaces/trade.model';
import { TradeApiService } from '../core/services/trade.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['entryDate', 'entryPrice', 'exitDate', 'exitPrice', 'profit', 'actions'];
  dataSource: MatTableDataSource<any>;
  title: string;
  description: string;

  constructor(private tradeService: TradeApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.tradeService.getAllTrades().subscribe((trades: ITrade[]) => {
      if (trades) {
        this.dataSource = new MatTableDataSource(trades);
        this.setYears(trades)
        this.tradeService.balanceData = trades.map((trade) => trade.profit);
      }
    })
  }

  deleteHandler(id: number): void {
    this.tradeService.isLoading$.next(true);
    this.tradeService.removeTrade(id).subscribe(() => {
      this.refreshTable();
      this.tradeService.isLoading$.next(false);
    });
  }

  openDialog(selectedTrade?: ITrade) {
    const dialogRef = this.dialog.open(AddEditTradeComponent, {
      width: '550px',
      data: {
        selectedTrade,
        viewMode: selectedTrade ? ViewModeEnum.EditMode : ViewModeEnum.CreateMode,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tradeService.isLoading$.next(true);
        const payload = result;

        this.tradeService.createUpdateTrade(payload).subscribe(() => {
          dialogRef.close();
          this.refreshTable();
          this.tradeService.isLoading$.next(false);
        })
      }
    });
  }

  private setYears(trades: ITrade[]): void {
    const entryDateMoments = trades.map(e => e.entryDate).map(d => d);
    const exitDateDateMoments = trades.map(e => e.exitDate).map(d => d);

    const allDates = [...entryDateMoments, ...exitDateDateMoments];
    this.tradeService.years = allDates
      .map((i) => moment(i).year().toString())
      .filter((elem, index, self) => index === self.indexOf(elem))
      .sort();
  }
}
