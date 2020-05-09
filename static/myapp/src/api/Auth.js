import {getCookie, API} from './api'

export const getToken = params => {
    console.log("SDFFFFFFFFFFFFFFFFFFF")
    return API.post(`/auth?id=${params.id}&password=${params.password}`)
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

export const GetMyIdentity = () => {
    let accessToken = getCookie("access_token")
    const config = {
        headers: {Authorization: `Bearer ${accessToken}`}
    };
    return API.get(`/auth`, config)
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