import { Location} from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Exercise } from '../../shared/model/exercise';
import { ExerciseService } from '../../shared/model/exercise.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit, OnDestroy {

  exercise:       Exercise;
  // exerciseForm: FormGroup;
  exerciseName:  string = '';
  exerciseUrl:    string;

  paramsSub: Subscription;

  // ---------------------------------------------------------------------------------
  constructor(
    private route: ActivatedRoute, 
    private exerciseService: ExerciseService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private location: Location) { 


    }

  // ---------------------------------------------------------------------------------
  ngOnInit() {

    this.exerciseUrl = this.route.snapshot.params['id'];

    this.paramsSub = this.route.queryParams.subscribe(
      params => {
        this.exerciseName = params['name'];
      }
    );

  }

  // ---------------------------------------------------------------------------------
  onEdit() {
    this.router.navigate(['/exercises', this.exerciseUrl, 'edit']);
  }


  // ---------------------------------------------------------------------------------
  onCancel() {
    this.location.back();
  }

  // ---------------------------------------------------------------------------------
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }


}
