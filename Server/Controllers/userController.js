import { getAllUsersService, createUsersService } from "../Services/usersServices.js";

export const getAllUsersController = async (req,res) => {
    try {
        //make a request to our database
        const request = await getAllUsersService();

        //check if our request has something
        if (request.length === 0) {
            return res.status(404).json({message: "users not found"});
          } 
        else{
            return res.status(201).json({ message: "All users", request });
          }
    } catch (error) {
        throw new Error(`Error getting all users`);
    }
};

export const createUsersController = async (req,res) => {
    try {
        //extract user data from our request body
        const userData = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            PasswordHash: req.body.PasswordHash
        };

        //make a request to our database
        const request = await createUsersService(userData);
        return res.status(201).json({ message: "user created successfully", request });
        
    } catch (error) {
        throw new Error(`Error creating a new user`);
    }
};