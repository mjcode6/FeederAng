import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignUpComponent {

    constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { } // Inject Router here

    orderForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],

    });

    ngOnInit() {
        // get Observable from FormGroup
        this.orderForm.valueChanges
            // listen to value change
            .subscribe(value => {
                console.log('orderForm value changes : ', value);
            });
    };

    onSubmit() {
        // Get form values as an object
        const formValues = this.orderForm.value;

        // Accessing individual form control values
        const usernameValue = formValues.username;
        const passwordValue = formValues.password;

        // Now you can create a new user object or perform any other logic
        const newUser = {
            username: usernameValue,
            password: passwordValue
        };

        // Output the new user object to the console
        console.log('Nouvel utilisateur ' + newUser.username + ' :', newUser);
        this.httpClient.post<any>('http://localhost:8080/inscription', formValues).subscribe(
            response => {
                // Gérer la réponse du serveur ici
                console.log('Réponse du serveur :', response);
            },
            error => {
                // Gérer les erreurs ici
                console.error('Erreur lors de la requête POST :', error);
            }
        );
        this.router.navigate(['/public/Home']);
    }
}
