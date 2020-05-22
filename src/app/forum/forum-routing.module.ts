import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './forum.component';
import { AddNewPostComponent } from './add-new-post/add-new-post.component';
import { MyListComponent } from './my-list/my-list.component';


const routes: Routes = [
{path:'',component:ForumComponent}, 
{path:'add-new-post',component:AddNewPostComponent},
{path:'my-list',component:MyListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
