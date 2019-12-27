using mypos_api.Models;

namespace mypos_api.Services
{
    public interface IAuthRepository
    {
         void Register(Users user);
         (Users, string) Login(Users user);
    }
}