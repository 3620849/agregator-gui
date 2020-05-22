import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutingModule } from './forum-routing.module';
import { ProjectMaterialModuleModule } from '../shared/project-material-module/project-material-module.module';
import { PostComponent } from './post/post.component';
import { SiteOptionsComponent } from './site-options/site-options.component';
import { AddNewPostComponent } from './add-new-post/add-new-post.component';
import { PostElementComponent } from './add-new-post/post-element/post-element.component';
import { ElementTextComponent } from './add-new-post/element-text/element-text.component';
import { FormsModule } from '@angular/forms';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { BlockComponent } from './post/block/block.component';
import { InfiniteLoaderComponent } from './post-feed/infinite-loader/infinite-loader.component'; 
import {NgxImageCompressService} from 'ngx-image-compress';
import { MyListComponent } from './my-list/my-list.component'; 
@NgModule({
  declarations: [ForumComponent, PostComponent, SiteOptionsComponent, AddNewPostComponent, PostElementComponent, ElementTextComponent, PostFeedComponent, BlockComponent, InfiniteLoaderComponent, MyListComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    ProjectMaterialModuleModule,
    FormsModule 
  ], 
  providers:[NgxImageCompressService]
})
export class ForumModule { }
