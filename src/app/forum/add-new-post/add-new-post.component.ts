import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AddNewPostService } from './add-new-post.service';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss']
})
export class AddNewPostComponent implements OnInit {
   
  public form: FormGroup;
  private index = 0;
  post = {
    header: "",
    content: []
  } 
  loading = false;
  constructor(private postSrv: AddNewPostService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({"header":new FormControl('',[Validators.required,Validators.minLength(4)])});
    this.post.content.push({ text: "", type: "text" });
  }
  remove(index) {
    this.post.content.splice(index, 1);
  }

  add(mediaType: string) {
    ++this.index;
    switch (mediaType) {
      case "img": this.post.content.push({ url: "", type: "img" }); break;
      case "text": this.post.content.push({ text: "", type: "text" }); break;
      case "video": this.post.content.push({ url: "", type: "video" }); break;
    }

  }
  sendPost() {
    let isValid = this.validate();
    this.converFromGroupToObj();
    if (isValid) {
      this.loading = true;
      this.postSrv.sendNewPost(this.post).subscribe(res => {
        this.router.navigateByUrl("/forum", { state: { tab: 'new' } });
      }, err => {
        this.loading = false;
      }); 
    }
  }

  validate(): boolean {
    let res =false;
    res = this.form.get("header").valid;
    //todo check content
    //make dirty for all  
    this.form.get("header").markAsDirty(); 
    return res;
  }

  converFromGroupToObj(){
    this.post.header=this.form.get("header").value;
  }
  
  get header(){
    return this.form.get("header");
  }
 
}
