import Router from 'express';
import _ from 'lodash';

import { DbMongooseUpload } from './../../mongoose/interface';
const Post = require('../../mongoose/models/post');


export default (app) => {

    let router = Router();

    let dbMongooseUpload = DbMongooseUpload(app);


    /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next 
    */

    
    /* Add Posts */
    let add = async (req, res, next) => {

        console.log(req.body.heading);

        req.checkBody('gameName', 'gameName is Required').isAscii();
        req.checkBody('heading', 'Heading is Required').isAscii();
        req.checkBody('description', 'Description is Required').isAscii();

        var errors = await req.validationErrors();

        if (errors) {
            errors = _.first(errors);
            let errValidation = {
                code: 400,
                message: errors.msg
            };

            return next(errValidation);
        }

        let { gameName, heading, imgLink, videoLink, description } = req.body;

        try {

            let postModel = new Post({
                gameName: gameName,
                heading: heading.toString().toLowerCase(),
                imgLink: imgLink,
                videoLink: videoLink,
                description: description
            });
    
            // Check post if already Exist
            Post.findOne({'heading': postModel.heading}, async (err, post)=> {

                if (err) return res.json({success: false, msg: err});

                if(post) {
                    return res.json({success: false, msg: 'Post Already Exist!'});
                }

                let oPost = await dbMongooseUpload.add(postModel);

                if(oPost) {
                    return res.status(200).json({success: true, data: oPost, msg: 'Post Added Successfully!'});
                } else {
                    return res.status(500).json({success: false, msg: 'Something went wrong please try again'});
                }

            });

        } catch (e) {
            next(e);
        }
            
    }



    /* Get All Csgo Posts */
    let getCsgoPosts = async (req, res, next) => {

        var options = {
            sort: { updated_date: -1 },
            lean: true,
            offset: Number(req.params.offset),
            limit: 8
        };

        Post.paginate({'gameName': 'CS:GO'}, options).then(function(posts) {
            return res.status(200).json(posts);
        });
    }


    /* Get All Badminton Posts */
    let getBadmintonPosts = async (req, res, next) => {

        var options = {
            sort: { updated_date: -1 },
            lean: true,
            offset: Number(req.params.offset),
            limit: 8
        };
        // Get Badminton Post
        Post.paginate({'gameName': 'Badminton'}, options).then(function(posts) {
            return res.status(200).json(posts);
        });
    }



    /* Get Single post */
    let getSinglePost = async (req, res, next) => {

        Post.findOne({'heading': req.params.heading}, function(err, post) {
            if(err) {
                return res.json({success: false, msg: err});
            } else {
                return res.status(200).json(post);
            }
        });
    }



    return {
        addPosts: add,
        getCsgoPosts: getCsgoPosts,
        getBadmintonPosts: getBadmintonPosts,
        getSinglePost: getSinglePost
    }
}