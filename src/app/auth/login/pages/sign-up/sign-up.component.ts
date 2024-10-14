import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';


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
        Validators.minLength(8), 
        Validators.maxLength(20)]],
      rePassword: ['', [Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(20)]]
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
    const usernameControl = this.signUpForm.get('userName');
    const emailControl = this.signUpForm.get('email');
    const passwordControl = this.signUpForm.get('password');
    const repasswordControl = this.signUpForm.get('rePassword');
    const roleControl = this.signUpForm.get('role')
    if(!usernameControl?.valid){
      Swal.fire({
        title: 'Nombre de usuario incorrecto',
        icon: 'error',
        text: 'El nombre debe tener entre 8 y 30 caracteres',
        confirmButtonText: 'Entendido'
      })
      return false;
    }else if(!emailControl?.valid){
      Swal.fire({
        title: 'Correo incorrecto',
        icon: 'error',
        text: 'El correo debe tener el formato, tucorreo@servicio.com',
        confirmButtonText: 'Entendido'
      })
      return false;
    }else if(!passwordControl?.valid){
      Swal.fire({
        title: 'Errores en la contraseña',
        icon: 'error',
        text: 'La contraseña debe tener entre 8 y 20 caracteres',
        confirmButtonText: 'Entendido'
      })
      console.log(passwordControl?.errors)
      return false;
    }else if(repasswordControl?.value !== passwordControl.value){
      Swal.fire({
        title: 'Contraseñas incosistentes',
        icon: 'error',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Entendido'
      })
      return false;
    }else if(!roleControl?.valid){
      Swal.fire({
        title: 'No elegiste un rol',
        icon: 'error',
        text: 'Debes seleccionar un rol para tu perfil',
        confirmButtonText: 'Entendido'
      })
      return false;
    }
    return true;
  }

}
