using SendGrid;
using SendGrid.Helpers.Mail;

namespace SendGridEmailSender
{
    public class EmailSender
    {

        static async Task SendMail(string reciever)
        {
            string apiKey = "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";
            var client = new SendGridClient(apiKey);
            var senderEmail = new EmailAddress("testdrivingschoolapi@gmail.com");
            var recieverEmail = new EmailAddress(reciever);
            var emailSubject = "Test";
            string textContent = "Test";
            string htmlContent = "<strong>Test</strong>";
            var msg = MailHelper.CreateSingleEmail(senderEmail, recieverEmail, emailSubject, textContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

        }
    }
}