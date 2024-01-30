import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { __param } from 'tslib';
import { CategoryService } from '../services/CategoryService';
import { Category } from '../models/category.model';
import { updateCategoryRequest } from '../models/update-category-request';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy{

id: string | null = null;
paramsSubscription: Subscription | undefined;
editCategorySubscription: Subscription | undefined;

category?: Category;




  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router){

  }
  
  ngOnInit(): void {
   this.paramsSubscription =  this.route.paramMap.subscribe({
      next: (params) => {
       this.id =  params.get('id');

      if(this.id){
        // get the data from the api for this category id
       this.editCategorySubscription =  this.categoryService.getCategoryById(this.id)
        .subscribe({
          next: (response) => {
               this.category = response;
          }
        });
      }


      }
    });
  }

  onFormSubmit(): void{
     const updateCategoryRequest: updateCategoryRequest = {
         name: this.category?.name ?? '',
      
     };
    

     // pass this object to services
     if(this.id){
        this.categoryService.updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
             this.router.navigateByUrl('/admin/categories');
          }
        });
     }
     
  }

  onDelete(): void {
    if(this.id){
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

}
