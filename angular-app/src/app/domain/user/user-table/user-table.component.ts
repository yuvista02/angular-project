import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  @Output() itemClick: EventEmitter<User> = new EventEmitter();
  @Output() reloadList: EventEmitter<User> = new EventEmitter();
  @Input() userList: User [] = [];

  public searchFieldTextValue: any;
  constructor(private dialog: MatDialog, private _userService: UserService) {}

  ngOnInit(): void {}
  public filterKey!: string;
  public reverse: boolean = false;

  public Search() {
    if (this.searchFieldTextValue == '') {
      this.ngOnInit();
    } else {
      this.userList = this.userList.filter((a) => {
        return a.accountHolder
          .toLocaleLowerCase()
          .match(this.searchFieldTextValue.toLocaleLowerCase());
      });
    }
  }

  OnClickSort(value: string) {
    this.filterKey = value;
    this.reverse = !this.reverse;
  }

  public OnClickEdit(row: User) {
    this.itemClick.emit(row);
  }

  public DeleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Are you sure you want to delete ${user.accountHolder}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onDeleteConfirmed(user);
      }
    });
  }

  private onDeleteConfirmed(user: User) {
    this._userService.Remove(user).subscribe(
      (res) => {
        alert('Removed Successfully.');
        this.reloadList.emit();
      },
      (err) => alert('Something went wrong')
    );
  }
}
