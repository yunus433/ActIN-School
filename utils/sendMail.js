const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const transporter = nodemailer.createTransport({
  direct: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'admin@stumarkt.com', 
    pass: '14121998samsun'
  }
});
transporter.use('compile', htmlToText());

const templates = {
  userRegister: (data) => ({
    to: data.email,
    subject: 'Actin\'in School: Yeni Kullanıcı Kaydı',
    html: `
      Merhaba ${data.name.split(' ')[0]}!
      <br />
      <br />
      Aramıza hoşgeldin. Hesabını kullanmaya başlamadan önce hesabın okulun tarafından onaylanmalı. Hesabının onaylanması için okuldaki Act'in School yöneticisi ile konuşabilirsin.
      <br />
      <br />
      Hesabın onaylandığı zaman yine mail yoluyla seni bilgilendireceğiz. Eğer herhangi bir sorun olursa lütfen siteki iletişim sayfasından bize ulaşmaktan çekinme.
      <br />
      <br />
      Act'in School Ekibi
    `
  }),
  userPermissionMail: (data) => ({
    to: data.email,
    subject: 'Actin\'in School: Hesabın Onaylandı!',
    html: `
      Merhaba ${data.name.split(' ')[0]}!
      <br />
      <br />
      Hesabın okul yöneticiniz tarafından onaylandı. Hesabını kullanmaya başlayabilirsin.
      <br />
      <br />
      Act'in School Ekibi
    `
  }),
  userDeniedMail: (data) => ({
    to: data.email,
    subject: 'Actin\'in School: Hesabın Onaylanmadı',
    html: `
      Merhaba ${data.name.split(' ')[0]},
      <br />
      <br />
      Ne yazık ki hesabın okul yöneticiniz tarafından reddedildi. Bu sebeble hesabını silmek zorunda kaldık.
      <br />
      <br />
      Sorunun ne olduğunu görmek için okuluna başvurmayı deneyebilirsin. Eğer herhangi bir sorun olursa lütfen siteki iletişim sayfasından bize ulaşmaktan çekinme.
      <br />
      <br />
      Act'in School Ekibi
    `
  }),
  schoolRegister: (data) => ({
    to: data.email,
    subject: 'Actin\'in School: Yeni Okul Hesap',
    html: `
      Sayın ${data.name} temsilcisi,
      <br />
      <br />
      Öncelikle aramıza katıldığınız için çok teşekkür ederiz. İki gün içerisinde hesabınız ekibimiz tarafından onaylanacaktır. Süreç tamamlandığı zaman yine mail yoluyla bilgilendirileceksiniz.
      <br />
      <br />
      Hesabınız onaylandığında belirlediğiniz admin kullanıcı adı ve şifresini kullanarak giriş yapabilirsiniz. Lütfen herhangi bir sorunuz olursa iletişim sayfasından bize ulaşmaktan çekinmeyin.
      <br />
      <br />
      İyi günler dileriz,
      <br />
      Act'in School Ekibi
    `
  })
};

module.exports = (data, template, callback) => {
  const mailOptions = {
    from: "admin@stumarkt.com",
    ...templates[template](data)
  };
  transporter.sendMail(mailOptions, callback);
};
