import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { WorkoutEditComponent } from './workout-edit.component';

export class CanWorkoutEditDeactivate implements CanDeactivate<WorkoutEditComponent> {

    canDeactivate(
        component: WorkoutEditComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
            
        if (!component.dirty) {
            return true;
        }

        return confirm('Unsaved changes exist, do you want to exit ?');

        
    }

}