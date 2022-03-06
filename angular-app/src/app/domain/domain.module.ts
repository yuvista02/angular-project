import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListPageComponent } from './user/user-list-page/user-list-page.component';
import { UserEditPageComponent } from './user/user-edit-page/user-edit-page.component';
import { UserTableComponent } from './user/user-table/user-table.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserEditPageComponent,
    // UserListPageComponent,
    UserTableComponent,
    UserFormComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class DomainModule {}
