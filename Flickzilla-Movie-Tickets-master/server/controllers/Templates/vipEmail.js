// emailTemplate.js
const vipEmail = (url) => {
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
            <h1 style="color: #000;">Congratulations! You Just Got a VIP Ticket!</h1>
          </div>
          <div class="padding">
            <p style="color: #000;" class="bold">Congratulations! You've booked a multiple of 5 tickets and have earned a VIP ticket!
            </p>
          </div>
          <div class="btn bold">
            <a class="link" href="${url}">Choose Your Movie</a>
          </div>
          <div class="padding">
            <p style="color: #000;">Choose any movie you like and book a VIP seat for a premium cinematic experience. Your VIP ticket is ready to use.</p>
            <p style="color: red; font-weight:bold;">Please make sure to keep this email saved, as it contains important information about your VIP status.</p>
          </div>
        </div>
      </body>
    </html>
`;
};

module.exports = {
    vipEmail,
};
