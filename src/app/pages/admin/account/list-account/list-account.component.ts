import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-list-account',
    templateUrl: './list-account.component.html',
    styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent {

    users: any[] = [];
    currentPage: number = 1;

    itemsPerPageOptions: number[] = [10, 20, 50, 100];
    itemsPerPage: number = this.itemsPerPageOptions[0];

    constructor(
        private userService: UserService
    ) {
        this.getAllUsers();
    }

    getAllUsers() {
        this.userService.getUsers().subscribe(
            (users) => {
                this.users = users;
            }
        )
    }
}
