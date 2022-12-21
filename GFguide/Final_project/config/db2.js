import knex from 'knex';

const db2 = knex({
    client: 'pg',
    connection: {
    host : 'localhost', 
    port : '5432', 
    user : 'postgres', 
    password : 'postgres', 
    // database : 'gfguide',
    database : 'dbtest',
    }
})

export default db2