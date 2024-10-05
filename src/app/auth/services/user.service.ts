import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse} from '../interfaces/LoginResponse';
import { GalleryItem } from '../../features/home/interfaces/gallery-item.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSignal = signal<User>({userName:'', password:'', email:'', role:'', profilePicture: '', propertiesList:['']});

  register(user:User): LoginResponse{
    if (localStorage.getItem(user.userName.toLowerCase().trim())) {
      return {
        success: false,
        message: 'Usuario ya existe'
      }
    }
    const userSrt = JSON.stringify(user);
    localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
    this.setUser(user);
    return {
      success: true,
      message: 'se registró'
    }
  }

  login(userName: string, password: string) :LoginResponse{
    const userSrt = localStorage.getItem(userName.toLowerCase().trim());
    if(!userSrt){
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      }
    }
    const user:User = JSON.parse(userSrt);
    if (user.password !== password) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      }
    }
    this.setUser(user);
    return {
      success: true
    }
    
  }
  
  logout(){
    localStorage.removeItem('loggedUser');
    this.userSignal.set({userName:'', password:'', email:'', role:''});
  }

  saveImage(id:string, url:string, userName:string){
    const newImage:GalleryItem = {
      id,
      url,
      comments:[]
    }
    let galleryStr = localStorage.getItem(`imgs-${userName}`);
    if(galleryStr){
      let gallery = JSON.parse(galleryStr);
      gallery = [...gallery, newImage];
      localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
    }else{
      localStorage.setItem(`imgs-${userName}`,JSON.stringify([newImage]));
    }
  }

  getGallery(userName:string):GalleryItem[]{
    let galleryStr = localStorage.getItem(`imgs-${userName}`);
    if(galleryStr){
      return JSON.parse(galleryStr);
    }
    return [];
  }

  updateGallery(userName:string, gallery:GalleryItem[]){
    localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
  }

  setUser(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }

  getUser(){
    const userSrt = localStorage.getItem('loggedUser');
    if(userSrt){
      const user = JSON.parse(userSrt);
      this.userSignal.set(user);
    }
    return this.userSignal;
  }

  saveUserToLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
