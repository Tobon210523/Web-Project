import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse} from '../interfaces/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSignal = signal<User>({
    userName: '',
    password: '',
    email: '',
    role: '',
    profilePicture: ''
  });
  
  signUp(user: User): LoginResponse {
    const usersStr = localStorage.getItem('users');
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
  
    const existingUser = users.find(u => u.userName.toLowerCase().trim() === user.userName.toLowerCase().trim());
    if (existingUser) {
      return {
        success: false,
        message: 'Usuario ya existe'
      };
    }
  
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  
    this.setUser(user);
  
    return {
      success: true,
      message: 'Se registró correctamente'
    };
  }
  
  signIn(userName: string, password: string): LoginResponse {
    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      };
    }
  
    const users: User[] = JSON.parse(usersStr);
  
    const user = users.find(u => u.userName.toLowerCase().trim() === userName.toLowerCase().trim());
    if (!user || user.password !== password) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      };
    }
  
    this.setUser(user);
    return {
      success: true
    };
  }
  
  setUser(user: User) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }
  
  getUser() {
    const userObject = localStorage.getItem('loggedUser');
    if (userObject) {
      return JSON.parse(userObject);
    }
  }
  
  getUserName():string{
    const user = this.getUser();
    return user.userName;
  }

  getEmail():string{
    const user = this.getUser();
    return user.email;
  }

  getProfilePicture():string{
    const user = this.getUser();
    return user.profilePicture;
  }

  getBiography():string{
    const user = this.getUser();
      return user.biography;
  }
  
  logout() {
    const loggedUser = this.getUser();
    if (loggedUser) {
      const usersStr = localStorage.getItem('users');
      if (usersStr) {
        const users: User[] = JSON.parse(usersStr);
        const userIndex = users.findIndex(u => u.userName === loggedUser.userName);
        if (userIndex !== -1) {
          users[userIndex] = loggedUser;  
          localStorage.setItem('users', JSON.stringify(users)); 
        }
      }
    }
    localStorage.removeItem('loggedUser');
    this.userSignal.set({ userName: '', password: '', email: '', role: '' });
  }
  
}
