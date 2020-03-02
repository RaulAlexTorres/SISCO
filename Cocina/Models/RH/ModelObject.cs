using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Cocina.Models.RH
{
    public class ModelObject {}

    public class TablaDeInformacion
    {
        public int? Año { get; set; }
        public int? Semana { get; set; }
        public string Menu { get; set; }
        public int PlatillosLunesJueves { get; set; }
        public int PlatillosViernes { get; set; }
        public int AsistenciaLunesjueves { get; set; }
        public int AsistenciaViernes { get; set; }
    }

    public class AsistenciaPorDias
    {
        public int? Semana { get; set; }
        public int Lunesjueves { get; set; }
        public int Viernes { get; set; }
    }

    public class FechaPorAño
    {
        [Required]
        public string Año { get; set; }
        [Required]
        public string Id { get; set; }
    }

    public class SemanasActivas
    {
        public int? Semanas { get; set; }
    }

    public class TicketsConDatos
    {
        public int Id { get; set; }
        public string NoEmpleado { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }        
        public string FechaDeSolicitud { get; set; }
        public string TipoDeSolicitud { get; set; }
        public int? PlatilloActual { get; set; }
        public int? PlatilloSolicitado { get; set; }
        public string Estatus { get; set; }
        public int RegistarMenuUsuarioId { get; set; }
    }
}