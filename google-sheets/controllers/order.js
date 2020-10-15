const {google} = require('googleapis');
const client = require('../google/index');


exports.getOrder = (req, res) => {

    const orderData = req.body;
    const order = [];
    
    

    const number = gsGetRows(client).then(res =>{
        const ls = [];
        const num = res+1;
        ls.push(String(num));

        for( const [key, value] of Object.entries(orderData)){
            ls.push(value);
        }
    
        console.log(ls);
        order.push(ls);

        addOrder(client, num, order).then(res =>{
            console.log(res);
        }).catch(e => {
            console.log(e)
        })
    }).catch( e => {
        console.log(e);
    });

    
   
    res.status(200).json({
        message: 'Good'
    })
}


async function gsGetRows(cl){

    const  gsapi = google.sheets({version: 'v4', auth: cl});

    const opt = {
        spreadsheetId: '1wwxYtny-dZRXCMaBSPIZ1KMgtH_YLjxKWlccHjmkCAc',
        range: 'ORDER DATA!A2:L10'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;

    return dataArray===undefined ? 0 : dataArray.length;
}


async function addOrder(cl, number, order){

    const  gsapi = google.sheets({version: 'v4', auth: cl});

    const resource = {
        values: order
    }
    const opt = {
        spreadsheetId: '1wwxYtny-dZRXCMaBSPIZ1KMgtH_YLjxKWlccHjmkCAc',
        range: `ORDER DATA!A${number+1}:L${number+1}`,
        valueInputOption: 'RAW',
        resource: resource
    };

    let data = await gsapi.spreadsheets.values.update(opt, 
        (err, result) => {
            if(err) console.log(err);
            else { console.log('%d Updated!', result.updatedCells)}
        });
}


