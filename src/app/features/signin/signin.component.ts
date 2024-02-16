import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/components/services/AuthService';

@Component({
    selector: 'app-sign-in',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent {

    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService) { }

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
        const usernameValue = formValues.username;
        const passwordValue = formValues.password;
        const askUser = {
            username: usernameValue,
            password: passwordValue
        };
        // Make HTTP POST request with form data in the request body
        this.httpClient.post<any>('http://localhost:8080/api/users/verify', formValues).subscribe(
            response => {
                // Gérer la réponse du serveur ici
                // console.log('Réponse du serveur :', response);
                if (askUser.username === response.username) {
                    if (response.username) {
                        // console.log("Username = " + usernameValue);
                        this.authService.setUsername(response.username);
                        this.router.navigate(['/public/Home']).then(() => {
                            window.location.reload();
                        });
                    }
                }
            },
            error => {
                // Gérer les erreurs ici
                console.error('Erreur lors de la requête POST :', error);
            }
        );
    }
}
