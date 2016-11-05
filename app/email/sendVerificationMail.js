import sendEmail from './sendEmail';

export default function(email, html) {
  const from = 'help@edunuts.com',
    sub = 'email verification';

  sendEmail(from, email, sub, html, (e) => {
    if (!e) console.log('success');
  });
}
