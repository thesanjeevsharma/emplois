import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialogModule } from '@angular/material';

import { ProviderComponent } from './components/provider/provider.component';
import { SeekerComponent } from './components/seeker/seeker.component';
import { IncompleteComponent } from './components/incomplete/incomplete.component';


const routes: Routes = [
  { path : 'seeker/:username', component : SeekerComponent },
  { path : 'provider/:username', component : ProviderComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  declarations: [
    ProviderComponent,
    SeekerComponent,
    IncompleteComponent
  ],  
  entryComponents: [
    IncompleteComponent
  ],
  providers : [
   
  ]
})
export class ProfileModule { }
