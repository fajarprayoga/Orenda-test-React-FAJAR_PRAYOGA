import React, { useEffect, useState } from 'react';
import RequestApi from '../../services';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { Button } from '@mui/material';
import Mytable from './component/Table/MyTable';
import { useNavigate } from 'react-router';
import { Alert } from '@mui/joy';

function Home() {
    var TOKEN = '';
    const [user, setUser] = useState();
    const [meta, setMeta] = useState();
    const [searchName, setSearchName] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [response, setResponse] = useState({
        message: '',
        color: 'danger',
    });
    const navigate = useNavigate();
    const persistedData = localStorage.getItem('TOKEN');
    if (persistedData) {
        TOKEN = JSON.parse(persistedData);
    }
    const getDataCustomer = (query) => {
        if (TOKEN) {
            RequestApi.getCustomer(TOKEN, '', query)
                .then((res) => {
                    console.log(res);
                    setUser(res.data);
                    setMeta(res.meta);
                })
                .catch((e) => console.log(e.requestresponseText));
        }
    };

    const handleDelete = (id) => {
        console.log(TOKEN);
        RequestApi.deleteCustomer(TOKEN, id)
            .then((res) => {
                console.log(res);
                setResponse({
                    message: 'Customer deleted',
                    color: 'primary',
                });

                getDataCustomer();
            })
            .catch((err) => {
                setResponse({
                    message: err.response.data.message,
                    color: 'danger',
                });
            });
    };

    const handleFilter =  (field, value) => {
        if(field == 'name'){
            const name = value
            setSearchName(name)
        }

        if(field == 'phone'){
            const phone = value
            setSearchPhone(phone)
        }

        // getDataCustomer({searchName, searchPhone})
    }

    useEffect(() => {
        setTimeout(() => {
            getDataCustomer({searchName, searchPhone})
        }, [1000])
    }, [searchName, searchPhone])

    useEffect(() => {
        getDataCustomer();
        // RequestApi.getCustomer(TOKEx)
    }, []);

    return (
        <Layout>
            <div>
                <div className='flex justify-between '>
                    <h1>All Customer</h1>
                    <Button
                        color='error'
                        variant='contained'
                        onClick={() => navigate('/create')}
                    >
                        + Add New Customer
                    </Button>
                </div>
                {response.message != '' && (
                    <Alert className='my-4' color={response.color}>
                        {response.message}
                    </Alert>
                )}
                <div className='mt-10'>
                    {user && (
                        <Mytable
                            myData={user}
                            meta={meta}
                            getData={getDataCustomer}
                            rowPage={10}
                            funcDelete={handleDelete}
                            filter={handleFilter}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Home;
