import { Component } from '@angular/core';
import {  MatDialogRef } from '@angular/material';


@Component({
    selector: 'confirmation-dialog',
    templateUrl: 'confirmation-dialog.html',
  })
  export class ConfirmationDialog {

    constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>) { }

    onYesClick(): void {
      this.dialogRef.close(true);
    }

    onNoClick(): void {
    this.dialogRef.close(false);
    }

  }
