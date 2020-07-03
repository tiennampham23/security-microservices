import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
export enum MessageType {
  Create,
  Read,
  Update,
  Delete
}
@Injectable({
  providedIn: 'root'
})
export class LayoutUtilsService {

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) { }
}
