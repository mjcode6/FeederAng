import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/CategoryService';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy{

model: AddCategoryRequest;

private addCategorySubcription?: Subscription;

constructor(private CategoryService: CategoryService,
  private router: Router){
  this.model = {
    categoryName:'',
   
  };
}
 

onFormSubmit(){
  console.log(this.model);
  
     this.addCategorySubcription    = this.CategoryService.addCategory(this.model)
.subscribe({
  next: (response) => {
    this.router.navigateByUrl('/admin/categories');
  },
  error: (error) => {

  }
})


}
ngOnDestroy(): void {
  this.addCategorySubcription?.unsubscribe();
}

}
