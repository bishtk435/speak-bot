import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastMsgService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  showToastMessage(msg: string, action: string = 'Close', duration: number = 5000): void {
    this._snackBar.open(msg, action, {duration});
  }
}
