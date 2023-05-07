import Get from './Get';
import Post from './Post';

import { useSelector } from 'react-redux';
import Put from './Put';
import Delete from './Delete';

// Get
const users = () => Get('/api/user', false);

// POST
const auth = (auth) => Post('/api/auth/login', false, auth);

const jwtToken = (email) => Get('/jwt/get-token/' + email, false);
const getCustomer = (token, id = '', query = '') =>
    Get(
        `/customer/${id}?page=${query.page}&limit=${query.limit}${query.searchName ? `&name=${query.searchName}` : ''}${query.searchPhone ? `&phone=${query.searchPhone}` : ''}`,
        false,
        token
    );

const createCustomer = (token, customer) =>
    Post('/customer', false, customer, token);
const editCustomer = (token, customer, id) =>
    Put(`/customer/${id}`, false, customer, token);

const deleteCustomer = (token, id) => Delete(`/customer/${id}`, false, token);

const RequestApi = {
    auth,
    users,
    jwtToken,
    getCustomer,
    createCustomer,
    editCustomer,
    deleteCustomer,
};
export default RequestApi;
