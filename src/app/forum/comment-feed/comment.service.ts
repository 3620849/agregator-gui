import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetailsService } from 'src/app/user-details/user-details.service';
import { AddNewPostService } from '../add-new-post/add-new-post.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private userService: UserDetailsService, private postService: AddNewPostService) { }


  addNewComment(parentPostId: string, id: string, payload: any[]) {
    let body = {
      parentPostId: parentPostId,
      ancestorId: id,
      content: payload
    }

    this.postService.sendNewPost(body).subscribe(res => {

    })
  }
  getCommentsTree(postId:string){
    return this.http.get<any[]>(environment.base_url+"/api/p/comment/"+postId);
  }
}
