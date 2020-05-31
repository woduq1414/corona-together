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


export const GetWordcloud = (param) => {
    function _imageEncode(arrayBuffer) {
        let u8 = new Uint8Array(arrayBuffer)
        let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) {
            return p + String.fromCharCode(c)
        }, ''))
        let mimetype = "image/jpeg"
        return "data:" + mimetype + ";base64," + b64encoded
    }

    return API.get(`/data/wordcloud?tagName=${param.tagName}`, { responseType: 'arraybuffer' })
        .then((response) => {
            response.data = _imageEncode(response.data)
            return response
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


