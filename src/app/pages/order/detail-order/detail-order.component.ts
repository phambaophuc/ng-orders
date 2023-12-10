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
            .reduce((sum: number, foodItem: { foodPrice: number; quantity: number; options: { optionList: { price: number; }[] }[] }) => {
                // Tính tổng số tiền từ giá và số lượng của món ăn
                sum += foodItem.foodPrice * foodItem.quantity;

                // Kiểm tra và tính giá từ options
                if (foodItem.options && foodItem.options.length > 0) {
                    foodItem.options.forEach(option => {
                        if (option.optionList && option.optionList.length > 0) {
                            option.optionList.forEach(optionItem => {
                                sum += optionItem.price * foodItem.quantity;
                            });
                        }
                    });
                }

                return sum;
            }, 0);
    }
}
