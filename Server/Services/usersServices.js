import { poolRequest , sql } from "../Utills/config.js";
import { insertDataTo_DB, ifEmailExists, passwordHasher, schemaValidator } from "../Helpers/helperFunctions.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllUsersService = async() => {
    try {
        const result = await poolRequest().query("SELECT * FROM Real_Time_Users");

        return result.recordset;

    } catch (error) {
        throw new Error(`Error getting all users`)
    }
};

export const createUsersService = async (newUserData) => {
    try {

        const createUserSchema = {
            FirstName: sql.VarChar(255),
            LastName: sql.VarChar(255),
            Email: sql.VarChar(255),
            PasswordHash: sql.VarChar(255)
        };

        //ensure that the recievd data matches our schema 
        schemaValidator(newUserData, createUserSchema);

        // destructure newUserData
        const {Email, PasswordHash, ...moreData} = newUserData;

        
        //check is the email already exists
        const existingMail = await ifEmailExists(Email);
        if(existingMail){
            throw new Error("Email already exists");
        }
        
        //hash the user password
        const password = await passwordHasher(PasswordHash);

        //prepare user data for insertion to the database
        const uniqeID = uuidv4();
        const userData = {
            User_Id: uniqeID,
            FirstName: moreData.FirstName,
            LastName: moreData.LastName,
            Email: Email,
            PasswordHash : password
        };


        //insert the data into the database 
        insertDataTo_DB("Real_Time_Users", userData);

    } catch (error) {
        throw new Error(`Error creating a new user`)
    }
};