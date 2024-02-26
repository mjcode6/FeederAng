import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Utilisez le décorateur @Injectable pour indiquer qu'il s'agit d'un service injectable
@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  // Exemple de fonction pour envoyer une requête POST avec un corps de requête
  registerUser(username: string, password: string) {
    const backendUrl = 'http://localhost:8080/api/users';

    // Créez un objet contenant les champs requis dans le corps de la requête
    const requestBody = {
      username: username,
      password: password
    };

    // Spécifiez les en-têtes si nécessaire
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Utilisez la méthode post() pour envoyer la requête POST avec le corps de la requête
    this.http.post(backendUrl, requestBody, { headers }).subscribe(
      (response) => {
        console.log('Réponse du serveur : ', response);
        // Traitez la réponse du serveur ici
      },
      (error) => {
        console.error('Erreur lors de la requête POST : ', error);
        // Gérez les erreurs ici
      }
    );
  }
}
