import { ITrade, ViewModeEnum } from '../core/interfaces/trade.model';

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit-trade',
  templateUrl: './add-edit-trade.component.html',
  styleUrls: ['./add-edit-trade.component.scss'],
})
export class AddEditTradeComponent implements OnInit {
  ViewModeEnum = ViewModeEnum;
  viewMode: ViewModeEnum;
  moment = moment;

  tradeForm = this.fb.group({
    entryDate: [null, [Validators.required]],
    exitDate: [null, [Validators.required]],
    entryPrice: [null, [Validators.required]],
    exitPrice: [null, [Validators.required]],
  });


  constructor(public dialogRef: MatDialogRef<AddEditTradeComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { selectedTrade: ITrade, viewMode: ViewModeEnum },
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.viewMode = this.dialogData.viewMode;

    if (this.dialogData.selectedTrade) {
      this.tradeForm.get('entryDate')?.patchValue(moment(this.dialogData.selectedTrade.entryDate));
      this.tradeForm.get('exitDate')?.patchValue(moment(this.dialogData.selectedTrade.exitDate));
      this.tradeForm.get('entryPrice')?.patchValue(this.dialogData.selectedTrade.entryPrice);
      this.tradeForm.get('exitPrice')?.patchValue(this.dialogData.selectedTrade.exitPrice);
    }
  }

  onSave(formValue?: ITrade) {

    const payload = formValue;
    payload!.entryDate = moment(formValue?.entryDate).format('DD/MM/YYYY');
    payload!.exitDate = moment(formValue?.exitDate).format('DD/MM/YYYY');
    payload!.entryPrice = formValue?.entryPrice!;
    payload!.exitPrice = formValue?.exitPrice!;
    payload!.profit = this.dialogData.selectedTrade?.profit;

    const editedTrade = this.viewMode === ViewModeEnum.CreateMode ? payload : { ...payload, id: this.dialogData.selectedTrade.id };
    this.dialogRef.close(editedTrade);
    console.log("onsave__>> editedTrade", editedTrade);
  }

}
