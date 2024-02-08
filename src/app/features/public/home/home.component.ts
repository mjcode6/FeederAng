import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  articles: any[] = [];
  newArticle: any = {};
  selectedArticle: any;
  deletingArticle: any;
  isEditMode: boolean = false;



  enableEditMode(): void {
    this.isEditMode = true;
  }


  cancelUpdate(): void {
    this.isEditMode = false; // Exit edit mode without saving
  }


  dataReceived!  : String; 
  constructor(private articleService: BlogPostService ) { 

  }

  sortOrder: 'asc' | 'desc' = 'asc'; // Ajout de la propriété de suivi de l'ordre de tri



  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
  //  if (this.authService.isAuthenticated()) {
      this.articleService.getAllBlogPosts().subscribe(
        (data) => {
          this.articles = data;
        },
        (error) => {
          console.error('Error fetching articles:', error);
        }
      );
   // }
  }


  showDetails(article: any): void {
    this.selectedArticle = article;
  }


  deleteArticle(article: any): void {
    this.deletingArticle = article;
  }

  // Fonction de tri
  sortArticles(order: 'asc' | 'desc'): void {
    this.sortOrder = order; // Met à jour l'ordre de tri
    this.articles.sort((a, b) => {
      if (order === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }

  onDataReceived(event: String) {
    console.log("recived " +event);
    this.isEditMode = false; // Exit edit mode after saving
    this.loadArticles(); 
 
  }
  
 


}
