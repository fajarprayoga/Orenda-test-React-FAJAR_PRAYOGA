import axios from 'axios';
import { OnlineRoot, RootPath, Source } from './Config';

const Get = (path, root, token = null) => {
    const promise = new Promise((resolve, reject) => {
        axios
            .get(`${root ? OnlineRoot : RootPath}${path}`, {
                headers: {
                    cancelToken: Source.token,
                    Authorization: token == null ? null : `${token}`,
                    Accept: 'application/json',
                },
            })
            .then(
                (result) => {
                    resolve(result.data);
                },
                (err) => {
                    reject(err);
                }
            );
    });
    return promise;
};

export default Get;
