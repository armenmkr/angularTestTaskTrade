import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTradeComponent } from './add-edit-trade.component';

describe('AddEditTradeComponent', () => {
  let component: AddEditTradeComponent;
  let fixture: ComponentFixture<AddEditTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
