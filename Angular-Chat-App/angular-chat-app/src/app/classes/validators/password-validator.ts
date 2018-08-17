import { Validators } from '@angular/forms';

export class PasswordValidator {
    constructor() {
        return [
            '',
            Validators.compose(
                [
                    // Validators.pattern(/[A-Z]+/),
                    // Validators.pattern(/[!@#$%&]+/),
                    Validators.pattern(/[0-9]+/),
                    // Validators.pattern(/^.{8,12}$/),
                    Validators.pattern(/[a-z]+/),
                    Validators.required
                ],
            )
        ];
    }
}

