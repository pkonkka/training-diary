
import { FormControl } from '@angular/forms';

export function validatePassword(ctrl: FormControl) {

    const valid = false;

    return valid ? null : {
        validatePassword: {
            valid: false
        }
    };

}
