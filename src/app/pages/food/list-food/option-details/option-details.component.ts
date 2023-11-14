import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-option-details',
    templateUrl: './option-details.component.html',
    styleUrls: ['./option-details.component.scss']
})
export class OptionDetailsComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
