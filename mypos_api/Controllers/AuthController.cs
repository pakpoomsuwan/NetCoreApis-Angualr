using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mypos_api.Models;
using mypos_api.Services;

namespace mypos_api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        ILogger<AuthController> _logger;
        private readonly IAuthRepository authRepository;

        public AuthController(ILogger<AuthController> logger, IAuthRepository authRepository)
        {
            _logger = logger;
            this.authRepository = authRepository;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Users model)
        {
            try
            {
                (Users result, string token) = authRepository.Login(model);
                if (result == null)
                {
                    return Unauthorized(new { token = string.Empty, message = "username invalid" });
                }

                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized(new { token = string.Empty, message = "password invalid" });
                }

                return Ok(new { token = token, message = "login successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { token = string.Empty, message = ex });
            }
        }

        [HttpPost("[action]")]
        public IActionResult Register([FromBody] Users model)
        {
            try
            {
                authRepository.Register(model);
                return Ok(new { result = "success", message = "register success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { result = "failure", message = ex });
            }
        }
    }
}