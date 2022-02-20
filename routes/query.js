var express = require('express');
var QueryRouter = express.Router();
var Service = require('../model/service');
var SubService = require('../model/subService');
var Query = require('../model/query');
var ObjectID = require('mongodb').ObjectID;
import Config from '../config/config';

const { port, secretKey, expiredAfter, transporter } = Config;

QueryRouter.route('/api/query').post((req, res) => {
    req.body.status = "Processing";
    var data = req.body;
    data.query_by = res.locals.id;
    var newQuery = new Query(data);
    newQuery.save((err) => {
        if (err) {
            res.status(200).json({
                success: false,
                err: err
            })
        } else {
            res.status(200).json({
                success: true,
                msg: "Successfully saved query"
            });
            Query.populate(data, {path: 'sub_service'}, (err, query) => {
                if(err) {
                    console.log(err)
                } else {
                    var message = {
                        from: 'BiznezUpaaye 👥 <testagd@gmail.com>',
                        to: 'aw.glowinformatics@gmailc.com',
                        subject: 'New Query',
                        html: `<body class="body" style="background-color:#ebebeb; background-repeat:no-repeat repeat-y; background-position:center 0; padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#ebebeb; -webkit-text-size-adjust:none">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0"  align="center" style="background-color:#ebebeb;" class="mobile-mobile">
                            <tr>
                                <td  align="center" valign="top" style="">
                                    
                                    
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center">
                                                <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                                                    <tr>
                                                        <td>
                                                            
                    
                                                            <!-- Section 1 -->
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">
                                                                <tr>
                                                                    <td height="40" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td>
                                                                </tr>
                                                            </table>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                <tr>
                                                                    <td class="section" style="padding:30px 250px 30px 250px; text-align:center">
                                                                        <div class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left"><image src="newlogo.png" border="0" width="150" height="60" alt="" /></div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
                    
                                                            <!-- END Section 1 -->
                                                            
                                                            <!-- Section 2 -->
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                <tr>
                                                                    <td class="section" style="padding:40px 80px 5px 80px;font-size:13px;color:#37a1eb;  font-weight:600; font-family:arial;">
                                                                        You have received new business inquiry,
                                                                        <br/>
                                                                        <br/>
                                                                        Please find below details
                                                                    </td>	
                                                                </tr>
                                                                
                                                                <tr>
                                                                    <td class="section" style="padding:20px 80px 5px 80px; font-size:14px; color:#000000; font-family:arial;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                            <tr>
                                                                                <td style="font-weight:bold; font-size:13px; vertical-align:top;">
                                                                                    Name:
                                                                                </td>
                                                                                <td >
                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                </td>
                                                                                <td style="border:1px solid #b5b3b3; padding:5px 10px 5px 10px; vertical-align:top;">
                                                                                       ${query.name}												
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%" colspan="3">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="font-weight:bold; font-size:13px; vertical-align:top;" >
                                                                                    Mobile No:
                                                                                </td>
                                                                                <td >
                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                </td>
                                                                                <td style="border:1px solid #b5b3b3; padding:5px 10px 5px 10px; vertical-align:top;">
                                                                                       ${query.mobile}														
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%" colspan="3">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="font-weight:bold; font-size:13px; vertical-align:top;">
                                                                                    Service Type:
                                                                                </td>
                                                                                <td >
                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                </td>
                                                                                <td style="border:1px solid #b5b3b3; padding:5px 10px 5px 10px; vertical-align:top;">
                                                                                       ${query.sub_service.title}													
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%" colspan="3">&nbsp;</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="font-weight:bold; font-size:13px; vertical-align:top;">
                                                                                    Descriptions:
                                                                                </td>
                                                                                <td>
                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                </td>
                                                                                <td style="border:1px solid #b5b3b3; padding:5px 10px 5px 10px; vertical-align:top;">
                                                                                     ${query.desc}													
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>												
                                                                </tr>	
                                                                <tr>
                                                                    <td height="50" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td>
                                                                </tr>
                                                                
                                                                
                                                            </table>
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
                    
                                                            <!-- END Section 1 -->
                                                            
                                                            <!-- Section 2 -->
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                <tr>
                                                                    <td class="section" style="padding:30px 25px 30px 25px; text-align:center; color:#007bdb;font-size:16px;" >
                                                                        Thank you, BiznezUpaay !
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            
                    
                                                            <!-- END Section 2 -->
                                                            
                                                            
                                                            
                    
                                                            
                                                        </td>
                                                    </tr>
                                                </table>	
                                            </td>
                                        </tr>
                                    </table>
                                    
                                </td>
                            </tr>
                        </table>
                    </body>
                        `,
                        // attachments: [{
                        //   filename: 'newlogo.png',
                        //   path: __dirname + '/newlogo.png',
                        //   cid: 'logo' //same cid value as in the html img src
                        // }]
                      };
                
                      transporter.sendMail(message, function (error) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("mail sent");
                        }
                    });
                }
            })
            
        }
    })
})

QueryRouter.route('/api/query/list').get((req, res) => {
    console.log(req.query, "this is query");
    var id = res.locals.id;
    var role = res.locals.role;
    var pageNo = parseInt(req.query.pageNo) //req.query.pageNo
    var size = 10 //
    if (pageNo < 0 || pageNo === 0) {
        response = {
            success: false,
            message: "invalid page number, should start with 1"
        };
        return res.status(200).json(response)
    }
    console.log(role, "this is role");
    var query = {};
    var dbquery = {};
    if(role != "Admin") {
        dbquery.query_by = res.locals.id; 
    }
    query.skip = req.query.pageNo ? size * (pageNo - 1) : 0;
    query.limit = req.query.pageNo ? size : '';
    Query.find(dbquery).count().exec((err, count) => {
        if (err) {
            res.status(200).json({
                success: false,
                err: err
            })
        } else {
            Query.find(dbquery).skip(query.skip).limit(query.limit).populate('sub_service').exec((err, data) => {
                if (err) {
                    console.log(err);
                    res.status(200).json({
                        success: false,
                        err: err
                    })
                } else {
                    if (data.length > 0) {
                        res.status(200).json({
                            success: true,
                            data: data,
                            count: count
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            msg: "No Quaries found"
                        })
                    }
                }
            })
        }
    })
})

QueryRouter.route('/api/query/:id').get((req, res) => {
    var id = req.params.id;
    Query.findById(id, (err, data) => {
        if (err) {
            res.status(200).json({
                success: false,
                err: err
            })
        } else {
            if (data) {
                res.status(200).json({
                    success: true,
                    data: data
                })
            } else {
                res.status(200).json({
                    success: false,
                    msg: "No query found with this id"
                })
            }
        }
    })
})

QueryRouter.route('/api/query/update/:id').put((req, res) => {
    var id = req.params.id;
    Query.findById(id, (err, data) => {
        if (err) {
            res.status(200).json({
                success: false,
                err: err
            })
        } else {
            if (data) {
                if(req.body.status) {
                    data.status = req.body.status
                }
                if(req.body.remark) {
                    data.remarks = req.body.remark
                }
                data.save(function(err) {
                    if(err) {
                        res.status(200).json({
                            success: false,
                            err: err
                        })
                    } else {
                        console.log("updated query")
                        res.status(200).json({
                            success: true,
                            msg: "Successfully updated query"
                        })
                    }
                })
            } else {
                res.status(200).json({
                    success: false,
                    msg: "No query found with this id"
                })
            }
        }
    })
})
module.exports = QueryRouter;