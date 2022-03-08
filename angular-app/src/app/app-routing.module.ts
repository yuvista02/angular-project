import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { usersRoutes }        from 'src/app/domain/user/user.route';

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
