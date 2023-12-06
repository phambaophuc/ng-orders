import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';

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
        MomentDateModule
    ],
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
    ]
})
export class ChartComponent implements OnInit {

    public chartOptions: any;
    public startDate: Date = new Date();
    public endDate: Date = new Date();

    constructor(
        private authService: AuthService,
        private invoiceService: InvoiceService
    ) { }

    ngOnInit(): void {
        this.loadRevenueChart();
    }

    loadRevenueChart() {
        const startDateObject = this.startDate;
        const endDateObject = this.endDate;

        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.invoiceService.getInvoicesByShopId(user.shopId).subscribe((invoices) => {
                    const revenuePerDay = this.invoiceService
                        .calculateTotalRevenueInRange(invoices, startDateObject, endDateObject);
                    const categories = Array.from(revenuePerDay.keys());

                    // Hiển thị biểu đồ
                    this.chartOptions = {
                        series: [
                            {
                                name: 'Revenue',
                                data: Array.from(revenuePerDay.entries())
                                    .map(([date, revenue]) => ({ x: date, y: revenue })),
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
}
