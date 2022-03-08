import { Component, OnInit }            from '@angular/core';
import { MatDialog }                    from '@angular/material/dialog';

import { User }                         from 'src/app/domain/models/user.model';
import { UserService }                  from 'src/app/domain/services/user.service';
import { UserEditPageComponent }        from 'src/app/domain/user/user-edit-page/user-edit-page.component';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css'],
})
export class UserListPageComponent implements OnInit {
  public ParentForm!: any;
  public UserList: User[] = [];
  public SearchFieldTextValue: any;

  public Loading:boolean = true;

  constructor(private _userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getList();
  }

  private getList() {
    this.Loading = true;
    this._userService.GetList().subscribe((res) => {
      this.UserList = res;
      this.Loading = false;
    });
  }

  public Search() {
    if (this.SearchFieldTextValue == '') {
      this.ngOnInit();
    } else {
      this.UserList = this.UserList.filter((a) => {
        return a.accountHolder
          .toLocaleLowerCase()
          .match(this.SearchFieldTextValue.toLocaleLowerCase());
      });
    }
  }

  public ReloadList() {
    this.getList();
  }
}
