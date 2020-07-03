import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortletFooterComponent } from './portlet-footer.component';



@NgModule({
    declarations: [PortletFooterComponent],
    exports: [
        PortletFooterComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PortletFooterModule { }
