const { tambahBukuWibu, lihatsemuaBukuWibu, lihatBukuWibu, ubahBukuWibu } = require('./handler');

const routes = [

    {
        method: 'POST',
        path: '/mangga',
        handler: tambahBukuWibu,
    },
    {
        method: 'GET',
        path: '/mangga',
        handler: lihatsemuaBukuWibu,
    },
    {
        method: 'GET',
        path: '/mangga/{manggaid}',
        handler: lihatBukuWibu,
    },
    {
        method: 'PUT',
        path: '/mangga/{manggaid}',
        handler: ubahBukuWibu,
    },
    // {
    //     method: 'DELETE',
    //     path: '/mangga/{manggaid}',
    //     // handler: lihatBukuWibu,
    // }
]

module.exports = routes;