import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/iuser';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  usersPerPage = 4;
  tableSize = 'middle';

  users: IUser[] = [];
  loading = true;
  todosModalVisible = false;
  sortKey: string | null = null;
  sortValue: string | null = null;

  constructor(
    private modalService: NzModalService,
    private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.todosModalVisible = false;
    this.userService.list().subscribe(users => {
      this.loading = false;
      this.users = [...users, ...users, ...users, ...users, ...users, ...users]; // TODO: fix it
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

  handleShowTodos(user): void {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: `${user.name} uncompleted todos:`,
      nzContent: InfoModalComponent,
      nzComponentParams: { user },
      nzFooter: null
    });
  }

  getCurrentPageIndicator(userId: string) {
    return `${userId} of ${this.usersPerPage}`;
  }
}
