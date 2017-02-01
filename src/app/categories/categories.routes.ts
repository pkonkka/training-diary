import { Routes } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

export const CATEGORY_ROUTES: Routes = [
    { path: '',         component: CategoryListComponent },
    { path: 'new',      component: CategoryEditComponent},
    { path: ':id',      component: CategoryDetailComponent },
    { path: ':id/edit', component: CategoryEditComponent }
]