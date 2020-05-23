import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './forum.component';
import { AddNewPostComponent } from './add-new-post/add-new-post.component';
import { MyListComponent } from './my-list/my-list.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { ExpandedPostComponent } from './expanded-post/expanded-post.component';


const routes: Routes = [
{path:'',component:ForumComponent}, 
{path:'add-new-post',component:AddNewPostComponent},
{path:'my-list',component:MyListComponent},
{path:'submissions',component:SubmissionsComponent},
{path:'post/:id',component:ExpandedPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
