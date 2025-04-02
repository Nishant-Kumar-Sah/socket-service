const dotenv = require('dotenv')    

dotenv.config();

module.exports={
    PORT:process.env.PORT || 3002,
    NODE_ENV:process.env.NODE_ENV,
    PROBLEM_ADMIN_SERVICE_URL: process.env.PROBLEM_ADMIN_SERVICE,
    SOCKET_SERVICE_URL:process.env.SOCKET_SERVICE,
    EVALUATOR_SERVICE_URL:process.env.EVALUATOR_SERVICE,
    SUBMISSION_SERVICE_URL:process.env.SUBMISSION_SERVICE
    
}