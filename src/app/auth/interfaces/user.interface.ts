export interface User{
    userName:string;
    password:string;
    email:string;
    role:string;
    profilePicture?:string;
    propertiesList?:[string]
}