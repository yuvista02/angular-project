import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog }                      from '@angular/material/dialog';
import { ConfirmationDialogComponent }    from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User }                           from 'src/app/domain/models/user.model';
import { UserService }                    from 'src/app/domain/services/user.service';
import { UserEditPageComponent }          from 'src/app/domain/user/user-edit-page/user-edit-page.component';
import { MatTableDataSource }             from '@angular/material/table';
import { MatSort }                        from '@angular/material/sort';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  providers: [MatDialog],
})
export class UserTableComponent implements  AfterViewInit, OnInit {
  @Output() reloadList: EventEmitter<User> = new EventEmitter();
  @Input() UserList: User[] = [];
  
  public UserListMat!: MatTableDataSource<any> ;
  displayedColumns: string[] = ['accountHolder', 'iban', 'date', 'amount', 'note', 'actions']

  public filterKey!: any;
  public reverse: boolean = false;

  @ViewChild(MatSort) matSort! : MatSort;

  constructor(private dialog: MatDialog, private _userService: UserService) {}

  ngOnInit(): void {
    if(this.UserList && this.UserList.length){
      this.UserListMat = new MatTableDataSource(this.UserList);
      this.UserListMat.sort = this.matSort;  
    }
  }

  ngAfterViewInit() {
    if(this.UserList && this.UserList.length){
      this.UserListMat = new MatTableDataSource(this.UserList);
      this.UserListMat.sort = this.matSort;  
    }
  }

  OnClickSort(value: string) {
    this.filterKey = Number(value);
    this.reverse = !this.reverse;
  }

  OnFilterData(event: any){
    this.UserListMat.filter = event.target.value;
  }

  public OnClickEdit(row: User) {
    const dialogRef = this.dialog.open(UserEditPageComponent, {
      width: '450px',
      height: '750px',
      data: { id: row.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadList.emit();
    });
  }

  public OnClickBtnCreate() {
    const dialogRef = this.dialog.open(UserEditPageComponent, {
      width: '500px',
      data: { id: null },
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
