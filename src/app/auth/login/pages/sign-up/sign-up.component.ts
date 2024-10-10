import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm!:FormGroup
  
  constructor(private formBuilder: FormBuilder, private router: Router, private userService:UserService) {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.email],
      role:['', [Validators.required]],
      userName:['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      password:['', [Validators.required,
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
        Validators.minLength(8), 
        Validators.maxLength(16)]],
      rePassword: ['', [Validators.required,
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
        Validators.minLength(8), 
        Validators.maxLength(16)]]
        //TODO: organizar bien la expresión regular
    });
  }

  onSignUp() {
    if(this.dataValidate()){
      let userName = this.signUpForm.value.userName || '';
      let email = this.signUpForm.value.email || '';
      let password = this.signUpForm.value.password || '';
      let role = this.signUpForm.value.role || '';
      let response = this.userService.signUp({userName, password, email, role})
      if(response.success){
        console.log(response.message)
        this.router.navigateByUrl('/home');
      }else{
        console.log(response.message)
      }
    }
  }

  dataValidate():boolean {
    let validated: boolean = true;
    const usernameControl = this.signUpForm.get('userName');
    const emailControl = this.signUpForm.get('email');
    const passwordControl = this.signUpForm.get('password');
    const repasswordControl = this.signUpForm.get('rePassword');
    const roleControl = this.signUpForm.get('role')
    if(!usernameControl || !emailControl || !passwordControl || !repasswordControl || !roleControl){
      console.log('error')
      validated = false;
    }else if(!usernameControl?.valid){
      console.log(usernameControl.errors)
      validated = false;
    }else if(!emailControl?.valid){
      console.log(emailControl.errors)
      validated = false;
    }else if(!passwordControl?.valid){
      console.log(passwordControl.errors)
      validated = false;
    }else if(repasswordControl.value !== passwordControl.value){
      console.log(repasswordControl.errors)
      validated = false;
    }else if(!roleControl?.valid){
      console.log(roleControl.errors)
      validated = false;
    }
    return validated;
  }

}
