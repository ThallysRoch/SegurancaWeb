async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:@localhost:3306/formulario-th");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
connect();

async function selectCustomers(username, password){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM loginsenha where login = ' + '"' + username + '"' + ' and senha = ' + '"' + password + '"');
    //console.log("chegou aqui");
    //console.log(customer);
    //console.log(rows)
    return rows

}

module.exports = {selectCustomers}