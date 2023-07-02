import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../auth/context/AuthContext'
import {Navigate} from 'react-router-dom';
import Swal from 'sweetalert2';

export const PrivateRouter = ({children}) => {
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No esta iniciado Sesión',
            }).then(() => window.location.href = '/auth')
        }
    })

    const {logged} = useContext(AuthContext);

    return logged ? children : <Navigate to="/auth/*"/>
}