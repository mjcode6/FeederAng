import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-sign-in',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent {

    constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

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

        // Make HTTP POST request with form data in the request body
        this.httpClient.post<any>('http://localhost:8080/login', formValues).subscribe(
            response => {
                // Gérer la réponse du serveur ici
                console.log('Réponse du serveur :', response);
            },
            error => {
                // Gérer les erreurs ici
                console.error('Erreur lors de la requête POST :', error);
            }
        );
    }
}
