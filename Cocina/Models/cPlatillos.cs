namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class cPlatillos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public cPlatillos()
        {
            rMenus = new HashSet<rMenus>();
            rMenus1 = new HashSet<rMenus>();
            rMenus2 = new HashSet<rMenus>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(25)]
        public string Descripcion { get; set; }

        public bool Estatus { get; set; }

        public int cTiposPlatillosId { get; set; }

        public virtual cTiposPlatillos cTiposPlatillos { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rMenus> rMenus { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rMenus> rMenus1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rMenus> rMenus2 { get; set; }
    }
}
