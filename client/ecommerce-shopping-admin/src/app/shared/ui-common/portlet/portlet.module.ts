import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortletComponent } from './portlet.component';



@NgModule({
  declarations: [PortletComponent],
  exports: [
    PortletComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PortletModule { }
