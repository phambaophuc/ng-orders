import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
    ApexAxisChartSeries,
    ApexNonAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexYAxis,
    ApexLegend,
    ApexFill,
    ApexGrid,
    ApexPlotOptions,
    ApexTooltip,
    ApexMarkers,
    NgApexchartsModule
} from 'ng-apexcharts';
import { Status } from 'src/app/common/status.enum';
import { AuthService } from 'src/app/services/auth.service';
import { FoodService } from 'src/app/services/food.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { OrderService } from 'src/app/services/order.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

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

@Component({
    selector: 'app-dash-analytics',
    standalone: true,
    imports: [CommonModule, SharedModule, NgApexchartsModule],
    templateUrl: './dash-analytics.component.html',
    styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent {

    totalOrder: number = 0;
    totalOrderCompleted: number = 0;

    totalFood: number = 0;
    totalInvoice: number = 0;
    totalInvoiceThisMonth: number = 0;

    public chartOptions: any;

    constructor(
        private authService: AuthService,
        private orderService: OrderService,
        private foodService: FoodService,
        private invoiceService: InvoiceService,
        private router: Router
    ) {
        this.loadRevenueChart();

        this.calculateTotalQuantityFood();
        this.calculateTotalQuantityInvoice();
        this.calculateTotalQuantityInvoiceThisMonth();
        this.calculateTotalQuantityOrder();
        this.calculateTotalQuantityOrderCompleted();
    }

    loadRevenueChart() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.invoiceService.getInvoicesThisMonth(user.shopId)
                    .subscribe((invoices) => {
                        const revenuePerDay = this.invoiceService.calculateTotalRevenuePerDay(invoices);

                        this.chartOptions = {
                            series: [
                                {
                                    name: 'Revenue',
                                    data: Array.from(revenuePerDay.values()),
                                },
                            ],
                            chart: {
                                type: 'line',
                                height: 350,
                            },
                            xaxis: {
                                categories: Array.from(revenuePerDay.keys())
                                    .map(date => date.split('/').slice(0, 2).join('/')),
                            }
                        };
                    })
            }
        )
    }

    calculateTotalQuantityFood() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.foodService.getFoodsByShopId(user.shopId)
                    .subscribe(foods => {
                        this.totalFood = foods.length;
                    });
            }
        );
    }

    calculateTotalQuantityInvoice() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.invoiceService.getInvoicesByShopId(user.shopId)
                    .subscribe(invoices => {
                        this.totalInvoice = invoices.length;
                    });
            }
        );
    }

    calculateTotalQuantityInvoiceThisMonth() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.invoiceService.getInvoicesThisMonth(user.shopId)
                    .subscribe(invoices => {
                        this.totalInvoiceThisMonth = invoices.length;
                    });
            }
        );
    }

    calculateTotalQuantityOrder() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.orderService.getOrdersByShopId(user.shopId)
                    .subscribe(orders => {
                        this.totalOrder = orders.length;
                    });
            }
        );
    }

    calculateTotalQuantityOrderCompleted() {
        this.authService.getCurrentUser().subscribe(
            (user: any) => {
                this.orderService.getOrdersByShopIdAndStatus(user.shopId, Status.COMPLETED)
                    .subscribe(orders => {
                        this.totalOrderCompleted = orders.length;
                    });
            }
        );
    }

    goToPage(url: string) {
        this.router.navigate([url]);
    }
}
