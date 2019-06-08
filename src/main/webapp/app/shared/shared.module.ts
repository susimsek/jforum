import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JforumSharedLibsModule, JforumSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [JforumSharedLibsModule, JforumSharedCommonModule],
  declarations: [HasAnyAuthorityDirective],
  exports: [JforumSharedCommonModule, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JforumSharedModule {
  static forRoot() {
    return {
      ngModule: JforumSharedModule
    };
  }
}
