import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Category } from '../../shared/model/category';
import { Exercise } from '../../shared/model/exercise';
import { ExerciseService } from '../../shared/model/exercise.service';

import * as _ from 'lodash';



@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  allExercises: Exercise[] = [];
  filtered: Exercise[] = [];

  exerciseSub: Subscription;
  allCategories: Category[] = [];

  isAscSorted = false;

  showSearch = false;
  
  // ----------------------------------------------------------------------------------------------------------------------
  constructor(private exerciseService: ExerciseService ) { 

  }

  // -----------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.exerciseSub = this.exerciseService.findAllExercises()
      .subscribe(
        exercises => {
          this.allExercises = this.filtered = exercises;
          this.sortAlphaAsc();
        });
  }

  
  // ------------------------------------------------------------------------------------------------------------------------
  searchExercise(search: string) {

    this.filtered = this.allExercises.filter(function (exercise) {
      const note = exercise.note.toLowerCase();
      const name = exercise.name.toLowerCase();

      search = search.toLowerCase();
      const retval = name.includes(search) || note.includes(search);

      return retval;
    });

  }


  // -----------------------------------------------------------------------------------------------------------------------
  toggleSearch() {
    if (this.showSearch) {
      this.showSearch = false;
    } else {
      this.showSearch = true;
    }
  }
  

  // ------------------------------------------------------------------------------------------------------------------------
  ngOnDestroy() {
    this.exerciseSub.unsubscribe();
  }


  // -----------------------------------------------------------------------------------------------------------------------
  sortAlphaAsc() {
    this.filtered =  _.sortBy(this.filtered, [function(o) { return o.name; }]);
    this.isAscSorted = true;
  }

  // -----------------------------------------------------------------------------------------------------------------------
  sortAlphaDesc() {
    this.filtered =  _.sortBy(this.filtered, [function(o) { return o.name; }]);
    this.filtered = _.reverse(this.filtered);
    this.isAscSorted = false;
  }


}
