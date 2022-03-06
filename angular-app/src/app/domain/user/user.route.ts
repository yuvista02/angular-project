import { Routes } from '@angular/router';
import { UserEditPageComponent } from './user-edit-page/user-edit-page.component';
import { UserListPageComponent } from './user-list-page/user-list-page.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UserListPageComponent,
  },
  {
    path: 'add',
    component: UserEditPageComponent,
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: ':entityID/edit',
    component: UserEditPageComponent,
    // canDeactivate: [CanDeactivateGuard]
  },
];
