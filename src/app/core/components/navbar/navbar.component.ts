import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/components/services/AuthService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string | undefined | null;
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.username = this.authService.getUsername();
    console.log("navbar");
  }
  onUpdateUsername(): void {
    this.username = this.authService.getUsername();
    this.cdr.detectChanges(); // Pour forcer la détection des changements
  }
  onSubmit() {
    console.log("USERNAME = " + this.username);
  }
}
