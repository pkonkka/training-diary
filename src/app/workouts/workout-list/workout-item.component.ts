import { Component, Input, OnInit } from '@angular/core';

import { Workout } from '../../shared/model/workout';
import * as moment from 'moment';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.css']
})
export class WorkoutItemComponent implements OnInit {
  @Input() workout: Workout;
  @Input() workoutId: number;

  modAt: string;

  constructor() {
  }

  ngOnInit() {
  }

  // -----------------------------------------------------------
  toDate(timestamp: string) {
    return moment(timestamp);
  }

}
