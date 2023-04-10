import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { ReadComponent } from './pages/read/read.component';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [{ path: '', component: ReadComponent },
{ path: 'create', component: CreateComponent },
{ path: 'update', component: UpdateComponent },
{ path: 'update/:id', component: UpdateComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
