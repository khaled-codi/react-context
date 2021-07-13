import React, { useContext } from 'react';
import SessionContext from '../components/session/SessionContext';

export default function Profile() {

    const {
        session: { user }
    } = useContext(SessionContext);

    const { email, first_name, last_name, avatar } = user;

    return (
        <div className="profile">
            <h1>Info</h1>
            <img src={avatar} alt={`${first_name} avatar`} />
            <div>
                <b>Email</b>
                <p>{email}</p>
            </div>
            <div>
                <b>First Name</b>
                <p>{first_name}</p>
            </div>
            <div>
                <b>Last Name</b>
                <p>{last_name}</p>
            </div>
        </div>
    )
}