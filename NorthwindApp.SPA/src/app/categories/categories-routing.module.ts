import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent},
  { path: 'categories/category-list', component: CategoryListComponent},
  { path: 'categories/category-edit/:categoryId', component: CategoryEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
