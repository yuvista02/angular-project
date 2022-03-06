import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditPageComponent } from './domain/user/user-edit-page/user-edit-page.component';
import { UserFormComponent } from './domain/user/user-form/user-form.component';
import { UserListPageComponent } from './domain/user/user-list-page/user-list-page.component';
import { usersRoutes } from './domain/user/user.route';

// const routes: Routes = [
//   { path: 'users', component: UserListPageComponent },
//   { path: 'add', component: UserEditPageComponent },
//   { path: ':userID/edit', component: UserEditPageComponent },
// ];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', children: [...usersRoutes] },
      { path: 'users', children: [...usersRoutes] },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
