const jwt = require('jwt-simple');
const jwt2 = require('jsonwebtoken');

const token = jwt2.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJ1c2VybmFtZSI6Im15dGhyaWwifSwiaWF0IjoxNjQ3OTYzMDcxfQ.WEKu9RQiT3UkMRA9qAvuc-GkMRAD-1lYm6CRtu0k4-Y','gila')

const decodedToken = jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJ1c2VybmFtZSI6Im15dGhyaWwifSwiaWF0IjoxNjQ3OTYzMDcxfQ.WEKu9RQiT3UkMRA9qAvuc-GkMRAD-1lYm6CRtu0k4-Y', 'gila')

console.log(decodedToken)

console.log(token)

