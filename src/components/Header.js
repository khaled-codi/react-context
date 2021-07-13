import React, { useContext } from 'react';
import SessionContext from './session/SessionContext';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export default function Header() {

    const {
        session: { user: { token, avatar, first_name } },
        actions: { logout }
    } = useContext(SessionContext);

    return (
        <header>

            <Link to="/">
                <img src={logo} className="logo" alt="logo" />
            </Link>

            {token && (
                <div className="nav">
                    <Link to="/profile">
                        <img
                            src={avatar}
                            alt={`${first_name} avatar`}
                            className="avatar"
                        />
                    </Link>
                    <button onClick={logout}>logout</button>
                </div>
            )}

        </header>
    )
}