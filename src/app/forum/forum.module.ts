import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutingModule } from './forum-routing.module';
import { ProjectMaterialModuleModule } from '../shared/project-material-module/project-material-module.module';
import { PostComponent } from './post/post.component';
import { SiteOptionsComponent } from './site-options/site-options.component';



@NgModule({
  declarations: [ForumComponent, PostComponent, SiteOptionsComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    ProjectMaterialModuleModule
  ] 
})
export class ForumModule { }
