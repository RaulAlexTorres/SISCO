namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("mReportesContabilidad")]
    public partial class mReportesContabilidad
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public mReportesContabilidad()
        {
            rPermisosReportes = new HashSet<rPermisosReportes>();
        }

        public int Id { get; set; }

        public bool Estatus { get; set; }
        
        public int Actual { get; set; }

        [Column(TypeName = "date")]
        public DateTime Fecha { get; set; }

        public int cTiposMenusId { get; set; }

        public virtual cTiposMenus cTiposMenus { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rPermisosReportes> rPermisosReportes { get; set; }
    }
}
