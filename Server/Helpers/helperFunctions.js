import { sql, poolRequest } from "../Utills/config.js";
import bcrypt from 'bcrypt'


//helper function to add data into database
export const insertDataTo_DB = async (tableName, data) => {
    try {
        // Dynamically build column names and parameter placeholders
        const Columns = Object.keys(data).map((column) => `[${column}]`).join(",");
        const Values = Object.keys(data).map((column) => `@${column}`).join(",");

        // SQL insert query
        const insertQuery = `
            INSERT INTO ${tableName} (${Columns})
            VALUES (${Values});
        `;

        // Prepare the insert data request
        const request = poolRequest();



        // Add values as parameters to avoid SQL injection
        Object.entries(data).forEach(([key, value]) => {
            request.input(key, value); // Bind each value as a parameter
        });

        // Query the database
        return await request.query(insertQuery);

    } catch (error) {
        throw new Error("Data insertion failed: " + error.message);
    }
};

//helper to check if email exists with better logs 
export const ifEmailExists = async (email) => {

    // Regular expression for validating email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Validate email format
    if (!emailRegex.test(email)) {
        throw new Error("Email format is incorrect");
    }

    /**
     * ALWAYS REMEMBER TO CEHCK FROM THE CORRECT TABLE NAME 
     */
    // Query to check if email exists
    const emailCheckQuery = `
        SELECT 1
        FROM Real_Time_Users
        WHERE Email = @Email
    `;

    try {
        // Prepare a request and query the database
        const result = await poolRequest()
            .input('Email', sql.VarChar(255), email)
            .query(emailCheckQuery);

        
        // Return true if email exists, otherwise false
        return result.recordset.length > 0;

    } catch (error) {
        throw new Error("Failed to query the database");
    }
};


//helper function to hash a password
export const passwordHasher = async (password) =>{
    return await bcrypt.hash(password,10);
};

//helper function to compare data with our schema
export const schemaValidator = async (insertData, schemaObject) =>{
    //extract insertData and schemaObject keys
    const insertDataKeys = Object.keys(insertData);
    const schemaObjectKeys = Object.keys(schemaObject);

    //check for invalid keys in inserDataKeys that are not in schemaObjectKeys
    const invalidInsertDataKeys = insertDataKeys.filter(key => !schemaObjectKeys.includes(key));

    if (invalidInsertDataKeys.length > 0){
        throw new Error("Schema Validation Failed");
    }

    return true;
};