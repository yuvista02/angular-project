import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditPageComponent } from './domain/user/user-edit-page/user-edit-page.component';
import { UserFormComponent } from './domain/user/user-form/user-form.component';
import { UserListPageComponent } from './domain/user/user-list-page/user-list-page.component';

const routes: Routes = [
  { path:'listview', component: UserListPageComponent },
  { path:'add', component: UserEditPageComponent},
  { path:':userID/edit', component: UserEditPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
