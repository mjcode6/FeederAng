import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";


@Component({
    selector: 'app-sign-in',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})

export class SignInComponent {

    constructor(private formBuilder: FormBuilder) { };

    orderForm = this.formBuilder.group({
        title: ['', Validators.required],
        quantity: ['', [Validators.required, Validators.max(5)]],
        date: ['', [Validators.required, minDateValidator(new Date())]],
        contact: ['', [Validators.required, Validators.email]],
        payments: this.formBuilder.array([]),
    });
    get payments(): FormArray {
        // convert abstract control to FormArray
        return this.orderForm.get('payments') as FormArray;
    };

    addPayments() {
        // create FormGroup with two FormControl
        const paymentForm = this.formBuilder.group({
            date: ['', [Validators.required, minDateValidator(new Date())]],
            amount: ['', Validators.required]
        });
        // parse abstract control to FormArray
        const payments = this.orderForm.get('payments') as FormArray;
        // add new FormGroup to control 'payments'
        payments.push(paymentForm);
        console.log(payments.value);
    }


    ngOnInit() {
        // get Observable from FormGroup
        this.orderForm.valueChanges
            // listen to value change
            .subscribe(value => {
                // console.log('orderForm value changes : ', value);
            });
    };

    onSubmit() {
        // Get form value as JSON object
        console.log('oderForm submitted : ', this.orderForm.value);
    };
};

export function minDateValidator(minDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // parse control value to Date
        const date = new Date(control.value);
        // check if control value is superior to date given in parameter
        if (minDate.getTime() < date.getTime()) {
            return null;
        } else {
            return { 'min': { value: control.value, expected: minDate } };
        }
    };
};
