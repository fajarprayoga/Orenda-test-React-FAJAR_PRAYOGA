import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Box, Button, Divider, TextField } from '@mui/material';
import RequestApi from '../../services';
import { Alert } from '@mui/joy';
import { useNavigate, useParams } from 'react-router';

function Create() {
    const navigate = useNavigate();
    const TOKEN = JSON.parse(localStorage.getItem('TOKEN'));
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });

    const [response, setResponse] = useState({
        message: '',
        color: 'danger',
    });

    useEffect(() => {
        if (id) {
            RequestApi.getCustomer(TOKEN, id)
                .then((res) => {
                    setFormData({
                        name: res.data.name,
                        phone: res.data.phone,
                        email: res.data.email,
                        address: res.data.address,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    const onChangeForm = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (
            formData.name &&
            formData.phone &&
            formData.email &&
            formData.address
        ) {
            if (id) {
                console.log('update');
                RequestApi.editCustomer(TOKEN, formData, id)
                    .then((res) => {
                        setResponse({
                            message: 'User Updated',
                            color: 'primary',
                        });

                        // navigate(`/update/${res.data.id}`);
                    })
                    .catch((err) => {
                        setResponse({
                            message: err.response.data.message,
                            color: 'danger',
                        });
                    });
            } else {
                RequestApi.createCustomer(TOKEN, formData)
                    .then((res) => {
                        setResponse({
                            message: 'User Created',
                            color: 'primary',
                        });

                        navigate(`/update/${res.data.id}`);
                    })
                    .catch((err) => {
                        setResponse({
                            message: err.response.data.message,
                            color: 'danger',
                        });
                    });
            }
        }
    };

    return (
        <div>
            <Layout breadcrum={`${id ? 'Edit customer' : 'Add customer'}`}>
                <div>
                    <h1 className='mb-4'> Customer Information </h1>
                    {response.message != '' && (
                        <Alert className='mb-4' color={response.color}>
                            {response.message}
                        </Alert>
                    )}
                    <form className='md:h-96' onSubmit={onSubmit}>
                        <div className='flex flex-col md:flex-row flex-1 gap-4 h-80'>
                            <div className='flex flex-col gap-4  flex-1'>
                                <TextField
                                    label='Customer Name'
                                    fullWidth
                                    required
                                    type='text'
                                    value={formData.name}
                                    onChange={(value) =>
                                        onChangeForm('name', value.target.value)
                                    }
                                />
                                <div className='flex gap-4'>
                                    <TextField
                                        label='Phone Number'
                                        fullWidth
                                        required
                                        type='number'
                                        value={formData.phone}
                                        onChange={(value) =>
                                            onChangeForm(
                                                'phone',
                                                value.target.value
                                            )
                                        }
                                    />
                                    <TextField
                                        label='Email Address'
                                        fullWidth
                                        required
                                        type='email'
                                        value={formData.email}
                                        onChange={(value) =>
                                            onChangeForm(
                                                'email',
                                                value.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className=' flex items-center flex-col flex-1 h-full'>
                                <TextField
                                    label='Address'
                                    multiline
                                    rows={4}
                                    variant='outlined'
                                    style={{ flex: 1 }}
                                    fullWidth
                                    required
                                    type='text'
                                    value={formData.address}
                                    onChange={(value) =>
                                        onChangeForm(
                                            'address',
                                            value.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className='flex justify-end py-3 gap-x-2'>
                            <Button
                                variant='outlined'
                                type='reset'
                                className='w-36'
                                style={{ color: 'black', borderColor: 'black' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                type='submit'
                                className='w-36'
                                color='error'
                            >
                                {`${id ? 'Edit' : 'Create New'}`}
                            </Button>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    );
}

export default Create;
