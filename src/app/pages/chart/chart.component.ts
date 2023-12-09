import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { ExcelService } from 'src/app/services/excel.service';
import { MatSelectModule } from '@angular/material/select';

export type ChartOptions = {
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    tooltip: ApexTooltip;
    labels: string[];
    colors: string[];
    legend: ApexLegend;
    fill: ApexFill;
    grid: ApexGrid;
    markers: ApexMarkers;
};

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    },
};

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        NgApexchartsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MomentDateModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule
    ],
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
    ]
})
export class ChartComponent implements OnInit {

    public chartOptions: any;
    public startDate?: Date;
    public endDate: Date = new Date();

    radioBtn: string = '2';
    selectedYear?: number;

    public years: number[] = Array.from({ length: new Date().getFullYear() - 2015 }, (_, i) => new Date().getFullYear() - i);

    constructor(
        private authService: AuthService,
        private invoiceService: InvoiceService,
        private excelService: ExcelService
    ) { }

    ngOnInit(): void {
        this.loadRevenueChart();
    }

    loadRevenueChart() {
        if (this.radioBtn === '1') {

        } else if (this.radioBtn === '2') {
            this.loadRevenueChartMonth();
            this.startDate = undefined;
        } else if (this.radioBtn === '3') {
            this.loadRevenueChartRange();
            this.selectedYear = undefined;
        }
    }

    loadRevenueChartRange() {
        const startDateObject = this.startDate!;
        const endDateObject = this.endDate;

        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.invoiceService.getInvoicesByShopId(user.shopId).subscribe((invoices) => {
                    const revenuePerDay = this.invoiceService
                        .calculateTotalRevenueInRange(invoices, startDateObject, endDateObject);

                    const data = Array.from(revenuePerDay.entries()).map(
                        ([date, revenue]) => ({ x: date, y: revenue })
                    );
                    const categories = Array.from(revenuePerDay.keys());

                    // Hiển thị biểu đồ
                    this.chartOptions = {
                        series: [
                            {
                                name: 'Revenue',
                                data: data,
                            },
                        ],
                        chart: {
                            type: 'line',
                            height: 450,
                        },
                        xaxis: {
                            type: 'category',
                            categories: categories,
                        },
                    };
                });
            }
        )
    }

    loadRevenueChartMonth() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.invoiceService.getInvoicesByShopId(user.shopId).subscribe((invoices) => {
                    const revenuePerMonth = this.invoiceService
                        .calculateTotalRevenuePerMonth(invoices, this.selectedYear!);

                    const data = Array.from(revenuePerMonth.entries())
                        .map(([monthYear, revenue]) => ({ x: monthYear, y: revenue }));
                    const categories = Array.from(revenuePerMonth.keys());
                    this.chartOptions = {
                        series: [
                            {
                                name: 'Revenue',
                                data: data,
                            },
                        ],
                        chart: {
                            type: 'line',
                            height: 450,
                        },
                        xaxis: {
                            type: 'category',
                            categories: categories
                        },
                    };
                });
            }
        )
    }

    exportRevenueToExcel() {
        if (this.radioBtn === '1') {

        } else if (this.radioBtn === '2') {
            this.exportMonthlyToExcel();
        } else if (this.radioBtn === '3') {
            this.exportRangeDateToExcel();
        }
    }

    // Xuất thống kê theo khoảng thời gian
    exportRangeDateToExcel() {
        const startDateObject = this.startDate!;
        const endDateObject = this.endDate;

        if (startDateObject && endDateObject) {
            this.authService.getCurrentUser().subscribe(
                (user: any) => {
                    this.invoiceService.getInvoicesByShopId(user.shopId)
                        .subscribe((invoices) => {
                            const revenuePerDay = this.invoiceService
                                .calculateTotalRevenueInRange(invoices, startDateObject, endDateObject);

                            this.excelService.exportRangeRevenueDataToExcel(revenuePerDay, startDateObject, endDateObject);
                        })
                }
            )
        } else {
            alert('Vui lòng chọn ngày!');
        }
    }

    // Xuất thống kê từng tháng trong năm
    exportMonthlyToExcel() {
        if (this.selectedYear) {
            this.authService.getCurrentUser().subscribe(
                (user: any) => {
                    this.invoiceService.getInvoicesByShopId(user.shopId)
                        .subscribe((invoices) => {
                            const revenuePerMonth = this.invoiceService
                                .calculateTotalRevenuePerMonth(invoices, this.selectedYear!);

                            // Xuất dữ liệu ra Excel
                            this.excelService.exportMonthlyRevenueToExcel(revenuePerMonth, this.selectedYear!);
                        })
                }
            )
        } else {
            alert('Vui lòng chọn năm!');
        }
    }
}
