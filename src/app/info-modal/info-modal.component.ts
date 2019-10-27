import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/iuser';
import { ITodo } from '../interfaces/itodo';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {
  @Input() user: IUser;

  userTodosList: ITodo[] = [];
  loading = true;

  constructor(private modal: NzModalRef, private userService: UserService) { }

  ngOnInit() {
    this.getLastTodos(this.user);
  }

  getLastTodos(user: IUser): void {
    this.userService.getLastTodos(user).subscribe(todos => {
      this.loading = false;
      this.userTodosList = [...todos];
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
