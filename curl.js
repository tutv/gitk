var unirest = require('unirest');

var Request = unirest.get('https://bitbucket.org/site/oauth2/authorize?client_id=MEuemHGp624aGbk3JL&response_type=L6LsMRaqd2uSWDLjCE');

Request
    .end(function (response) {
        console.log(response.headers );
    });