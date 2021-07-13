import React, { useState, useEffect } from 'react';
import SessionContext from './SessionContext';
import { setCookie, getCookie, removeCookie } from '../../cookies';
import { toast } from 'react-toastify';

export default function PackageProvider({ children }) {

    const [session, setValue] = useState({
        user: {
            token: getCookie('token')
        }
    });

    function updateSession(nextSession) {
        let value = typeof nextSession === "function" ?
            nextSession : prevSession => ({ ...prevSession, ...nextSession });
        setValue(value);
    }

    function initializeSession() {
        let token = getCookie('token');
        if (token) fetch('https://reqres.in/api/users/4', {
            headers: {
                'token': token
            }
        }).then(res => res.json()).then(res => {
            let user = { ...res.data, token };
            updateSession({ user });
        });
    }

    async function login({ email, password }) {

        // try to login
        let { error, token } = await fetch('https://reqres.in/api/login', {
            method: "post",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json());

        // return from the function if you have an error
        if (error || !token) return toast.error(error);

        // get the data of the loggedin user
        let result = await fetch('https://reqres.in/api/users/4', {
            headers: {
                'token': token
            }
        }).then(res => res.json());

        let user = { ...result.data, token };

        setCookie('token', token);
        updateSession({ user });
        toast(`Welcome ${user.first_name}!`);
    }

    function logout() {
        updateSession({ user: { token: null } });
        removeCookie('token');
    }

    useEffect(() => {
        initializeSession();
    }, []);

    const context = {
        session,
        actions: {
            login,
            logout
        }
    }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}