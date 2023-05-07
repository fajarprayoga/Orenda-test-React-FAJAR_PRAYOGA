import { Alert, Button, Input } from '@mui/joy';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RequestApi from '../../services';
import { setuser } from './slice/userSlice';
import { useNavigate } from 'react-router-dom';
function Login() {
    const USER_REDUCER = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('customer@orenda.com');

    const [response, setResponse] = useState({
        message: '',
        color: 'danger',
    });

    // const onChangeemail = (name, value) => {
    //     setEmail(email);
    // };

    const login = (event) => {
        event.preventDefault();

        if (email != '') {
            RequestApi.jwtToken(email)
                .then((res) => {
                    dispatch(setuser(res.data));
                    localStorage.setItem('TOKEN', JSON.stringify(res.data));

                    setResponse({
                        message: 'success',
                        color: 'primary',
                    });

                    navigate('/home');
                })
                .catch((e) => {
                    let error = JSON.parse(e.request.responseText);
                    setResponse({
                        message: error.message,
                        color: 'danger',
                    });
                });
        } else {
            setResponse({
                message: 'Email not null',
                color: 'red',
            });
        }
    };

    return (
        <section className='bg-gray-50 dark:bg-gray-900'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                {response.message != '' && (
                    <Alert className='mb-4' color={response.color}>
                        {response.message}
                    </Alert>
                )}
                <form onSubmit={login}>
                    <Input
                        placeholder='email user'
                        value={email}
                        onChange={(value) => setEmail(value.target.value)}
                        className='mb-4'
                    />
                    <Button type='submit'>Submit</Button>
                </form>
            </div>
        </section>
    );
}

export default Login;
