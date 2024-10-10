import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService){
  this.signInForm = this.fb.group({
    userName:['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    password:['', [Validators.required]]
  })

  }

  onSignIn(){
    if (!this.signInForm.valid) {
      console.log('no es valido')
      return;
    }
    let userName = this.signInForm.value.userName || '';
    let password = this.signInForm.value.password || '';
    let response = this.userService.signIn(userName, password);
    if(response.success){
      this.router.navigateByUrl('/home');
    }else{
      console.log('Error al iniciar sesión')
    }
  }
}
