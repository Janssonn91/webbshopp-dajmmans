const nodemailer = require('nodemailer');

module.exports = function(req, res) {
    console.log('hej');

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
            html: ''
        
        };

        let message = {
            // Comma separated list of recipients
            to: `${req.body.email}`,

            // Subject of the message
            subject: `Din beställning från Dajmmans webbshop ✔`,

            // HTML body
            html:`
                <img src="cid:dajmmanslogo@example.com"/>
                <p><strong>Hejsan ${req.body.username}</strong></p>
                <h1>Orderbekräftelse, order #${req.body.orderno}</h1>
                <p>Du har beställt ${req.body.products}, för ${req.body.totalprice} kr. Ordern mottagen ${req.body.orderdate}<p>
                <p>Tack för din beställning, välkommen att handla hos oss på Dajmmans igen!</p>

                `,

            // An array of attachments
            attachments: [

                // File Stream attachment
                {
                    //filename: 'hemlig_fil ✔.gif',
                    path: __dirname + '../../www/img/logo.png',   //testpicture to try that paths work
                    cid: 'dajmmanslogo@example.com' // should be as unique as possible
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