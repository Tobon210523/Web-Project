import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm!:FormGroup
  
  constructor(private fb: FormBuilder, private router: Router, private userService:UserService) {
    this.signUpForm = this.fb.group({
      email: ['', Validators.email],
      userName:['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      password:['', [Validators.required,
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
        Validators.minLength(8), 
        Validators.maxLength(16)]],
      rePassword: ['', [Validators.required,
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
        Validators.minLength(8), 
        Validators.maxLength(16)]],
        //TODO: organizar bien la expresión regular
      role:['', [Validators.required]]
    });
  }

  onSignUp() {
    if(this.dataValidate()){
      let userName = this.signUpForm.value.userName || '';
      let email = this.signUpForm.value.email || '';
      let password = this.signUpForm.value.password || '';
      let role = this.signUpForm.value.role || '';
      let response = this.userService.register({userName, password, email, role})
      if(response.success){
        this.router.navigateByUrl('/home');
      }else{
        console.log(response.message)
        swal({
          title: 'Error al registrar el usuario',
          text: response.message,
          type: 'error'
        })}
    }
  }

  dataValidate():boolean {
    let validated: boolean = true;
    const usernameControl = this.signUpForm.get('userName');
    const emailControl = this.signUpForm.get('email');
    const passwordControl = this.signUpForm.get('password');
    const repasswordControl = this.signUpForm.get('rePassword');
    console.log({usernameControl,emailControl, passwordControl, repasswordControl})
    if(!usernameControl || !emailControl || !passwordControl || !repasswordControl){
      swal({
        title: 'Error al diligenciar los campos',
        type: 'error',
        text: 'Todos los campos deben estar diligenciados correctamente'
      })
      validated = false;
    }else if(!usernameControl?.valid){
      swal({
        title: 'Error en el nombre de usuario',
        type: 'error',
        text: 'El nombre de usuario debe tener como un tamaño de 8 a 16 caracteres'
      })
      validated = false;
    }else if(!emailControl?.valid){
      swal({
        title: 'Error en el correo',
        type: 'error',
        text: 'El correo que ingresaste no tiene el formato válido'
      })
      validated = false;
    }else if(!passwordControl?.valid){
      swal({
        title: 'Error en la contraseña',
        type: 'error',
        text: 'La contraseña debe tener una mayúscula, una minúscula, un caracter especial, y debe tener entre 8 y 16 caracteres'
      })
      console.log(passwordControl.errors)
      validated = false;
    }else if(repasswordControl.value !== passwordControl.value){
      swal({
        title: 'Error en la confirmación de la contraseña',
        type: 'error',
        text: 'Las contraseñas no coinciden'
      })
      console.log(repasswordControl.errors)
      validated = false;
    }
    return validated;
  }

}
