import { Routes } from '@angular/router';

import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { CanWorkoutEditDeactivate } from './workout-edit/workout-edit-deactivate.guard';
import { CanWorkoutEditActivate } from './workout-edit/workout-edit-activate.guard';


export const WORKOUT_ROUTES: Routes = [
    { 
        path: '',         
        component: WorkoutListComponent 
    },
    { 
        path: 'new',      
        component: WorkoutEditComponent,
        canActivate: [CanWorkoutEditActivate], 
        canDeactivate: [CanWorkoutEditDeactivate],
    },
    { 
        path: ':id',      
        component: WorkoutDetailComponent 
    },
    { 
        path: ':id/edit', 
        component: WorkoutEditComponent 
    },
    { 
        path: '**',       
        component: WorkoutListComponent 
    }
]