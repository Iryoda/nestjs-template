export default {
  transport: process.env.DEFAULT_TRANSPORT || {
    host: 'localhost',
    port: 1025,
    secure: false,
    ignoreTLS: true,
    auth: {
      user: 'user',
      pass: 'password',
    },
  },
  preview: process.env.DEFAULT_TRANSPORT ? false : true,
  defaults: {
    from: {
      email:
        process.env.DEFAULT_EMAIL_ADDRESS || '"No Reply" <no-reply@localhost>',
      name: process.env.DEFAULT_MAILER_NAME || 'Admin',
    },
  },
};
