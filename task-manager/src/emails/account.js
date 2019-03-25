const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vern@enclave.vn',
        subject: 'Sending with SendGrid is Fun',
        text: `Welcome ${name}! .And easy to do anywhere, even with Node.js`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    })
}

module.exports = {
    sendWelcomeEmail
}