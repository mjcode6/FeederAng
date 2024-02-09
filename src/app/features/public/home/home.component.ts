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

  constructor(private articleService: BlogPostService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllBlogPosts().subscribe(
      (data) => {
        this.articles = data.map(article => ({ ...article, showContent: false }));
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  enableEditMode(): void {
    this.isEditMode = true;
  }

  cancelUpdate(): void {
    this.isEditMode = false; // Exit edit mode without saving
  }

  showDetails(article: any): void {
    this.selectedArticle = article;
  }

  deleteArticle(article: any): void {
    this.deletingArticle = article;
  }

  toggleContent(article: any): void {
    article.showContent = !article.showContent;
  }

  onDataReceived(event: String) {
    console.log("received " + event);
    this.isEditMode = false; // Exit edit mode after saving
    this.loadArticles(); 
  }
}
