import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css'],
})
export class UserListPageComponent implements OnInit {
  public ParentForm!: FormGroup;

  private id: number = 0;

  public userModelObj: User = new User();
  public userList: User[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.doInitializeFormControls();
    this.getList();
  }

  private getList() {
    this._userService.GetList().subscribe((res) => {
      this.userList = res;
    });
  }

  private doInitializeFormControls() {
    this.ParentForm = this._formBuilder.group({
      accountHolder: ['', [Validators.required]],
      iban: ['', [Validators.required]],
      date: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      note: [],
    });
  }

  get f() {
    return this.ParentForm.controls;
  }

  Save() {
    if (!this.ParentForm.valid) {
      alert('Please complete all fields as indicated.');
      return;
    }

    (this.id
      ? this._userService.Update(this.ParentForm.value, this.id)
      : this._userService.Create(this.ParentForm.value)
    ).subscribe(
      (res) => {
        alert('Operation Successful.');

        let ref = document.getElementById('cancel');
        ref?.click();

        this.ParentForm.reset();
        this.getList();
      },
      (err) => alert('Something went wrong')
    );
  }

  OnClickCancel() {
    this.id = 0;
    this.ParentForm.reset();
  }

  DeleteUser(user: User) {
    this._userService.Remove(user).subscribe(
      (res) => {
        alert('Removed Successfully.');
        this.getList();
      },
      (err) => alert('Something went wrong')
    );
  }

  OnClickEdit(row: User) {
    this.id = row.id;
    this.ParentForm.patchValue(row);
  }
}
