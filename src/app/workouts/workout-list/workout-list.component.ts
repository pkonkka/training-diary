// ========================================================================================================================
//
// Description: Show all or filtered workouts. 
//
// ========================================================================================================================
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

import { Workout } from '../../shared/model/workout';
import { WorkoutService } from '../../shared/model/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  allWorkouts: Workout[] = [];
  filtered: Workout[] = [];
  workoutSub: Subscription;
  isAscSorted = false;

  constructor(private workoutService: WorkoutService) { }

  // -----------------------------------------------------------------------------------------------------------------------
  ngOnInit() {


    this.workoutSub = this.workoutService.findAllWorkouts()
      .subscribe( 
        workouts => this.allWorkouts = this.filtered = workouts
      );

  }

  // -----------------------------------------------------------------------------------------------------------------------
  search(search: string) {

    this.filtered = this.allWorkouts.filter(function (workout) {

      let description = workout.description.toLowerCase();
      let name = workout.name.toLowerCase();
      search = search.toLowerCase();
      let retval = name.includes(search) || description.includes(search);

      return retval;
    });

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


  // -----------------------------------------------------------------------------------------------------------------------
  ngOnDestroy() {
    this.workoutSub.unsubscribe();
  }


}



