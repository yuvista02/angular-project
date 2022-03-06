import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ValidatorService } from 'angular-iban';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css'],
})
export class UserListPageComponent implements OnInit {
  public ParentForm!: any;

  private id: number = 0;

  public userModelObj: User = new User();
  public userList: User[] = [];
  public searchFieldTextValue: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.doInitializeFormControls();
    this.getList();
  }

  // Table Loading/Sorting / Filtering
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

  private getList() {
    this._userService.GetList().subscribe((res) => {
      this.userList = res;
    });
  }

  // Add/ Edit Form
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
  }

  get f() {
    return this.ParentForm.controls;
  }

  Save() {
    if (!this.ParentForm.valid) {
      this.ParentForm.submitting = true;
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

  public OnClickCreate() {
    this.resetForm();
  }

  public OnClickCancel() {
    this.resetForm();
  }

  private resetForm() {
    this.id = 0;
    this.ParentForm.reset();
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
        this.getList();
      },
      (err) => alert('Something went wrong')
    );
  }

  public OnClickEdit(row: User) {
    this.id = row.id;
    this.ParentForm.patchValue(row);
  }
}
