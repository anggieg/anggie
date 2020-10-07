# Microservice for Mitrais

# Built on : 
- NodeJS (ExpressJS)
- MongoDB (Stored in cloud with MongoDB Atlas)
- Redis as data cache storage

# API List : 
1. Generate authorization token : 
    - Method : GET
    - Endpoint : http://<host>:<port>/generateAuthToken

2. Get all users : 
    - Method : GET
    - Header : 
        * authToken: <auth token>
    - Endpoint : http://<host>:<port>/user

3. Create a user : 
    - Method : POST
    - Header : 
        * authToken: <auth token>
    - Endpoint : http://<host>:<port>/user
    - Request Data Type : JSON
    - Payload : 
        {
            "userName": <String username>,
            "emailAddress": <String email address>,
            "identityNumber": <Number identity number>,
        }

4. Update a user : 
    - Method : PATCH
    - Header : 
        * authToken: <auth token>
    - Endpoint : http://<host>:<port>/user/<userId>
    - Request Data Type : JSON
    - Payload : 
        {
            "userName": <String username>,
            "emailAddress": <String email address>,
            "identityNumber": <Number identity number>,
        }

5. Delete a user : 
    - Method : DELETE
    - Header : 
        * authToken: <auth token>
    - Endpoint : http://<host>:<port>/user/<userId>

6. Get a user by account number
    - Method : GET
    - Endpoint : http://<host>:<port>/user/getUserByAccNo/<account number>

7. Get a user by identity number
    - Method : GET
    - Endpoint : http://<host>:<port>/user/getUserByIdentityNo/<identity number>
