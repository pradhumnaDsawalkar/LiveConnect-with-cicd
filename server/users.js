//Here will be helper functions help us to manage users joining in,signing out ,removing users,adding users,etc

const users=[];

const addUser=({id,name,room,language})=>{
//ex.Pradhumna Sawalkar = pradhumnasawalkar

name=name.trim().toLowerCase();
room=room.trim().toLowerCase();
language=language.trim().toLowerCase();

const existingUser=users.find((user)=>user.room === room && user.name===name && user.language === language);

if(existingUser){
    return {error:'User is already exist'};
    }

    //If no
    const user={id,name,room,language};
    
    users.push(user);

    console.log("User added",user)
   
    return {user};
}

const removeUser=(id)=>{

const index=users.findIndex((user)=>
    user.id===id
);

if(index!==-1){
    console.log("User Removed");
    return users.splice(index,1)[0];
}

return null;
}

const getUser=(id)=>{
const u=users.find((user)=>
    user.id===id
)
console.log(u);
return u;
}

const getUsersInRoom=(room)=>{
return users.filter((user)=>user.room===room);
};


module.exports={addUser,removeUser,getUser,getUsersInRoom};