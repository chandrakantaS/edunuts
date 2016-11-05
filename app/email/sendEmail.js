import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Logger from '../../lib/logger';

const transport = nodemailer.createTransport(smtpTransport({
    host: 'email-smtp.us-west-2.amazonaws.com',
    protocol: 'smtp',
    secureConnection: true,
    port: 25,
    auth: {
      username: 'AKIAIDC7AK2UAYYD347A',
      password: 'AjD63nZgM5+JAodEOT4+d8t/YHq8pIaDQg1CUq+GuHAB'
    },
  })), log = new Logger(__filename);

export default function send (from, to, sub, html, cb) {
  const email = {
    from,
    to,
    subject: sub,
    html
  };

  transport.sendMail(email, (e) => {
    if (e) {
      if (cb) cb(e);
      log.info('error in sending email: ', e, 'retrying...');
      setTimeout(() => {
        send(email.from, email.to, email.subject, email.html);
      }, 300000);
    } else {
      log.info('Email sent successfully to ', email.to);
      if (cb) cb(null);
    }
  });
}
