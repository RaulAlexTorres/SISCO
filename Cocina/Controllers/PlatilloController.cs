using Cocina.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cocina.Controllers
{
    public class PlatilloController : Controller
    {
        Modelo db = new Modelo();

        #region Funciones_GET
        public ActionResult Index()
        {
            ViewBag.tipoPlatillo = db.cTiposPlatillos.Where(tPlatillo => tPlatillo.Estatus == true && tPlatillo.Descripcion != "Ninguno");
            return View();
        }

        public JsonResult ListarActivos()
        {
            var platillos = (from plat in db.cPlatillos
                             where plat.Estatus == true && plat.Descripcion != "Ninguno"
                             select new
                             {
                                 id_platillo = plat.Id,
                                 platillo = plat.Descripcion,
                                 id_tPlatillo = plat.cTiposPlatillos.Id,
                                 tipo_plat = plat.cTiposPlatillos.Descripcion
                             }).ToList();

            return Json(new { data = platillos }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarInactivos()
        {
            var platillos = (from plat in db.cPlatillos
                             where plat.Estatus == true && plat.Descripcion != "Ninguno"
                             select new
                             {
                                 id_platillo = plat.Id,
                                 platillo = plat.Descripcion,
                                 id_tPlatillo = plat.cTiposPlatillos.Id,
                                 tipo_plat = plat.cTiposPlatillos.Descripcion
                             }).ToList();

            return Json(new { data = platillos }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Funciones_POST
        [HttpPost]
        public JsonResult Registrar([Bind(Include = "Descripcion,Estatus,cTiposPlatillosId")]cPlatillos platillo)
        {
            /* Codigo de validaciones:
            -- COD-0 = sin errores
            -- COD-1 = validacion de nombre del platillo
            -- COD-2 = validacion de los datos del platillo */

            string error = "COD-0";

            if (db.cPlatillos.Any(plat => plat.Descripcion == platillo.Descripcion))
            {
                error = "COD-1";
                return Json(error, JsonRequestBehavior.AllowGet);
            }

            if (ModelState.IsValid)
            {
                db.cPlatillos.Add(platillo);
                db.SaveChanges();
                return Json(error, JsonRequestBehavior.AllowGet);
            }
            else
            {
                error = "COD-2";
                return Json(error, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Actualizar([Bind(Include = "Id,Descripcion,cTiposPlatillosId")]cPlatillos platillo)
        {
            /* Codigo de validaciones:
            -- COD-0 = sin errores
            -- COD-1 = validacion de nombre del platillo
            -- COD-2 = validacion de los datos del platillo */

            string error = "COD-0";
            var plat_Antiguo = db.cPlatillos.Find(platillo.Id);

            if (plat_Antiguo.Descripcion != platillo.Descripcion)
            {
                if (db.cPlatillos.Any(plat => plat.Descripcion == platillo.Descripcion))
                {
                    error = "COD-1";
                    return Json(error, JsonRequestBehavior.AllowGet);
                }
            }

            if (ModelState.IsValid)
            {
                plat_Antiguo.Descripcion = platillo.Descripcion;
                plat_Antiguo.cTiposPlatillosId = platillo.cTiposPlatillosId;

                db.Entry(plat_Antiguo).State = EntityState.Modified;
                db.SaveChanges();
                return Json(error, JsonRequestBehavior.AllowGet);
            }
            else
            {
                error = "COD-2";
                return Json(error, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult CambiarEstado(int id)
        {
            /* Codigo de validaciones:
            -- COD-0 = sin errores
            -- COD-1 = validacion de nombre del platillo
            -- COD-2 = validacion de los datos del platillo */

            string error = "COD-0";
            var platillo = db.cPlatillos.Find(id);

            platillo.Estatus = (platillo.Estatus) ? false : true;

            db.Entry(platillo).State = EntityState.Modified;
            db.SaveChanges();

            return Json(error, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}