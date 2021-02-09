export const ADDPRESS = 'ADDPRESS';
export const DELETEUSER = 'DELETEUSER';

 export const addPress = (name, score)=>({
     type:ADDPRESS,
     name:name,
     score:score

 })

 export const deleteUser = (userId)=>({
    type:DELETEUSER,
    id:userId
})
