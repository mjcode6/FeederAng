import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private usernameKey = 'username';
    private username: string | null = null;

    constructor() {
        // Récupérer le nom d'utilisateur enregistré dans le localStorage lors de l'initialisation du service
        this.username = localStorage.getItem(this.usernameKey);
    }

    setUsername(username: string | null) {
        // Mettre à jour le nom d'utilisateur dans le localStorage et dans la propriété de la classe
        this.username = username;
        localStorage.setItem(this.usernameKey, username ?? '');
    }

    getUsername(): string | null {
        // Retourner le nom d'utilisateur de la propriété de la classe
        return this.username;
    }

    clearUsername() {
        // Supprimer le nom d'utilisateur du localStorage et réinitialiser la propriété de la classe à null
        this.username = null;
        localStorage.removeItem(this.usernameKey);
    }
}
