import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/CategoryService';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit{
    model: AddBlogPost;
    categories$?: Observable<Category[]>;
    selectedCategories?: string[] = []; 
categories: any;

    constructor(private BlogPostService: BlogPostService,
      private router: Router, private categoryService: CategoryService){
      this.model = {
        title: '',
        content: '',
        createdAt: new Date(),
       // categories: Category[] =[]
       categories: []
      }
    }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

    onFormSubmit(): void {
      
      console.log(this.model);
      
      this.BlogPostService.createBlogPost(this.model)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          }
        });
    }
    
}
