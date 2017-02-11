import { Component, Input, OnInit } from '@angular/core';

import { Workout } from '../../shared/model/workout';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.css']
})
export class WorkoutItemComponent implements OnInit {
  @Input() workout: Workout;
  @Input() workoutId: number;

  exerciseCount: Number;

  ngOnInit() {

    this.exerciseCount = _.values(this.workout.exercises).length;

  }

  // -----------------------------------------------------------
  toDate() {
    return moment(this.workout.modifiedAt).format('DD.MM.YYYY');
  }

}
