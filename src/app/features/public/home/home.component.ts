

import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  articles: BlogPost[] = [];
  filteredArticles: BlogPost[] = [];
  searchTitle: string = '';
  isEditMode: boolean = false;
  selectedArticle: BlogPost | null = null; // Change here
  deletingArticle: BlogPost | null = null; // Change here

  constructor(private articleService: BlogPostService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllBlogPosts().subscribe(
      (data: BlogPost[]) => {
        this.articles = data.map(article => ({ ...article, showContent: false }));
        this.filteredArticles = this.articles;
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

  showDetails(article: BlogPost): void {
    this.selectedArticle = article; // Assign the selected article
  }

  deleteArticle(article: BlogPost): void {
    this.deletingArticle = article; // Assign the deleting article
  }

  toggleContent(article: BlogPost): void {
    article.showContent = !article.showContent;
  }

  onDataReceived(event: string): void {
    console.log("received " + event);
    this.isEditMode = false; // Exit edit mode after saving
    this.loadArticles(); 
  }

  filterArticles(): void {
    if (!this.searchTitle) {
      this.filteredArticles = this.articles;
      return;
    }
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }
}
