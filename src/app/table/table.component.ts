import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  users: IUser[] = [];
  loading = true;
  sortKey: string | null = null;
  sortValue: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.list().subscribe(users => {
      this.loading = false;
      this.users = users;
      console.log('users: ', users);
    });
  }

  sort(sort: { key: string, value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    // sort data
    if (this.sortKey) {
      const sortedUsers = this.users.sort((a, b) =>
        (this.sortValue === 'ascend')
          ? (a[this.sortKey] > b[this.sortKey] ? 1 : -1)
          : (b[this.sortKey] > a[this.sortKey] ? 1 : -1));
      this.users = [...sortedUsers];
    }
  }

  currentPageDataChange(event: IUser[]): void {
    // console.log('currentPageDataChange: ', event);
    // this.users = event;
  }
}