import axios from 'axios';
import { OnlineRoot, RootPath } from './Config';

const Delete = (path, root = false, token = null) => {
    const promise = new Promise((resolve, reject) => {
        axios
            .delete(`${root ? OnlineRoot : RootPath}${path}`, {
                headers: {
                    Authorization: token == null ? null : `${token}`,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods':
                        'POST, GET, PUT,PATCH,DELETE,OPTIONS',
                    'Access-Control-Allow-Headers':
                        'Content-Type, Authorization',
                    'X-CSRF-TOKEN': document.head
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content'),
                },
            })
            .then(
                (result) => {
                    resolve(result);
                },
                (err) => {
                    reject(err);
                }
            );
    });

    return promise;
};

export default Delete;
