
export default {
    isProduction: () => {
        //console.log("Config File NODE_ENV = ", process.env.NODE_ENV);
        return process.env.NODE_ENV.trim() === "production" ? true : false;
    },
    apiPort: () => {
        return parseInt(process.env["API_PORT"]);
    },
    DBType: ()=> {
        return process.env.DB_TYPE;
    },
    mongooseDBName: () => {
        return process.env.DB_NAME;
    },
    mongooseDBUsername:()=>{
        return process.env.DB_USERNAME;
    },
    mongooseDBPassword: ()=>{
        return process.env.DB_PASSWORD;
    },
    mongooseDBHost: () => {
        return process.env.DB_HOST;
    },
    mongooseDBPort: () => {
        return process.env.DB_PORT;
    },
    mongooseDBSecret: () => {
        return process.env.DB_SECRET;
    },
    getMongooseDBUrl: () => {
        if(process.env.NODE_ENV === "production") {
            return process.env.DB_TYPE+'://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
        } else {
            return process.env.DB_TYPE+'://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
        }
    },

}