namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class aUsuarios
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public aUsuarios()
        {
            rComentarios = new HashSet<rComentarios>();
            rRegistrarMenusUsuarios = new HashSet<rRegistrarMenusUsuarios>();
            rTickets = new HashSet<rTickets>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(15)]
        public string ApellidoPaterno { get; set; }

        [StringLength(15)]
        public string ApellidoMaterno { get; set; }

        [StringLength(15)]
        public string Contraseña { get; set; }

        [Required]
        [StringLength(15)]
        public string NumeroEmpleado { get; set; }

        public bool Estatus { get; set; }

        public int cTiposUsuariosId { get; set; }

        public int cEmpresasId { get; set; }

        [StringLength(50)]
        public string CorreoElectronico { get; set; }

        [StringLength(7)]
        public string CodigoSeguridad { get; set; }

        public virtual cEmpresas cEmpresas { get; set; }

        public virtual cTiposUsuarios cTiposUsuarios { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rComentarios> rComentarios { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rRegistrarMenusUsuarios> rRegistrarMenusUsuarios { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rTickets> rTickets { get; set; }
    }
}
