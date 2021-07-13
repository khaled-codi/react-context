import React, { useContext, useState } from 'react';
import SessionContext from '../components/session/SessionContext';

export default function Login() {

    const {
        actions: { login }
    } = useContext(SessionContext);

    const [state, setValue] = useState({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
    });

    const { email, password } = state;

    function setState(nextState) {
        setValue(prevState => ({
            ...prevState,
            ...nextState
        }))
    }

    function handleChange(e) {
        let { name, value } = e.target;
        setState({ [name]: value });
    }

    async function handleSubmit(e) {
        e.nativeEvent.preventDefault();
        login(state);
    }

    return (
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}