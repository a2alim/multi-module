import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareViewComponent } from './share-view/share-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ShareViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService]
})
export class ShareModule { }
