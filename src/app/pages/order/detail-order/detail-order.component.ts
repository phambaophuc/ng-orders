import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-detail-order',
    templateUrl: './detail-order.component.html',
    styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

    totalAmount: number = 0;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.calculateTotalAmount();
    }

    calculateTotalAmount() {
        this.totalAmount = this.data.foods
            .reduce((sum: number, item: { foodPrice: number; quantity: number; }) => sum + (item.foodPrice * item.quantity), 0);
    }
}
