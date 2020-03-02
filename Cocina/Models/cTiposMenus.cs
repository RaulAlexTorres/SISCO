namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class cTiposMenus
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public cTiposMenus()
        {
            mReportesContabilidad = new HashSet<mReportesContabilidad>();
            rMenus = new HashSet<rMenus>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(15)]
        public string Descripcion { get; set; }

        public bool Estatus { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<mReportesContabilidad> mReportesContabilidad { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rMenus> rMenus { get; set; }
    }
}
