import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortletBodyComponent } from './portlet-body.component';



@NgModule({
    declarations: [PortletBodyComponent],
    exports: [
        PortletBodyComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PortletBodyModule { }
