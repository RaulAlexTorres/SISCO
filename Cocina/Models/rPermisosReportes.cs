namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class rPermisosReportes
    {
        public int Id { get; set; }

        public bool Estatus { get; set; }

        public int cTiposUsuariosId { get; set; }

        public int mReportesContabilidadId { get; set; }

        public virtual cTiposUsuarios cTiposUsuarios { get; set; }

        public virtual mReportesContabilidad mReportesContabilidad { get; set; }
    }
}
