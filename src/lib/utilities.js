import moment from 'moment';
import axios from 'axios';
import {SITESETTINGS} from "./_site";
import queryString from 'query-string';

const formatDateString = (str) => {
    return moment(str).format('LLL');
};

const calculateA1c = (average_blood_glucose) => {
    return (46.7 + average_blood_glucose) / 28.7
};

const session = {
    set   : (session) => {
        if ( !sessionStorage.getItem('session') ) {
            sessionStorage.setItem('session', session);
        }
        else {
            delete sessionStorage.session;
            sessionStorage.setItem('session', session);
        }
    },
    get   : () => {
        return sessionStorage.getItem('session');
    },
    verify: (session) => {
        return axios(
            {
                url    : `${SITESETTINGS.backendUrl}/auth.verify`,
                method : 'put',
                headers: {session}
            }
        )
            .then(res => res)
            .catch(err => err);
    }
};

const ajax = (cfg) => {
    let ajaxCfg = {
        url    : `${SITESETTINGS.apiUrl}/${cfg.endPoint}`,
        method : cfg.method,
        headers: {session: session.get()}
    };

    if ( cfg.raw === true ) {
        ajaxCfg.url = `${SITESETTINGS.backendUrl}/${cfg.endPoint}`;
    }
    else {
        ajaxCfg.url = `${SITESETTINGS.apiUrl}/${cfg.endPoint}`;
    }

    if ( cfg.method.toLowerCase() === 'get' && typeof cfg.data === 'object' ) {
        const query = queryString.stringify(cfg.data);
        ajaxCfg.url += `?${query}`;
    }

    if ( cfg.method.toLowerCase().match(/(post|put)/) && typeof cfg.data === 'object' ) {
        ajaxCfg.data = cfg.data;
    }

    //console.log("ajax => ", ajaxCfg)

    return axios(ajaxCfg).catch(err => window.location = window.location.href);
};

export {
    formatDateString,
    calculateA1c,
    session,
    ajax
};