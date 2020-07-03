import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortletHeaderComponent } from './portlet-header.component';



@NgModule({
  declarations: [PortletHeaderComponent],
  exports: [
    PortletHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PortletHeaderModule { }
