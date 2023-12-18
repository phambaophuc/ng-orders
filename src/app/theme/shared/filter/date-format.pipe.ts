import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
    transform(timestamp: number): string {
        const date = new Date(timestamp);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true } as Intl.DateTimeFormatOptions;

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}
