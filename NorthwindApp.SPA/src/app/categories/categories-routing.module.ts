import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { preventUnsavedChangesOnCategoryGuard } from '../_guards/prevent-unsaved-changes.guard';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'categories', component: CategoryListComponent},
      { path: 'categories/category-list', component: CategoryListComponent},
      { path: 'categories/category-edit', component: CategoryEditComponent, canDeactivate: [preventUnsavedChangesOnCategoryGuard] },
      { path: 'categories/category-edit/:categoryId', component: CategoryEditComponent, canDeactivate: [preventUnsavedChangesOnCategoryGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
