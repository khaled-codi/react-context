import React, { useContext } from 'react';
import SessionContext from '../components/session/SessionContext';

export default function Home() {

    const {
        session: { user: { first_name } }
    } = useContext(SessionContext);

    return (
        <div>
            <h1>This is the homepage</h1>
            <p>Hello {first_name}!</p>
        </div>
    )
}