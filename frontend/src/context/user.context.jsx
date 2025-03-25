import React, { createContext, useState } from "react";

//create the userContext
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}