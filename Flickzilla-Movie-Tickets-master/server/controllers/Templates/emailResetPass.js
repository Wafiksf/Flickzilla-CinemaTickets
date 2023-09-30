// emailTemplate.js
const emailResetPass = (url) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="padding: 0; margin: 0"
>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        text-align: center;
      }
      .link{
        background-color: #ff0062;
        text-decoration: none;
        padding: 20px;
      }
      .btn{
        margin: 20px 0;
      }
      .btn a{
        color: #fff;
      }
      .bold{
        font-weight: bold;
      }
      .padding{
        padding: 10px 0;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div>
        <h1 style="color: #000;">Password Reset</h1>
      </div>
      <div class="padding">
        <p style="color: #000;" class="bold">If you've lost your password or wich to reset it,<br>
            use the link below to get started.
        </p>
      </div>
      <div class="btn bold">
        <a class="link" href="${url}">Reset Your Password</a>
      </div>
      <div class="padding">
        <p style="color: #000;">if you did not request a password reset, you can sagtly ignore this email.<br>
            Only a person with access to your email can reset your account password.
        </p>
      </div>
    </div>
  </body>
</html>
`;
};

module.exports = {
    emailResetPass,
};
