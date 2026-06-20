// this is used for state management ,store the data of the user,create loading when action is done

import { createContext , useState }from "react";

export const AuthContex = createContext();

export const  AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    
    return (
        <AuthContex.Provider value = {{loading ,setLoading ,user,setUser}}>
        {children}
        </AuthContex.Provider>
    )

}