import { Component, Inject, OnInit }      from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }  from '@angular/material/dialog';
import { User }                           from 'src/app/domain/models/user.model';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css'],
})
export class UserEditPageComponent implements OnInit {
  public UserData: User[] = [];
  public ID!: number;
  public Loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserEditPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.ID = this.data.id;
  }

  OnClickClose() {
    this.dialogRef.close();
  }
}
