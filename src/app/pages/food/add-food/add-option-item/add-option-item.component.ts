import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-option-item',
    templateUrl: './add-option-item.component.html',
    styleUrls: ['./add-option-item.component.scss']
})
export class AddOptionItemComponent {

    selectedImage: File | null = null;
    selectedImageSrc: string | null = null;

    constructor(
        public dialogRef: MatDialogRef<AddOptionItemComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onClick(): void {
        if (this.selectedImage) {
            this.dialogRef.close({ image: this.selectedImage });
        } else {

        }
    }

    onImageSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            this.selectedImageSrc = imageUrl;
            this.selectedImage = file;
        }
    }
}
