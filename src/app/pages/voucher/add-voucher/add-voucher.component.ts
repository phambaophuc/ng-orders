import { Component } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Voucher } from 'src/app/common/voucher';
import { AuthService } from 'src/app/services/auth.service';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
    selector: 'app-add-voucher',
    templateUrl: './add-voucher.component.html',
    styleUrls: ['./add-voucher.component.scss']
})
export class AddVoucherComponent {

    voucher: Voucher = {};

    constructor(
        private voucherService: VoucherService,
        private toastr: ToastrService,
        private authService: AuthService
    ) { }

    getMaxValue(): number {
        return (this.voucher.voucherType === 'percent') ? 100 : Number.MAX_SAFE_INTEGER;
    }

    updateDiscountType() {
        if (this.voucher.voucherType === 'percent') {
            this.voucher.voucherType = 'percent';
        } else if (this.voucher.voucherType === 'amount') {
            this.voucher.voucherType = 'amount';
        }
    }

    convertDateString(dateString: string): string {
        const formattedDate = moment(dateString, 'ddd MMM DD YYYY HH:mm:ss ZZ').format('DD/MM/YYYY');
        return formattedDate;
    }

    createVoucher() {
        this.authService.getCurrentUser().subscribe((user: any) => {
            this.voucher.shopId = user.shopId;
            this.voucher.startDate = this.convertDateString(this.voucher.startDate!);
            this.voucher.endDate = this.convertDateString(this.voucher.endDate!);
            
            this.voucherService.createVoucher(this.voucher)
                .then(() => {
                    this.toastr.success('Tạo voucher thành công.', 'Thành công!');
                    this.voucher = {};
                })
                .catch(error => {
                    this.toastr.error(error.message, 'Error');
                });
        });
    }
}
