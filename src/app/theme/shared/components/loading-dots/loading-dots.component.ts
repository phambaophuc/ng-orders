import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading-dots',
    templateUrl: './loading-dots.component.html',
    styleUrls: ['./loading-dots.component.scss']
})
export class LoadingDotsComponent {
    @Input() isLoading: boolean = false;
}
