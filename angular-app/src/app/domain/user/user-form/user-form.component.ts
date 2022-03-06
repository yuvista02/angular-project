import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ValidatorService } from 'angular-iban';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() public ID!: number;
  @Input() public UserData: User[] = [];

  public ParentForm!: any;
  public userModelObj: User = new User();
  public searchFieldTextValue: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.doInitializeFormControls();
  }

  private doInitializeFormControls() {
    this.ParentForm = this._formBuilder.group({
      accountHolder: [],
      iban: ['', [Validators.required, ValidatorService.validateIban]],
      date: ['', [Validators.required]],
      amount: [
        '',
        [Validators.required, Validators.maxLength(8), Validators.minLength(2)],
      ],
      note: [],
    });
    this.ParentForm.patchValue(this.UserData);
  }

  get f() {
    return this.ParentForm.controls;
  }

  public Save() {
    if (!this.ParentForm.valid) {
      this.ParentForm.submitting = true;
      alert('Please complete all fields as indicated.');
      return;
    }

    (this.ID
      ? this._userService.Update(this.ParentForm.value, this.ID)
      : this._userService.Create(this.ParentForm.value)
    ).subscribe(
      (res) => {
        alert('Operation Successful.');

        let ref = document.getElementById('cancel');
        ref?.click();

        this.ParentForm.reset();
        // this.getList();
      },
      (err) => alert('Something went wrong')
    );
  }

  public OnClickCancel() {
    this.resetForm();
  }

  private resetForm() {
    this.ID = 0;
    this.ParentForm.reset();
  }
}
