namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class rRegistrarMenusUsuarios
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public rRegistrarMenusUsuarios()
        {
            rComentarios = new HashSet<rComentarios>();
            rTickets = new HashSet<rTickets>();
        }

        public int Id { get; set; }

        public bool Postre { get; set; }

        public bool Fruta { get; set; }

        public bool Estatus { get; set; }

        public bool Asistencia { get; set; }

        public int rMenusId { get; set; }

        public int aUsuariosId { get; set; }

        public virtual aUsuarios aUsuarios { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rComentarios> rComentarios { get; set; }

        public virtual rMenus rMenus { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rTickets> rTickets { get; set; }
    }
}
