import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css'],
})
export class UserEditPageComponent implements OnInit {
  public UserData: User[] = [];
  public ID!: number;
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getList();
  }

  private getList() {
    this._userService.GetById(this.ID).subscribe((res) => {
      this.UserData = res;
    });
  }
}
