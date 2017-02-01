import { Routes, RouterModule } from '@angular/router';

import { WorkoutsComponent } from './workouts/workouts.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { CategoriesComponent } from './categories/categories.component';

import { WORKOUT_ROUTES } from './workouts/workouts.routes';
import { EXERCISE_ROUTES } from './exercises/exercises.routes';
import { CATEGORY_ROUTES } from './categories/categories.routes';

import { TestComponent } from './test/test.component';
import { ExerciseListComponent } from './exercises/exercise-list/exercise-list.component';


const APP_ROUTES: Routes = [
    { 
        path: '',
        redirectTo: 'workouts',
        pathMatch: 'full'
    },
    { 
        path: 'workouts',
        component: WorkoutsComponent, 
        children: WORKOUT_ROUTES 
    },

    // { 
    //     path: 'test',
    //     component: ExerciseListComponent, 
    //     outlet: 'test' 
    // },
    
    { 
        path: 'exercises',
        component: ExercisesComponent,
        children: EXERCISE_ROUTES
    },
    { 
        path: 'categories',
        component: CategoriesComponent,
        children: CATEGORY_ROUTES
    },
    {
        path: '**',                     // fallback route:
        redirectTo: 'workouts',
        pathMatch: 'full'
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

