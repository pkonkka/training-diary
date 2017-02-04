import { Component, OnInit, Input } from '@angular/core';

import { Exercise } from '../../shared/model/exercise';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.css']
})
export class ExerciseItemComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() exerciseId: number;

  constructor() { 


  }

  ngOnInit() {
  }

}
