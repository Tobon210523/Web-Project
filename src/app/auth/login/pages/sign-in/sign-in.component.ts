import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../constants/shared-imports';
import { UserService } from '../../../services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  
  signInForm!: FormGroup;

  constructor(private fb:FormBuilder, private router: Router, private userService: UserService){
  this.signInForm = this.fb.group({
    userName:['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    password:['', [Validators.required]]
  })

  }

  onSignIn(){
    if (!this.signInForm.valid) {
      swal({
        title: 'Campos vacíos',
        text: 'Debes diligenciar todos los campos',
        type: 'error'
      })
      return;
    }
    let userName = this.signInForm.value.userName||'';
    let password = this.signInForm.value.password||'';
    let response = this.userService.login(userName, password);
    if(response.success){
      this.router.navigateByUrl('/home');
    }else{
      swal({
        title: 'Error',
        text: response.message,
        type: 'error'
      })
    }

  }

}
