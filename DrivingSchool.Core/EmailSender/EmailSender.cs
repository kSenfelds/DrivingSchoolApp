using Amazon;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using System;
using System.Collections.Generic;

namespace EmailSender
{
    public class EmailSender
    {
        static readonly string senderEmail = "kr.senfelds@gmail.com";
        static readonly string recieverEmail = "kr.senfelds@gmail.com";

        private static readonly string subject = "Test email";
        private static readonly string body = "This is a test email sent from a .NET Core 3.1 console app.";

        static readonly string textBody = "Amazon SES Test (.NET)\r\n"
                                          + "This email was sent through Amazon SES "
                                          + "using the AWS SDK for .NET.";

        static void Main(string[] args)
        {
            // create the email client for SES, use the Region you configured SES in
            var client = new AmazonSimpleEmailServiceClient(RegionEndpoint.USEast1);

            var sendRequest = new SendEmailRequest
            {
                // verified sender
                Source = senderEmail,
                Destination = new Destination
                {
                    // configure recipients
                    ToAddresses = new List<string> { recieverEmail },
                },
                    Message = new Message
                    {
                        // email subject
                        Subject = new Content(subject),
                        Body = new Body
                        {
                            // HTML body for HTML Renderers
                            Html = new Content
                            {
                                Charset = "UTF-8",
                                Data = body
                            },
                            // Plain text for non-html renderes
                            Text = new Content
                            {
                                Charset = "UTF-8",
                                Data = textBody
                            }
                        }
                    },
                
            };
            // send the configured email via SDK
            client.SendEmailAsync(sendRequest);
            Console.WriteLine("Email Sent");
        }
    }
}