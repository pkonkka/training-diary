import { Component } from '@angular/core';

import { WorkoutService } from './shared/model/workout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WorkoutService]
})
export class AppComponent {
}
