import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { UserModule }     from 'src/app/domain/user/user.module';
import { SharedModule }   from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, UserModule],
})
export class DomainModule {}
