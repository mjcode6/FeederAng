import { Category } from "../../category/models/category.model";

export interface BlogPost{
    
id:string;
title:string;

content: string;

categories: Category[];

}