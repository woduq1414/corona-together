import {getCookie, API} from './api'

export const register = params => {
    console.log("SDFFFFFFFFFFFFFFFFFFF")
    return API.post(`/users`, params)
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
    ;

};

