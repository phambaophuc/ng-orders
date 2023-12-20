import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Voucher } from 'src/app/common/voucher';
import { AuthService } from 'src/app/services/auth.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { ConfirmDialogComponent } from 'src/app/theme/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-voucher',
    templateUrl: './voucher.component.html',
    styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

    vouchers: Voucher[] = [];

    constructor(
        private authService: AuthService,
        private voucherService: VoucherService,
        private toastr: ToastrService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getVouchers();
    }

    getVouchers() {
        this.authService.getCurrentUser().subscribe((user: any) => {
            this.voucherService.getVouchersByShopId(user.shopId)
                .subscribe(vouchers => {
                    this.vouchers = vouchers;
                    console.log(vouchers);
                });
        });
    }

    isEndDatePast(endDate: string): boolean {
        const currentDate = new Date();
        const endDateParts = endDate.split('/');
        const voucherEndDate = new Date(
            +endDateParts[2],
            +endDateParts[1] - 1,
            +endDateParts[0]
        );
        return voucherEndDate < currentDate;
    }

    deleteVoucher(key: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Xoá Voucher?', message: 'Bạn có chắc muốn xoá Voucher này?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.voucherService.deleteVoucher(key).then(() => {
                    this.toastr.error('Voucher đã được xoá.', 'Xoá thành công!');
                }).catch(error => {
                    this.toastr.error(error.message, 'Error!');
                });
            }
        });
    }
}
