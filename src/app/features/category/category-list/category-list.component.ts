import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/CategoryService';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{

  categories$?: Observable<Category[]>;




  constructor(private categoryServices: CategoryService){

  }
  ngOnInit(): void {
  this.categories$ = this.categoryServices.getAllCategories();
   
  }
}
