import React, { useState } from 'react';
import { useUserContext } from '../UserContext/UserContext';

const LogOut = () => {
    const { logOut } = useUserContext();
    logOut();
    return (
        <></>
    );

}

export default LogOut