import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-detail-order',
    templateUrl: './detail-order.component.html',
    styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
}
