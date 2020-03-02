namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class rComentarios
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string descripcion { get; set; }

        [Column(TypeName = "date")]
        public DateTime fecha { get; set; }

        public int aUsuariosId { get; set; }

        public int rRegistrarMenusUsuariosId { get; set; }

        public virtual aUsuarios aUsuarios { get; set; }

        public virtual rRegistrarMenusUsuarios rRegistrarMenusUsuarios { get; set; }
    }
}
