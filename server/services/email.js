const nodemailer = require('nodemailer')

const settingSendMail = async () => {
  let account = await nodemailer.createTestAccount()
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  })
}

const sendEmail = async (sendingList, subject, htmlContent) => {
  const transporter = await settingSendMail()
  const options = {
    from: `"Mai Trang Xinh Dep" <shirohs58@gmail.com>`,
    to: sendingList.reduce((emails, e) => `${emails}${e},`, ''),
    subject: subject,
    html: htmlContent
  }
  const infor = await transporter.sendMail(options)
  console.log('Message sent: %s', infor.messageId)
}

module.exports = {
  sendEmail
}