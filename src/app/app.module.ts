import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { firebaseConfig, authConfig} from "../environments/firebase.config";
import { AngularFireModule} from "angularfire2/index";

import 'rxjs/Rx';

import { HeaderComponent } from './header/header.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutListComponent } from './workouts/workout-list/workout-list.component';
import { WorkoutItemComponent } from './workouts/workout-list/workout-item.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { DropdownDirective } from './dropdown.directive';

import { LogService } from './log.service';
import { WorkoutService } from './shared/model/workout.service';
import { ExerciseService } from './shared/model/exercise.service';
import { CategoryService } from './shared/model/category.service';
import { ValidationService } from './shared/validation.service';


import { routing } from './app.routing';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';
// import { WorkoutStartComponent } from './workouts/workout-start.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';
import { ExerciseEditComponent } from './exercises/exercise-edit/exercise-edit.component';
import { ExerciseListComponent } from './exercises/exercise-list/exercise-list.component';
import { WorkoutHistoryComponent } from './workouts/workout-history/workout-history.component';
import { ExerciseItemComponent } from './exercises/exercise-list/exercise-item.component';
import { ExerciseSubListComponent } from './exercises/exercise-list/exercise-sub-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryItemComponent } from './categories/category-list/category-item.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';

import { CanWorkoutEditDeactivate } from './workouts/workout-edit/workout-edit-deactivate.guard';
import { CanWorkoutEditActivate } from './workouts/workout-edit/workout-edit-activate.guard';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorkoutsComponent,
    WorkoutListComponent,
    WorkoutItemComponent,
    WorkoutDetailComponent,
    ExercisesComponent,
    DropdownDirective,
    WorkoutEditComponent,
    // WorkoutStartComponent,
    ExerciseDetailComponent,
    ExerciseEditComponent,
    ExerciseListComponent,
    WorkoutHistoryComponent,
    ExerciseItemComponent,
    ExerciseSubListComponent,
    CategoryListComponent,
    CategoryItemComponent,
    CategoriesComponent,
    CategoryEditComponent,
    CategoryDetailComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    LogService, 
    WorkoutService, 
    ExerciseService, 
    CategoryService, 
    ValidationService, 
    CanWorkoutEditDeactivate, 
    CanWorkoutEditActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
