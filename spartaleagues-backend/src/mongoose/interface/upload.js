import _ from 'lodash';
import logger from "./../../utils/logger";

import Express from 'express';
import { Model } from 'mongoose';

//import User from './../../mongoose/models/user';


/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 * @param {MongooseDb} mongooseDb ,
 *     or itemId, or null to search everything.
 */


export default (app) => {

    //let interfaceDbModel_User = User;


    // /**
    //  * 
    //  * @param {Model} Model
    //  * @param {string} pKey
    //  * @param {string} value
    //  */
    // let find = async (Model, query, value) => {

    //     console.log("Interface: ", Model, ' , ', query, ' , ', value);
        
    //     let promise = new Promise((resolve, reject) => {

    //         try {

    //             console.log({ query: value });
                
    //             Model.findOne({ "query": value }, (err, result)=> {
                    
    //                 if (err) return res.status(500).send("There was a problem finding ", query);
                    
    //                 if(result) {
    //                     resolve(result);
    //                 } else {
    //                     resolve(null);
    //                 }
    //             });

    //         } catch (err) {

    //             logger.error("error in UploadCtrl.find {}", err);
    //             throw err;
    //         }

    //     });

    //     let callback = await promise;
    //     console.log("callback upload find: ", callback);
    //     return callback;

    // }




    /**
     * 
     * @param {Model} Model 
     */
    let add = async (Model) => {

        let promise = new Promise((resolve, reject) => {

            console.log("Interface: ", Model);

            try {

                //Add user in Database
                Model.save((err, obj) =>{

                    if (err) throw err;

                    if(obj) {
                        resolve(obj);

                    } else {
                        resolve(null);
                    }
                });

            } catch (err) {

                logger.error("error in Upload.add {}", err);
                throw err;
            }

        });

        
        let callback = await promise;
        console.log("callback Add upload: ", callback);
        return callback;

    };



    return {
        //find: find,
        add: add,
        //get: get
    };

}