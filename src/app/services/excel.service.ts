import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as XLSXJSStyle from 'xlsx-js-style';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor() { }

    exportInvoiceToExcel(data: any[], fileName: string): void {
        const sanitizedData = this.sanitizeData(data);
        const columnHeaders = ['Tên Khách Hàng', 'Số Điện Thoại', 'Địa Chỉ', 'Tổng Tiền', 'Ngày Tạo'];

        const formattedData = sanitizedData.map((invoice) => ({
            'Tên Khách Hàng': invoice.name,
            'Số Điện Thoại': invoice.phoneNumber,
            'Địa Chỉ': invoice.address,
            'Tổng Tiền': invoice.totalPrice,
            'Ngày Tạo': invoice.createdDate,
        }));

        // Tạo đối tượng WorkSheet từ mảng dữ liệu
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData, { header: columnHeaders });

        // Tính toán chiều rộng của từng cột
        const columnWidths = this.calculateColumnWidths(ws);

        // Đặt chiều rộng của từng cột
        ws['!cols'] = columnWidths.map(width => ({ width }));

        // Tạo đối tượng WorkBook và thêm WorkSheet vào đó
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Xuất file Excel
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }

    private sanitizeData(data: any[]): any[] {
        return data.map(item => {
            const { key, food, shopId, userId, ...sanitizedItem } = item;
            return sanitizedItem;
        });
    }

    private calculateColumnWidths(ws: XLSX.WorkSheet): number[] {
        const columnWidths: number[] = [];

        // Duyệt qua từng dòng và từng ô để tính toán chiều rộng
        XLSX.utils.sheet_to_json(ws, { header: 1 }).forEach((row: any) => {
            row.forEach((cell: any, colIndex: any) => {
                const cellValue = cell && cell.toString() || '';
                const cellLength = this.getStringVisualLength(cellValue);

                if (!columnWidths[colIndex] || cellLength > columnWidths[colIndex]) {
                    columnWidths[colIndex] = cellLength;
                }
            });
        });

        return columnWidths;
    }

    private getStringVisualLength(str: string): number {
        return str.length;
    }

    exportRangeRevenueDataToExcel(data: Map<string, number>, startDate: Date, endDate: Date) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.convertMapToArray(data));
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        const startDateFormat = this.formatDate(startDate);
        const endDateFormat = this.formatDate(endDate);

        const fileName = `revenue_data_${startDateFormat}_${endDateFormat}.xlsx`;

        XLSX.writeFile(workbook, fileName);
    }

    private convertMapToArray(map: Map<string, number>): any[] {
        return Array.from(map.entries()).map(([date, value]) => ({ Date: date, Value: value }));
    }

    formatDate(date: Date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    exportMonthlyRevenueToExcel(data: Map<string, number>, selectedYear: number) {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.convertMapToArray(data));
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        const fileName = `monthly_revenue_${selectedYear}.xlsx`;

        XLSX.writeFile(workbook, fileName);
    }

    readFileDataFood(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const workbook = XLSX.read(e.target.result, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });
                resolve(jsonData);
            };

            reader.onerror = (error) => reject(error);

            reader.readAsBinaryString(file);
        });
    }

    downloadSampleDataFoodExcel(shopId: string) {
        const data = [
            {
                shopId: shopId,
                foodName: 'Sample Food',
                foodDescription: 'Sample Description',
                foodImage: 'Sample Image URL',
                foodType: 'Sample Type',
                foodPrice: 10000,
                sectionId: 'Sample Section ID(mã số phần ăn -1)',
                isOutOfStock: false
            },
        ];

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

        // Thiết lập độ rộng của cột A
        const columnCount = XLSX.utils.decode_range(ws['!ref']!).e.c + 1;
        ws['!cols'] = [];
        for (let i = 0; i < columnCount; i++) {
            ws['!cols'].push({ wch: 25 });
        }

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Tạo Blob từ workbook với type là 'array'
        const blob = XLSXJSStyle.write(wb, { bookType: 'xlsx', type: 'array' });

        // Tạo URL từ Blob và tải về
        const url = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample-data.xlsx';
        a.click();
    }
}
