import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { updateBolgPost } from '../models/update-blog-post.model';
import { CategoryService } from '../../category/services/CategoryService';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy{

id: string | null = null;
routeSubscription?: Subscription;
model?: BlogPost
categories$?: Observable<Category[]>;
selectedCategories?: string[]

constructor(private route: ActivatedRoute,
  private blogPostServices: BlogPostService,
  private categoryService: CategoryService){

}
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
   this.categories$ =  this.categoryService.getAllCategories();

   this.routeSubscription =  this.route.paramMap.subscribe({
      next: (params) =>{
       this.id = params.get('id');

       // get blog post from Api
       if(this.id){
        this.blogPostServices.getBlogPostById(this.id).subscribe({
          next: (response) => {
            this.model = response;

            // this.selectedCategories = response.map(x => x.id);

          }
        });;
       }
     

      }
    });
  }

  onFormSubmit():void{
    //  Convert this mode to request object

    if(this.model && this.id){

    }


  }

}
