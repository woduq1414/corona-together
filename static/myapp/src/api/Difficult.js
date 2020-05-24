import {getCookie, API} from './api'

export const WriteDifficult = value => {
    console.log("SDFFFFFFFFFFFFFFFFFFF")
    return API.post(`/difficult`, value)
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

export const GetDifficult = value => {

    return API.get(`/difficult?tagName=${value.tagName}`)
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


export const DeleteDifficult = value => {

    return API.post(`/difficult/delete`, value)
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