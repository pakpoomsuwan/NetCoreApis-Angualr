using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mypos_api.Models;
using mypos_api.Services;

namespace mypos_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {

        ILogger<ProductController> _logger;
        private readonly IProductRepository productRepository;

        public ProductController(ILogger<ProductController> logger, IProductRepository productRepository)
        {
            _logger = logger;
            this.productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            try
            {
                var result = productRepository.GetProductAll();
                return Ok(new { result = result, message = "" });
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to execute GET");
                return StatusCode(500, new { result = "", message = ex });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            try
            {
                var result = productRepository.GetProductById(id);
                if (result == null)
                {
                    return NotFound(new { result = "", message = "" });
                }

                return Ok(new { result = result, message = "" });
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to execute GET");
                return StatusCode(500, new { result = "", message = ex });
            }
        }

        [HttpPost]
        public async Task<IActionResult> NewProductAsync([FromForm] Products model)
        {
            try
            {
                var result = await productRepository.CreateProduct(model);
                return Ok(new { result = result, message = "" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { result = "", message = ex });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProductAsync([FromForm] Products model, int id)
        {
            try
            {
                var result = await productRepository.UpdateProduct(model, id);
                if (result == null) return NotFound(new { result = "", message = "" });

                return Ok(new { result = result, message = "" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { result = "", message = ex });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var result = productRepository.DeleteProduct(id);
                if (!result) return NotFound(new { result = result, message = "" });

                return Ok(new { result = result, message = "" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { result = "", message = ex });
            }
        }

        [AllowAnonymous]
        [HttpGet("images/{name}")]
        public IActionResult GetProductImage(string name)
        {
            try
            {
                return File($"~/images/{name}", "image/jpg");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { result = "", message = ex });
            }
        }
    }
}