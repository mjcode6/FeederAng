import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { updateBolgPost } from '../models/update-blog-post.model';
import { CategoryService } from '../../category/services/CategoryService';
import { Category } from '../../category/models/category.model';
import { AuthService } from '../../../core/components/services/AuthService';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null;
  routeSubscription?: Subscription;
  model?: BlogPost
  categories$?: Observable<Category[]>;
  selectedCategories?: string[]
  updateBlogPostSubcription?: Subscription;
  getBlogPostSubcription?: Subscription;
  deleteBlogPostSubcription?: Subscription;
  username: string | undefined | null;
  isAuthor: boolean = false;

  constructor(private route: ActivatedRoute,
    private blogPostServices: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService) {

  }

  onDelete(): void {
    if (this.id) {
      // call the service and delete blog post
      this.deleteBlogPostSubcription = this.blogPostServices.deleteBlogPost(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          }
        });
    }
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubcription?.unsubscribe();
    this.getBlogPostSubcription?.unsubscribe();
    this.deleteBlogPostSubcription?.unsubscribe();
  }

  ngOnInit(): void {
    // Determiner l'utilisateur connecté
    this.username = this.authService.getUsername();
    ///////////////////////////////////////////////
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // get blog post from Api
        if (this.id) {
          this.getBlogPostSubcription = this.blogPostServices.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              if (response.user.username.toLowerCase().trim() === this.username?.toLowerCase().trim()) {
                this.isAuthor = true;
              }
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    //  Convert this mode to request object

    if (this.model && this.id) {
      var updateBolgPost: updateBolgPost = {

        title: this.model.title,
        content: this.model.content,
        createdAt: this.model.createdAt,
        categories: this.selectedCategories ?? []


      };
      this.updateBlogPostSubcription = this.blogPostServices.updateBlogPost(this.id, updateBolgPost)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          }
        });
    }
  }
}
