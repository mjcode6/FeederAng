import { Category } from "../../category/models/category.model";

export interface BlogPost{

    // tempo declaration
map(arg0: (x: any) => any): string[];



id:string;
title:string;

content: string;
createdAt: Date;


categories: Category[];

}