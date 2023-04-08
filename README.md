# jwtAuth
a project to authenticate users using json web token with passport and expressjs

# routes

  ## get
  
  ### /protected
    
    this endpoint can only be accessed if you have the bearer token
  
  ### /todo
    
    this endpoint redirects users to "/todo/:userId"
    
  ### /todo/:userId
  
    this endpoint shows the todos of users by using
    their user id as a foreign key to query the todos
 
 ### /profile
 
    this endpoint shows user their username as well as displaying
    their token(this endpoint is not accessible without the token)
    
 ## post
  note: all the POST request require a username and password
 
 ### /signup
 
    this endpoint makes new user
 
 ### /login
 
      the POST request essentially works by authenticating
      the username first with passportjs, if the username
      returns no user, an error will occur. If a user is found,
      it will then try to authenticate the password,
      if the password returns false, an error will occur,
      if not, the user will nowbe given an authorization token
      that can be use to access secure routes
      (all GET routes cannot be accessed without a token)
      
