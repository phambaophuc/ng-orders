import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-map-dialog',
    templateUrl: './map-dialog.component.html',
    styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { googleMapUrl: string },
        public sanitizer: DomSanitizer
    ) { }
}
