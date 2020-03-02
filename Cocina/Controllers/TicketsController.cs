using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Cocina.Models;
using Cocina.Models.RH;
using System.Data.Entity.SqlServer;

namespace Cocina.Controllers
{
    public class TicketsController : Controller
    {
        private Modelo db = new Modelo();

        // GET: Tickets
        public ActionResult Ticket()
        {
            if (string.IsNullOrEmpty((string)Session["ID"]))
            {
                Session.RemoveAll();
                Session.Clear();
                Session.Abandon();
                return RedirectToAction("InicioSesion", "Home");
            }
            if ((int)Session["TIPOUSUARIO"] != 1)
            {
                Session.RemoveAll();
                Session.Clear();
                Session.Abandon();
                return RedirectToAction("InicioSesion", "Home");
            }

            //Try catch que activa el mensaje
            try { ViewBag.sms = TempData["sms"].ToString(); } catch { }

            //Variable para traer los tickets pendientes
            var pendientes = (from pen in db.rTickets
                              join usu in db.aUsuarios on pen.aUsuariosId equals usu.Id    
                              join tipo in db.cTiposTickets on pen.cTiposTicketsId equals tipo.Id                          
                              where pen.Estatus == "1"      //EL 1 es solicitudes pendientes, 2 solicitudes aprobadas y 3 solicitudes rechazadas
                              select new {
                                  id = pen.Id,
                                  noEmpleado = usu.NumeroEmpleado,
                                  nombre = usu.Nombre,
                                  apellidoPaterno = usu.ApellidoPaterno,                                  
                                  fechaDeSolicitud = pen.Fecha,
                                  tipoDeSolicitud = tipo.Descripcion,
                                  platilloActual = pen.rMenusId,
                                  platilloSolicitado = pen.MenuId,
                                  estatus = pen.Estatus,
                                  registrarMenuUsuarioId = pen.rRegistrarMenusUsuariosId
                              }).ToList();

            //Variable que trae los tickets atendidos
            var atendidos = (from pen in db.rTickets
                              join usu in db.aUsuarios on pen.aUsuariosId equals usu.Id
                              join tipo in db.cTiposTickets on pen.cTiposTicketsId equals tipo.Id
                              where pen.Estatus != "1"      //EL 1 es solicitudes pendientes, 2 solicitudes aprobadas y 3 solicitudes rechazadas
                              select new
                              {
                                  id = pen.Id,
                                  noEmpleado = usu.NumeroEmpleado,
                                  nombre = usu.Nombre,
                                  apellidoPaterno = usu.ApellidoPaterno,
                                  fechaDeSolicitud = pen.Fecha,
                                  tipoDeSolicitud = tipo.Descripcion,
                                  platilloActual = pen.rMenusId,
                                  platilloSolicitado = pen.MenuId,
                                  estatus = pen.Estatus,
                                  registrarMenuUsuarioId = pen.rRegistrarMenusUsuariosId
                              }).ToList();

            List<TicketsConDatos> Pendientes = new List<TicketsConDatos>();
            List<TicketsConDatos> Atendidos = new List<TicketsConDatos>();

            foreach (var item in pendientes)
            {
                Pendientes.Add(new TicketsConDatos
                {
                    Id = item.id,
                    NoEmpleado = item.noEmpleado,
                    Nombre = item.nombre,
                    ApellidoPaterno = item.apellidoPaterno,                    
                    FechaDeSolicitud = item.fechaDeSolicitud.ToString("dd/MM/yyyy"),
                    TipoDeSolicitud = item.tipoDeSolicitud,
                    PlatilloActual = item.platilloActual,
                    PlatilloSolicitado = item.platilloSolicitado,
                    RegistarMenuUsuarioId = item.registrarMenuUsuarioId
                });
            }

            foreach (var item in atendidos)
            {
                Atendidos.Add(new TicketsConDatos
                {
                    Id = item.id,
                    NoEmpleado = item.noEmpleado,
                    Nombre = item.nombre,
                    ApellidoPaterno = item.apellidoPaterno,
                    FechaDeSolicitud = item.fechaDeSolicitud.ToString("dd/MM/yyyy"),
                    TipoDeSolicitud = item.tipoDeSolicitud,
                    PlatilloActual = item.platilloActual,
                    PlatilloSolicitado = item.platilloSolicitado,
                    Estatus = item.estatus,
                    RegistarMenuUsuarioId = item.registrarMenuUsuarioId
                });
            }

            ViewBag.Pendientes = Pendientes;
            ViewBag.Atendidos = Atendidos;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Aprobar(int id, int regId, int? menuId)
        {
            rTickets ticket = db.rTickets.Find(id);     //Busca el ticket solicitado
            rRegistrarMenusUsuarios registro = db.rRegistrarMenusUsuarios.Find(regId);       //Busca el menu registrado

            ticket.Estatus = "2";   //Cambia el estado a aprobada     
            if (menuId != null)
            {
                registro.rMenusId = (int)menuId;     //Hace la actualizacion en el registro de acuerdo a lo solicitado
            }
            else
            {
                registro.rMenusId = 0;     //Hace la actualizacion en el registro de acuerdo a lo solicitado
            }       
            

            if (ModelState.IsValid)
            {
                db.Entry(ticket).State = EntityState.Modified;
                db.SaveChanges();
                db.Entry(registro).State = EntityState.Modified;
                db.SaveChanges();
                TempData["sms"] = "Aprobar";
                ViewBag.sms = TempData["sms"];
                return RedirectToAction("Ticket");
            }

            ViewBag.aUsuariosId = new SelectList(db.aUsuarios, "Id", "Nombre", ticket.aUsuariosId);
            ViewBag.cTiposTickets = new SelectList(db.cTiposTickets, "Id", "Descripcion", ticket.cTiposTicketsId);
            ViewBag.rRegistrarMenusUsuariosId = new SelectList(db.rRegistrarMenusUsuarios, "Id", "Id", ticket.rRegistrarMenusUsuariosId);
            return View(ticket);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Rechazar(int id)
        {
            rTickets ticket = db.rTickets.Find(id);     //Busca el ticket solicitado

            ticket.Estatus = "3";   //Cambia el estado a rechazada

            if (ModelState.IsValid)
            {
                db.Entry(ticket).State = EntityState.Modified;
                db.SaveChanges();
                TempData["sms"] = "Rechazar";
                ViewBag.sms = TempData["sms"];
                return RedirectToAction("Ticket");
            }

            ViewBag.aUsuariosId = new SelectList(db.aUsuarios, "Id", "Nombre", ticket.aUsuariosId);
            ViewBag.cTiposTickets = new SelectList(db.cTiposTickets, "Id", "Descripcion", ticket.cTiposTicketsId);
            ViewBag.rRegistrarMenusUsuariosId = new SelectList(db.rRegistrarMenusUsuarios, "Id", "Id", ticket.rRegistrarMenusUsuariosId);
            return View(ticket);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Deshacer(int id, int regId, int menuId)
        {
            rTickets ticket = db.rTickets.Find(id);     //Busca el ticket solicitado
            rRegistrarMenusUsuarios registro = db.rRegistrarMenusUsuarios.Find(regId);

            registro.rMenusId = menuId;     //Hace la actualizacion en el registro de acuerdo a lo solicitado
            ticket.Estatus = "1";   //Cambia el estado a pendiente

            if (ModelState.IsValid)
            {
                db.Entry(ticket).State = EntityState.Modified;
                db.Entry(registro).State = EntityState.Modified;
                db.SaveChanges();
                TempData["sms"] = "Deshacer";
                ViewBag.sms = TempData["sms"];
                return RedirectToAction("Ticket");
            }

            ViewBag.aUsuariosId = new SelectList(db.aUsuarios, "Id", "Nombre", ticket.aUsuariosId);
            ViewBag.cTiposTickets = new SelectList(db.cTiposTickets, "Id", "Descripcion", ticket.cTiposTicketsId);
            ViewBag.rRegistrarMenusUsuariosId = new SelectList(db.rRegistrarMenusUsuarios, "Id", "Id", ticket.rRegistrarMenusUsuariosId);
            return View(ticket);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
