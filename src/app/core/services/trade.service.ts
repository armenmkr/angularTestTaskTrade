import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITrade } from '../interfaces/trade.model';

@Injectable({
    providedIn: 'root'
})
export class TradeApiService {

    isLoading$ = new BehaviorSubject(false);
    balanceData: number[] = [];
    years: string[] = [];

    constructor(private http: HttpClient) {
    }

    getAllTrades(): Observable<ITrade[]> {
        return this.http.get<ITrade[]>(`${environment.serverApi}/trades`);
    }

    createUpdateTrade(payload: ITrade): Observable<ITrade[]> {
        if (payload.id) {
            return this.http.put<ITrade[]>(`${environment.serverApi}/trades/${payload.id}`, payload);
        } else {
            payload.profit = this.getRandomProfit();
            return this.http.post<ITrade[]>(`${environment.serverApi}/trades`, payload);
        }
    }

    removeTrade(id: number): Observable<Object> {
        return this.http.delete(`${environment.serverApi}/trades/${id}`);
    }

    getRandomProfit(min: number = 10, max: number = 100000): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
