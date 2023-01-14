import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgxMaskModule } from "ngx-mask";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "../auth/auth.component";
import { AuthRouterModule } from "./auth.router";
import { ModalCodeComponent } from "./modal-code/modal-code.component";
import { ModalLoginComponent } from "./modal-login/modal-login.component";
import { ModalSignupComponent } from "./modal-signup/modal-signup.component";
import { ModalTelComponent } from "./modal-tel/modal-tel.component";
import { AuthenticationService } from "../service/authentication.service";
import { ProfileService } from "../service/profile.service";
import { UserService } from "../service/user.service";
// import { ToastrModule } from "ngx-toastr";

@NgModule({
    declarations: [
        AuthComponent,
        ModalSignupComponent,
        ModalCodeComponent,
        ModalTelComponent,
        ModalLoginComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        AuthRouterModule,
        // ToastrModule.forRoot()
    ],
    providers: [
        AuthenticationService,
        UserService,
        ProfileService
    ]

})
export class AuthModule { }