import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor() { }

    exportToExcel(data: any[], fileName: string): void {
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
}
