import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog }                      from '@angular/material/dialog';
import { ConfirmationDialogComponent }    from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User }                           from 'src/app/domain/models/user.model';
import { UserService }                    from 'src/app/domain/services/user.service';
import { UserEditPageComponent }          from 'src/app/domain/user/user-edit-page/user-edit-page.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  providers: [MatDialog],
})
export class UserTableComponent implements OnInit {
  @Output() reloadList: EventEmitter<User> = new EventEmitter();
  @Input() UserList: User[] = [];

  public filterKey!: string;
  public reverse: boolean = false;

  constructor(private dialog: MatDialog, private _userService: UserService) {}

  ngOnInit(): void {}

  OnClickSort(value: string) {
    this.filterKey = value;
    this.reverse = !this.reverse;
  }

  public OnClickEdit(row: User) {
    const dialogRef = this.dialog.open(UserEditPageComponent, {
      width: '500px',
      data: { id: row.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadList.emit();
    });
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
