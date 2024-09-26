import sql from "mssql"
import dotenv from 'dotenv'

dotenv.config();

const { SQL_USER, SQL_PASSWORD, SQL_SERVER, SQL_DB, SQL_SERVER_PORT, SQL_ENCRYPT, SQL_TRUST_SERVER_CERTIFICATE } = process.env;

const sqlConfig = {
    user: SQL_USER,
    password: SQL_PASSWORD,
    server: SQL_SERVER,
    database: SQL_DB,
    port: Number(SQL_SERVER_PORT),
    options: {
      encrypt: Boolean(SQL_ENCRYPT),
      trustServerCertificate: Boolean(SQL_TRUST_SERVER_CERTIFICATE)
    }
  };

let appPool;
let poolRequest;

try {
    appPool = await sql.connect(sqlConfig);
    /**
     * if we leave out ()=> below
     * poolRequest is going to throw an error that its not a function
     */
    poolRequest = ()=> appPool.request();

    if(appPool){
        console.log("connected to sql server");
    };

} catch (error) {
    throw new Error(`Error connecting to the database`)
};

export{poolRequest, sql};
