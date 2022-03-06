import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserEditPageComponent } from './user-edit-page/user-edit-page.component';
import { UserListPageComponent } from './user-list-page/user-list-page.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    UserListPageComponent,
    UserTableComponent,
    UserEditPageComponent,
    UserFormComponent,
  ],
  imports: [CommonModule, SharedModule],
  entryComponents: [UserEditPageComponent, UserFormComponent],
})
export class UserModule {}
