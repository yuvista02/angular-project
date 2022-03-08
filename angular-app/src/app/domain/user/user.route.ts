import { Routes }                 from '@angular/router';
import { UserListPageComponent }  from 'src/app/domain/user/user-list-page/user-list-page.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UserListPageComponent,
  },
];
