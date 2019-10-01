export default {
    mongodb: {
        uri: 'mongodb://127.0.0.1:27017/limitless'
    },
    server: {
        url: 'localhost',
        port: 3650
    },
    client:{
        site: 'http://localhost:4550',
    },
    token: {
        secret: 'limitless',
        secret_client: 'limitless-client',
        secret_client_confirm: 'limitless-client-confirm',
        secret_passwordreset_client: 'limitless-passwordreset_client',
        secret_passwordreset_user:   'limitless-passwordreset_user'
    },
    mailling:{
        username: "",
        password: "",

        contact: {
            mail: "contactlimitless@gmail.com"
        }
    },
    constants: {

    },
    debug: {
        mode: "dev",
    }

};
