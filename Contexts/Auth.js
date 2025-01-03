import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveSession,getSession,clearSession } from './Session';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authDetails, setAuthDetails] = useState(null);

    useEffect(() => {
        const initializeSession = async () => {
            const session = await getSession();
            if (session && session.UserID) {
                setAuthDetails(session);
            }
        };
        initializeSession();
    }, []);

    const login = async (responseData) => {
        setAuthDetails(responseData);
        await saveSession(responseData);
    };

    const logout = async () => {
        setAuthDetails(null);
        await clearSession();
    };

    return (
        <AuthContext.Provider value={{ authDetails, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
