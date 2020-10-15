const {google} = require('googleapis');

const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null, 
    keys.private_key, 
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('Connected!');
        gsrun(client)
    }
})


async function gsrun(cl){

    const  gsapi = google.sheets({version: 'v4', auth: cl});

    const opt = {
        spreadsheetId: '1wwxYtny-dZRXCMaBSPIZ1KMgtH_YLjxKWlccHjmkCAc',
        range: 'ORDER DATA!A1:L1'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;

    let newDataArray = dataArray.map(function(r){
        return r.push()
    })
}