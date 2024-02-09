import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { updateBolgPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }


createBlogPost(data: AddBlogPost): Observable<BlogPost>{
 return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogs`,data);
}

getAllBlogPosts():Observable<BlogPost[]>{
  return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogs`);
}

getBlogPostById(id: string):Observable<BlogPost>{
  return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogs/${id}`);
}


updateBlogPost(id: string, updateBlogPost: updateBolgPost): Observable<BlogPost>{
  return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogs/${id}`,updateBlogPost);
}

deleteBlogPost(id: string):Observable<BlogPost>{
  return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogs/${id}`);
}
}
  

