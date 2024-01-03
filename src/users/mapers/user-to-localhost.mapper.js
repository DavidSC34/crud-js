import { User } from "../models/user"
/**
 * 
 * @param {User} user 
 */
export const userModelToLocahost = (user)=>{

    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName,        
    } = user;
    //el objeto como lo espera el backend
    return{
        avatar,
        balance,
        first_name:firstName,
        gender,
        id,
        isActive,
        last_name:lastName, 
    }
}