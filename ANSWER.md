 What is the purpose of using sessions?
 It helps to keep the user data stored  in the clientside so that we don't have to hash the password everytime we make a request
 What does bcrypt do to help us store passwords in a secure manner.
    Bcrypt hash the password. Hashing is one way street what that means is you can always create same hash with same word but you can't create a same word with same hash. 
 What does bcrypt do to slow down attackers?
    It add time complexity to slow down the attackers. It hashes the hashed password many times over and it gets difficult to hack it.
 What are the three parts of the JSON Web Token?
    Header, Payload, Verify Signature are the 3 parts.