import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutingModule } from './forum-routing.module';
import { ProjectMaterialModuleModule } from '../shared/project-material-module/project-material-module.module';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [ForumComponent, PostComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    ProjectMaterialModuleModule
  ] 
})
export class ForumModule { }
