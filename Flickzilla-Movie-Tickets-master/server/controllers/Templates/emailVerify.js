// emailTemplate.js
const emailVerifyContent = (user, url) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .container {
                text-align: center;
                padding: 20px;
            }
            .text {
                margin-bottom: 20px;
            }
            .info {
                color: #ff0062;
                padding: 50px;
                color: #fff;
            }
            .text p {
                font-size: larger;
                color: #000;
                margin: 20px 0;
            }
            .link {
                background-color: #ff0062;
                padding: 15px 30px;
                font-size: large;
                text-decoration: none;
            }
            .btn{
                margin-top: 50px;
            }
            .btn a{
                color:#fff; 
            }
            span{
                text-decoration: none;
                font-weight: bold;
            }
            .image{
                width: 100%;
                background-image: url(https://www.pointgadget.com/wp-content/uploads/2019/12/best-netflix-alternatives.jpg);
                background-repeat: no-repeat;
                background-size: cover;
                opacity: 0.8;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="text">
                <div class="image">
                    <h1 class="info">Dear ${user.firstName}, <br>Welcome To Flickzilla</h1>
                </div>
                <p>Thanks for becoming a Flickzilla insider! As part of this exclusive group, you'll be among the first to receive updates about upcoming movies,
                    exciting promotions, and much more. Your journey to entertainment begins now.</p>
                <p>
                    Your account details are:<br>
                    <span>${user.email}<span></p>
            </div>
            <div class="btn">
                <a class="link" href="${url}">Verify</a>
            </div>
        </div>
    </body>
    </html>
`;
  };
  
  module.exports = {
    emailVerifyContent
  };
  