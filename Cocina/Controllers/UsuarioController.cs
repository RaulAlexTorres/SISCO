using Cocina.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cocina.Controllers
{
    public class UsuarioController : Controller
    {
        Modelo db = new Modelo();

        #region funciones_GET
        public ActionResult Index()
        {
            ViewBag.TUsuario = db.cTiposUsuarios.Where(tu => tu.Descripcion == "Comedor" || tu.Descripcion == "Administrador" ||
                                                              tu.Descripcion == "Externo").ToList();
            return View();
        }

        public JsonResult ListarActivos()
        {
            var usuarios = (from usu in db.aUsuarios
                            where usu.Estatus == true
                            && (usu.cTiposUsuarios.Descripcion == "Comedor" || usu.cTiposUsuarios.Descripcion == "Administrador"
                            || usu.cTiposUsuarios.Descripcion == "Externo")
                            select new
                            {
                                id_usuario = usu.Id,
                                numero_empleado = usu.NumeroEmpleado.Trim(),
                                nombre = usu.Nombre,
                                apPaterno = usu.ApellidoPaterno,
                                apMaterno = usu.ApellidoMaterno,
                                id_tUsuario = usu.cTiposUsuarios.Id,
                                tipo_usu = usu.cTiposUsuarios.Descripcion,
                                correo_E = usu.CorreoElectronico
                            }).ToList();
            return Json(new { data = usuarios }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarInactivos()
        {
            var usuarios = (from usu in db.aUsuarios
                            where usu.Estatus == false
                            && (usu.cTiposUsuarios.Descripcion == "Comedor" || usu.cTiposUsuarios.Descripcion == "Administrador"
                            || usu.cTiposUsuarios.Descripcion == "Externo")
                            select new
                            {
                                id_usuario = usu.Id,
                                numero_empleado = usu.NumeroEmpleado.Trim(),
                                nombre = usu.Nombre,
                                apPaterno = usu.ApellidoPaterno,
                                apMaterno = usu.ApellidoMaterno,
                                id_tUsuario = usu.cTiposUsuarios.Id,
                                tipo_usu = usu.cTiposUsuarios.Descripcion,
                                correo_E = usu.CorreoElectronico
                            }).ToList();
            return Json(new { data = usuarios }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region funciones_POST
        [HttpPost]
        public JsonResult Registrar([Bind(Include = "Nombre,ApellidoPaterno,ApellidoMaterno,NumeroEmpleado,Estatus,cTiposUsuariosId," +
                                                    "cEmpresasId,CorreoElectronico")]aUsuarios usuario)
        {
            /* Codigo de validaciones:
            -- COD-0 = sin errores
            -- COD-1 = validacion de numero de empelado
            -- COD-2 = validacion de correo electronico 
            -- COD-3 = validacion de datos de usuario */

            string error = "COD-0";
            
            if (db.aUsuarios.Any(usu => usu.NumeroEmpleado == usuario.NumeroEmpleado))
            {
                error = "COD-1";
                return Json(error, JsonRequestBehavior.AllowGet);
            }

            if (!string.IsNullOrEmpty(usuario.CorreoElectronico))
            {
                if (db.aUsuarios.Any(usu => usu.CorreoElectronico == usuario.CorreoElectronico))
                {
                    error = "COD-2";
                    return Json(error, JsonRequestBehavior.AllowGet);
                }
            }

            if (ModelState.IsValid)
            {
                db.aUsuarios.Add(usuario);
                db.SaveChanges();
                return Json(error, JsonRequestBehavior.AllowGet);
            }
            else
            {
                error = "COD-3";
                return Json(error, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Actualizar([Bind(Include = "Id,Nombre,ApellidoPaterno,ApellidoMaterno,NumeroEmpleado,cTiposUsuariosId," +
                                                     "CorreoElectronico")]aUsuarios usuario)
        {
            /* Codigo de validaciones:
            -- COD-0 = sin errores
            -- COD-1 = validacion de numero de empelado
            -- COD-2 = validacion de correo electronico 
            -- COD-3 = validacion de datos de usuario */

            string error = "COD-0";
            var usu_Antiguo = db.aUsuarios.Find(usuario.Id);

            if (usu_Antiguo.NumeroEmpleado.Trim() != usuario.NumeroEmpleado)
            {
                if (db.aUsuarios.Any(usu => usu.NumeroEmpleado == usuario.NumeroEmpleado))
                {
                    error = "COD-1";
                    return Json(error, JsonRequestBehavior.AllowGet);
                }
            }

            if (usu_Antiguo.CorreoElectronico != usuario.CorreoElectronico)
            {
                if (db.aUsuarios.Any(usu => usu.CorreoElectronico == usuario.CorreoElectronico))
                {
                    error = "COD-2";
                    return Json(error, JsonRequestBehavior.AllowGet);
                }
            }

            if (ModelState.IsValid)
            {
                usu_Antiguo.Nombre = usuario.Nombre;
                usu_Antiguo.ApellidoPaterno = usuario.ApellidoPaterno;
                usu_Antiguo.ApellidoMaterno = usuario.ApellidoMaterno;
                usu_Antiguo.NumeroEmpleado = usuario.NumeroEmpleado;
                usu_Antiguo.cTiposUsuariosId = usuario.cTiposUsuariosId;
                usu_Antiguo.CorreoElectronico = usuario.CorreoElectronico;

                db.Entry(usu_Antiguo).State = EntityState.Modified;
                db.SaveChanges();
                return Json(error, JsonRequestBehavior.AllowGet);
            }
            else
            {
                error = "COD-3";
                return Json(error, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult CambiarEstado(int id)
        {
            var cambioEnBase = 0;
            var usuario = db.aUsuarios.Find(id);
            
            usuario.Estatus = (usuario.Estatus) ? false : true;

            db.Entry(usuario).State = EntityState.Modified;
            cambioEnBase = db.SaveChanges();

            return Json(cambioEnBase, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}