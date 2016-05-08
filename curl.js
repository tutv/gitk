var unirest = require('unirest');

unirest.post('https://bitbucket.org/site/oauth2/access_token')
    .oauth({
        consumer_key: 'MEuemHGp624aGbk3JL',
        consumer_secret: 'KA5yYJeKCxDGPghgeRTczNftKuUMnqCX'
    })
    .send({grant_type: 'authorization_code', code: '7cTjs8BSSNtWpasyxM'})
    .end(function (response) {
        console.log(response.raw_body);
    });