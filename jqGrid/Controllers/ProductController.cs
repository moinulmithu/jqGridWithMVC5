using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using jqGrid.Models;

namespace jqGrid.Controllers
{
    public class ProductController : Controller
    {
        ProductDBEntities1 db  = new ProductDBEntities1();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetProductLists(string sidx, string sord, int page, int rows)  //Gets the product Lists.
        {
            int pageIndex = Convert.ToInt32(page) - 1;
            int pageSize = rows;
            var productListsResults = db.Products.Select(
                    a => new
                    {
                        a.Id,
                        a.Name,
                        a.Description,
                        a.Quantity,
                        a.Price
                    });
            int totalRecords = productListsResults.Count();
            var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);
            if (sord.ToUpper() == "DESC")
            {
                productListsResults = productListsResults.OrderByDescending(s => s.Name);
                productListsResults = productListsResults.Skip(pageIndex * pageSize).Take(pageSize);
            }
            else
            {
                productListsResults = productListsResults.OrderBy(s => s.Name);
                productListsResults = productListsResults.Skip(pageIndex * pageSize).Take(pageSize);
            }
            var jsonData = new
            {
                total = totalPages,
                page,
                records = totalRecords,
                rows = productListsResults
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }
        // GET: Product/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Product/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Product/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Product/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Product/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Product/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Product/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
