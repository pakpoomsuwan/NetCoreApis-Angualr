using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using mypos_api.Database;
using mypos_api.Models;

namespace mypos_api.Services
{
    public class ProductRepository : IProductRepository
    {
        private readonly DatabaseContext databaseContext;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ProductRepository(
            DatabaseContext databaseContext,
            IHttpContextAccessor httpContextAccessor,
            IWebHostEnvironment webHostEnvironment)
        {
            this.databaseContext = databaseContext;
            this.httpContextAccessor = httpContextAccessor;
            this.webHostEnvironment = webHostEnvironment;
        }

        public async Task<Products> CreateProduct(Products product)
        {
            var image = await UploadProductImages();
            if (image != null)
            {
                product.Image = image;
            }

            databaseContext.Add(product);
            databaseContext.SaveChanges();
            return product;
        }

        public bool DeleteProduct(int id)
        {
            var result = GetProductById(id);
            if (result == null) return false;

            databaseContext.Remove(result);
            databaseContext.SaveChanges();
            return true;
        }

        public IEnumerable<Products> GetProductAll()
        {
            return databaseContext.Products.ToList();
        }

        public Products GetProductById(int id)
        {
            return databaseContext.Products.SingleOrDefault(x => x.ProductId == id);
        }

        public async Task<Products> UpdateProduct(Products product, int id)
        {
            var result = GetProductById(id);
            if (result == null) return null;

            var image = await UploadProductImages();
            if (image != null)
            {
                result.Image = image;
            }

            //using auto mapper (lib)
            result.Name = product.Name;
            result.Price = product.Price;
            result.Stock = product.Stock;

            databaseContext.Update(result);
            databaseContext.SaveChanges();
            return result;
        }

        public async Task<string> UploadProductImages()
        {
            var files = httpContextAccessor.HttpContext.Request.Form.Files;

            if (files.Count > 0)
            {
                const string folder = "/images/";
                string filePath = webHostEnvironment.WebRootPath + folder;

                string fileName = "";
                //var fileNameArray = new List<String>(); // multiple images case

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                foreach (var formFile in files)
                {
                    fileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(formFile.FileName); // unique name
                    string fullPath = filePath + fileName;

                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }

                    // fileNameArray.Add(fileName); // multiple images case
                }

                return fileName;
                //return fileNameArray; // multiple images case
            }
            return null;
        }
    }
}