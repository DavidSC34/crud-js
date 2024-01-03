import { User } from "../models/user";
import { userModelToLocahost } from "../mapers/user-to-localhost.mapper";
import { localhostUserToModel } from "../mapers/localhost-user.mapper";

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async( userLike)=>{
      
    const user = new User(userLike);

    if(!user.firstName || !user.lastName)
    throw 'First & Last name are required';

    const userToSave = userModelToLocahost(user);
    let userUpdated;//para maperarlo un opbjeto USer y pintarlo en el frontend
  

    if( user.id){
        userUpdated = await updateUser(userToSave);
    }else{
        userUpdated = await createUser(userToSave);
    }
    //Capa extra para preparse para cambios en el backend
   return localhostUserToModel(userUpdated);
}
/**
 * 
 * @param {Like<User>} user 
 */
const createUser= async( user)=>{
   
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url,{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();   

    return newUser;
}
/**
 * 
 * @param {Like<User>} user 
 */
const updateUser= async( user)=>{
   
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url,{
        method:'PATCH',
        body:JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();
    console.log({updatedUser});

    return updatedUser;
}