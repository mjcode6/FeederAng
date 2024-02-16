import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/components/services/AuthService';

@Component({
    selector: 'app-log-out',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogOutComponent {

    constructor(
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() { };

    onSubmit() {
        this.authService.clearUsername();
        this.router.navigate(['/public/Home']).then(() => {
            window.location.reload();
        });
    }
}
