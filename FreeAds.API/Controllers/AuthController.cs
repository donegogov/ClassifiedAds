using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FreeAds.API.Data;
using FreeAds.API.Dtos;
using FreeAds.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FreeAds.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // validate request podocno kje dodademe validacija

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                //return BadRequest("Username already exists");
                return BadRequest("Корисничкото име веќе постои");
            
            var userToCreate = new User
            {
                Username = userForRegisterDto.Username,
                City = userForRegisterDto.City
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username),
                new Claim(ClaimTypes.StateOrProvince, userFromRepo.City)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }

        [HttpPost("token")]
        public IActionResult CreateToken(UserForTokenDto userForToken)
        {
            if(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) != userForToken.id)
                return Unauthorized();
            
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            string userRole = User.FindFirst(ClaimTypes.Role).Value;
            string city = User.FindFirst(ClaimTypes.StateOrProvince).Value;

            var token = _repo.CreateToken(userForToken, key, userRole, city);

            var tokenHandler = new JwtSecurityTokenHandler();

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}