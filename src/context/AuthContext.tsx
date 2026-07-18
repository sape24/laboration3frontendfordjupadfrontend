import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Provider som delar autentiseringstillstånd med hela appen
export function AuthProvider({ children }: {children: ReactNode}) {

    //Läser in token och användarnamn från localStorage vid start
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));

    //Sparar token och användarnamn vid inloggning
    const login = (newToken: string, newUsername: string) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', newUsername);
        setToken(newToken);
        setUsername(newUsername);
    };

    //Rensar token och användarnamn vid utloggning
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
    };

    const isLoggedIn = token !== null;

    return (
        <AuthContext.Provider value={{ token, username, login, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

//CUstom hook för att komma åt autentiseringstillståndet
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth måste användas inuti en AuthProvider');
    }

    return context;
}