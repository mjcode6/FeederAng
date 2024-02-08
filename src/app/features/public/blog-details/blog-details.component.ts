import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{

  url: string | null = null;
 
  @Input() blogPost! :  any; 
  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService){

  }
  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next: (params) => {
       this.url =  params.get('url');
      }
    })
  }

  // fetch blog detail by url
  /* if (this.url){
    this.blogPost$ =   this.blogPostService.getBlogPostByContent(this.url);
    } */


    // i need a get methode by content sur back-end
 
  }




