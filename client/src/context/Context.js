import { createContext, useState } from "react";

export const MyContext = createContext();

const Context = ({children}) => {
    const baseUrl = `http://192.168.0.192:8080`;
    const [isLogin, setLogin] = useState(false);
    const [user,setUser] = useState();

    return (
        <MyContext.Provider
            value={{
                isLogin,
                setLogin,
                user,
                setUser,
                baseUrl
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default Context;
