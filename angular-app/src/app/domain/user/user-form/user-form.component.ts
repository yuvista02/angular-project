import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators }        from '@angular/forms';
import { ValidatorService }               from 'angular-iban';
import { User }                           from 'src/app/domain/models/user.model';
import { UserService }                    from 'src/app/domain/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() public ID!: number;
  @Input() public UserData: User[] = [];
  @Output() private OnClickCloseBtn: EventEmitter<User> = new EventEmitter();

  public ParentForm!: any;
  public userModelObj: User = new User();
  public searchFieldTextValue: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent() {
    if (this.ID) {
      this.getList();
    } else {
      this.doInitializeFormControls();
    }
  }

  private getList() {
    this._userService.GetById(this.ID).subscribe((res) => {
      this.UserData = res;
      this.doInitializeFormControls();
    });
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
        this.ParentForm.reset();
        this.OnClickCloseBtn.emit();
      },
      (err) => alert('Something went wrong')
    );
  }

  public OnClickCancel() {
    this.resetForm();
    this.OnClickCloseBtn.emit();
  }

  private resetForm() {
    this.ID = 0;
    this.ParentForm.reset();
  }

  get f() {
    return this.ParentForm.controls;
  }
}
