import nodemailer from "nodemailer"
import sgMail from "@sendgrid/mail"

export const mailService = {
  async transporter() {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
    return transporter
  },
  async sendActivationMail(to: string, link: string) {
    let tramsporter = await this.transporter()
    await tramsporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Activation accaunt on " + process.env.API_URL,
      text: "",
      html: `<div>
      <h1>To activate your account follow the link</h1>
      <a href="${link}">${link}</a>
      </div>`,
    })
  },
  async sendFeedBackMail(from: string, senderName: string, message: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
    const msg = {
      to: process.env.SMTP_USER_FEEDBACK_EMAIL,
      from: from,
      subject: "HR MESSAGE",
      text: "message:",
      html: `<div>
            <h1>Вам пришло письмо от ${senderName}</h1>
           <p>Email: ${from}</p>
          <p>${message}</p>
         </div>`,
    }
    await sgMail.send(msg)
  },
}
// async senderGridTransporter() {
//   let transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST_SENDGRID,
//     port: Number(process.env.SMTP_PORT),
//     auth: {
//       user: process.env.SMTP_SENDGRID_USER,
//       pass: process.env.SENDGRID_API_KEY,
//     },
//   })
//   return transporter
// },
// async sendFeedBackMail(from: string, senderName: string, message: string) {
//   try {
//     const tramsporter = await this.senderGridTransporter()
//     tramsporter.sendMail(
//       {
//         from: from,
//         to: process.env.SMTP_USER_FEEDBACK_EMAIL,
//         subject: "HR MESSAGE",
//         text: "",
//         html: `<div>
//          <h1>Вам пришло письмо от ${senderName}</h1>
//         <p>Email: ${from}</p>
//        <p>${message}</p>
//        </div>`,
//       },
//       function (error, info) {
//         if (error) {
//           console.log(error)
//         } else {
//           console.log("Email sent: " + info.response)
//         }
//       }
//     )
//   } catch (e) {
//     console.log(`Error: ${e}`)
//   }
// },

// sendgrid

// async sendFeedBackMail(from: string, senderName: string, message: string) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
//   const msg = {
//     to: process.env.SMTP_USER_FEEDBACK_FORM,
//     from: from,
//     subject: "HR MESSAGE",
//     text: "message:",
//     html: `<div>
//             <h1>Вам пришло письмо от ${senderName}</h1>
//            <p>Email: ${from}</p>
//           <p>${message}</p>
//          </div>`,
//   }
//   try {
//     await sgMail.send(msg)
//   } catch (e) {
//     console.log(e)
//   }
// },
// ------------
