import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-option-dialog',
    templateUrl: './option-dialog.component.html',
    styleUrls: ['./option-dialog.component.scss']
})
export class OptionDialogComponent {

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<OptionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
