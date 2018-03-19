const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
module.exports = function (req, res) {

    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',    //Using ethereal mailservice because i dont want to show my mail user/pass in plain text
            //in this exercise. To check mail go to generated mailadress that shows in terminalwindow Copy/paste adress to webbrowser. GL :)
            port: 587,
            secure: false, // true for 465, false for other ports 
            auth: {
                user: account.user, // generated ethereal user 
                pass: account.pass // generated ethereal password 
            }
        });

        console.log('req body', req.body);
        // setup email data with unicode symbols 
        let mailOptions = {

            from: '"Dajmans webbshop 👻"', // sender address 
            to: 'roger.greg@fjgj.com', // list of receivers 
            subject: 'Din beställning', // Subject line 
            text: "kk", // plain text body 
            html: '<h1>Du har beställt följande</h1>' // html body 
        };

        let message = {
            // Comma separated list of recipients
            to: 'kalleanka@anka.com',
    
            // Subject of the message
            subject: 'Din beställning är skickad ✔',
    
            // plaintext body
            //text: 'Hello to myself!',
    
            // HTML body
            html:
                '<p><b>Hej</b></p>' +
                '<p>Dina varor är skickade!:<br/><img src="cid:nyan@example.com"/></p>',
    
            // An array of attachments
            attachments: [
                // String attachment
                // {
                //     filename: 'notes.txt',
                //     content: 'Some notes about this e-mail',
                //     contentType: 'text/plain' // optional, would be detected from the filename
                // },
    
                // Binary Buffer attachment
                // {
                //     filename: 'image.png',
                //     content: Buffer.from(
                //         'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                //             '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                //             'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                //         'base64'
                //     ),
    
                //     cid: 'note@example.com' // should be as unique as possible
                // },
    
                // File Stream attachment
                {
                    filename: 'hemlig_fil ✔.gif',
                    path: __dirname + '../../www/img/amulet.jpg',
                    cid: 'nyan@example.com' // should be as unique as possible
                }
            ]
        };
    

        // send mail with defined transport object 
        transporter.sendMail(message, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

            // Preview only available when sending through an Ethereal account 

            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com> 
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... 
        });
    });
}