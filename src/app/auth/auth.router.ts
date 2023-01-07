import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalTelComponent } from './modal-tel/modal-tel.component';
import { ModalCodeComponent } from './modal-code/modal-code.component';
import { ModalSignupComponent } from './modal-signup/modal-signup.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: ModalLoginComponent,
            },
            {
                path: 'sign-in',
                component: ModalTelComponent,
            },
            {
                path: 'insert-code',
                component: ModalCodeComponent,
            },
            {
                path: 'sign-up',
                component: ModalSignupComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRouterModule { }