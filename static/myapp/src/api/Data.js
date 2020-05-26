import {getCookie, API} from './api'


export const GetData = () => {

    return API.get(`/data`)
        .then((response) => {

            return response;
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.log("request", error.request);
                return "timeout"
            } else {
                console.log('Error', error.message);
            }
        });


};


