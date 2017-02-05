import { Component, Input } from '@angular/core';

import { Workout } from '../../shared/model/workout';
import * as moment from 'moment';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.css']
})
export class WorkoutItemComponent {
  @Input() workout: Workout;
  @Input() workoutId: number;

  // -----------------------------------------------------------
  toDate() {
    return moment(this.workout.modifiedAt).format('DD.MM.YYYY');
  }

}
