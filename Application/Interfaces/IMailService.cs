using Application.Mail;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
