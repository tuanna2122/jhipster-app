import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaeldungappSharedModule } from '../../shared';
import { BaeldungappAdminModule } from '../../admin/admin.module';
import {
    PostService,
    PostPopupService,
    PostComponent,
    PostDetailComponent,
    PostDialogComponent,
    PostPopupComponent,
    PostDeletePopupComponent,
    PostDeleteDialogComponent,
    postRoute,
    postPopupRoute,
} from './';

const ENTITY_STATES = [
    ...postRoute,
    ...postPopupRoute,
];

@NgModule({
    imports: [
        BaeldungappSharedModule,
        BaeldungappAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PostComponent,
        PostDetailComponent,
        PostDialogComponent,
        PostDeleteDialogComponent,
        PostPopupComponent,
        PostDeletePopupComponent,
    ],
    entryComponents: [
        PostComponent,
        PostDialogComponent,
        PostPopupComponent,
        PostDeleteDialogComponent,
        PostDeletePopupComponent,
    ],
    providers: [
        PostService,
        PostPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaeldungappPostModule {}
