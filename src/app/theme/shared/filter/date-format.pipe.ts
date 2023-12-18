import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
    name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
    transform(timestamp: number): string {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    }
}
