namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class cTiposUsuarios
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public cTiposUsuarios()
        {
            aUsuarios = new HashSet<aUsuarios>();
            rPermisosReportes = new HashSet<rPermisosReportes>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string Descripcion { get; set; }

        public bool Estatus { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<aUsuarios> aUsuarios { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rPermisosReportes> rPermisosReportes { get; set; }
    }
}
