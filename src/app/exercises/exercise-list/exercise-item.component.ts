import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Category } from '../../shared/model/category';
import { Exercise } from '../../shared/model/exercise';
import { ExerciseService } from '../../shared/model/exercise.service';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.css']
})
export class ExerciseItemComponent implements OnInit, OnDestroy {
  @Input() exercise: Exercise;
  @Input() exerciseId: number;

  private exerciseSub: Subscription;
  private relatedCategpries: Category[];

  constructor(private exerciseService: ExerciseService) { 

  }

  ngOnInit() {
  
    this.exerciseSub = this.exerciseService.findAllCategoriesForExercise(this.exercise.url)
      .subscribe(
        categories => this.relatedCategpries = categories
      );

  }

  ngOnDestroy() {
    this.exerciseSub.unsubscribe();
  }

}
