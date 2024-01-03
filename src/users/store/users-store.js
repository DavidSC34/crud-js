import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage:0,
    users:[],
}

const loadNextPage = async()=>{
   const users= await loadUsersByPage( state.currentPage +1);
   if( users.length === 0) return;

   state.currentPage += 1;
   state.users = users;
   
}

const loadPreviousPage = async()=>{
   if( state.currentPage === 1) return;
   const users= await loadUsersByPage( state.currentPage - 1);
   state.currentPage -= 1;
   state.users = users;
}
/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = (updatedUser)=>{
    let wasFound = false;    

    state.users = state.users.map( user=>{
        if( user.id === updatedUser.id){
            wasFound = true;
            return updatedUser;//lo actualiza
        }
        return user;
    });
    //Piuede ser que no exista el usuario o este vacio y sea menos de 10 usuarios, entonces
    //insertarlo ( siemopre y cuando se encontro o no en el anterior proceso)
    if( state.users.length < 10 && !wasFound){
        state.users.push(updatedUser);
    }

}

const reloadPage = async()=>{
    throw new Error('Not implemented');
}

export default{
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    /**
     * 
     * @returns {User[]}
     */
    getUsers: ()=> [...state.users],
    /**
     * @returns {Number}
     */
    getCurrentPage: ()=>{ return state.currentPage},
}