import { Category } from "../../category/models/category.model";

export interface AddBlogPost{
    id: number;
title:string;

content: string;
createdAt: Date;
categories: Category[];
}