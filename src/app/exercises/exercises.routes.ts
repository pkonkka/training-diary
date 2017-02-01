import { Routes } from '@angular/router';

import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';

export const EXERCISE_ROUTES: Routes = [
    { path: '',         component: ExerciseListComponent },
    { path: 'new',      component: ExerciseEditComponent},
    { path: ':id',      component: ExerciseDetailComponent },
    { path: ':id/edit', component: ExerciseEditComponent }
]