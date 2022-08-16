const { tambahBukuWibu } = require('./handler');

const routes = [

    {
        method: 'POST',
        path: '/mangga',
        handler: tambahBukuWibu,
    },
    // {
    //     method: 'GET',
    //     path: '/mangga',
    //     //, handler: lihatBukuWibu,
    // },
    // {
    //     method: 'GET',
    //     path: '/mangga/{manggaid}',
    //     // handler: lihatBukuWibu,
    // },
    // {
    //     method: 'PUT',
    //     path: '/mangga/{manggaid}',
    //     // handler: lihatBukuWibu,
    // },
    // {
    //     method: 'DELETE',
    //     path: '/mangga/{manggaid}',
    //     // handler: lihatBukuWibu,
    // }
]

module.exports = routes;