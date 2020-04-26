import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutingModule } from './forum-routing.module';
import { ProjectMaterialModuleModule } from '../shared/project-material-module/project-material-module.module';
import { PostComponent } from './post/post.component';
import { SiteOptionsComponent } from './site-options/site-options.component';
import { AddNewPostComponent } from './add-new-post/add-new-post.component';
import { PostElementComponent } from './add-new-post/post-element/post-element.component';



@NgModule({
  declarations: [ForumComponent, PostComponent, SiteOptionsComponent, AddNewPostComponent, PostElementComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    ProjectMaterialModuleModule
  ] 
})
export class ForumModule { }
