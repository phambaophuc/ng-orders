import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-section-dialog',
    templateUrl: './add-section-dialog.component.html',
    styleUrls: ['./add-section-dialog.component.scss']
})
export class AddSectionDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<AddSectionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    isFormValid(): boolean {
        return this.data.section.sectionName;
    }
}
