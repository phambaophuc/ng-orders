import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup = new FormGroup({});

    constructor(private authService: AuthService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            email: new FormControl('',
                [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
            ),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('')
        }, {
            validators: this.matchValidator('password', 'confirmPassword')
        })
    }

    get email() { return this.signUpForm.get('email'); }
    get password() { return this.signUpForm.get('password'); }
    get confirmPassword() { return this.signUpForm.get('confirmPassword'); }

    matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
        return (abstractControl: AbstractControl) => {
            const control = abstractControl.get(controlName);
            const matchingControl = abstractControl.get(matchingControlName);

            if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
                return null;
            }

            if (control!.value !== matchingControl!.value) {
                const error = { confirmedValidator: 'Passwords do not match.' };
                matchingControl!.setErrors(error);
                return error;
            } else {
                matchingControl!.setErrors(null);
                return null;
            }
        }
    }

    onSubmit() {
        const email = this.signUpForm.controls['email'].value;
        const password = this.signUpForm.controls['password'].value;

        this.authService.signUp(email, password);
    }
}
