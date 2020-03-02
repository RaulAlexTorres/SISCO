namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class rMenus
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public rMenus()
        {
            rRegistrarMenusUsuarios = new HashSet<rRegistrarMenusUsuarios>();
        }

        public int Id { get; set; }

        [Column(TypeName = "date")]
        public DateTime Fecha { get; set; }

        public bool Estatus { get; set; }

        public int cTiposMenusId { get; set; }

        public int PlatilloFuerteId { get; set; }

        public int PostreId { get; set; }

        public int FrutaId { get; set; }

        public virtual cPlatillos cPlatillos { get; set; }

        public virtual cPlatillos cPlatillos1 { get; set; }

        public virtual cPlatillos cPlatillos2 { get; set; }

        public virtual cTiposMenus cTiposMenus { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rRegistrarMenusUsuarios> rRegistrarMenusUsuarios { get; set; }
    }
}
