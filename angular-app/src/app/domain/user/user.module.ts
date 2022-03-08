import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS }   from '@angular/material/dialog';
import { SharedModule }                 from 'src/app/shared/shared.module';

import { UserEditPageComponent }        from 'src/app/domain/user/user-edit-page/user-edit-page.component';
import { UserTableComponent }           from 'src/app/domain/user/user-table/user-table.component';
import { UserFormComponent }            from 'src/app/domain/user/user-form/user-form.component';
import { UserListPageComponent }        from 'src/app/domain/user/user-list-page/user-list-page.component';

@NgModule({
  declarations: [
    UserListPageComponent,
    UserTableComponent,
    UserEditPageComponent,
    UserFormComponent,
  ],
  imports: [CommonModule, SharedModule],
  entryComponents: [UserEditPageComponent, UserFormComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
})
export class UserModule {}
