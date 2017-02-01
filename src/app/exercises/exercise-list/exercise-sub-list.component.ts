import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/model/category';
import { Exercise } from '../../shared/model/exercise';
import { ExerciseService } from '../../shared/model/exercise.service';

@Component({
  selector: 'app-exercise-sub-list',
  templateUrl: './exercise-sub-list.component.html',
  styleUrls: ['./exercise-sub-list.component.css']
})
export class ExerciseSubListComponent implements OnInit {


  @Input() category: Category;     // category from the parent component - exercise-list.component

  allExercises: Exercise[];
  filtered: Exercise[];


  // -----------------------------------------------------------------------------
  constructor(private exerciseService: ExerciseService) { }


  // -----------------------------------------------------------------------------
  ngOnInit() {

    // this.exerciseService.findAllExercisesForCategory(this.category.url)
    //   .do(console.log)
    //   .subscribe(
    //     exercises => {
    //       this.allExercises = this.filtered = exercises;
    //     });
        
  }

  // -----------------------------------------------------------------------------
  searchExercise(s: string) {

    console.log('sub-list: ', s);
    // this.filtered = this.allExercises.filter(function (exercise) {
    //   let note = exercise.note.toLowerCase();
    //   let name = exercise.name.toLowerCase();

    //   search = search.toLowerCase();
    //   let retval = name.includes(search) || note.includes(search);

    //   return retval;
    // });

  }




}