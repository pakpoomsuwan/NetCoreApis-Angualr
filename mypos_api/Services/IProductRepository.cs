
using System.Collections.Generic;
using System.Threading.Tasks;
using mypos_api.Models;

namespace mypos_api.Services
{
    public interface IProductRepository
    {
        IEnumerable<Products> GetProductAll();
        Products GetProductById(int id);
        Task<Products> CreateProduct(Products product);
        Task<Products> UpdateProduct(Products product, int id);
        bool DeleteProduct(int id);
    }
}