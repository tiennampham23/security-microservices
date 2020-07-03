import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import {PortletModule} from '@drop-shipping/shared/ui-common/portlet/portlet.module';
import {PortletHeaderModule} from '@drop-shipping/shared/ui-common/portlet-header/portlet-header.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {PortletBodyModule} from '@drop-shipping/shared/ui-common/portlet-body/portlet-body.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { SnackbarModule } from '@drop-shipping/shared/ui-common/public-api';
import { ChangeProfileComponent } from './pages/change-profile/change-profile.component';



@NgModule({
  declarations: [ChangePasswordComponent, ChangeProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    PortletModule,
    SnackbarModule,
    PortletHeaderModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    PortletBodyModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class UserProfileModule { }
