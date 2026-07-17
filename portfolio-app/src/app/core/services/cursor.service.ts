import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type CursorState = 'default' | 'pointer' | 'text' | 'hidden' | 'magnet';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private stateSubject = new BehaviorSubject<CursorState>('default');
  private textSubject = new BehaviorSubject<string>('');
  
  public state$ = this.stateSubject.asObservable();
  public text$ = this.textSubject.asObservable();

  public setState(state: CursorState): void {
    this.stateSubject.next(state);
  }

  public setText(text: string): void {
    this.textSubject.next(text);
  }

  public clearText(): void {
    this.textSubject.next('');
  }
}
