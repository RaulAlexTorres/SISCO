namespace Cocina.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class rTickets
    {
        public int Id { get; set; }

        [Column(TypeName = "date")]
        public DateTime Fecha { get; set; }

        [Required]
        [StringLength(10)]
        public string Estatus { get; set; }

        public int aUsuariosId { get; set; }

        public int rRegistrarMenusUsuariosId { get; set; }

        public int? rMenusId { get; set; }

        public int cTiposTicketsId { get; set; }

        public bool? Postre { get; set; }

        public bool? Fruta { get; set; }

        public int? MenuId { get; set; }

        public virtual aUsuarios aUsuarios { get; set; }

        public virtual cTiposTickets cTiposTickets1 { get; set; }

        public virtual rRegistrarMenusUsuarios rRegistrarMenusUsuarios { get; set; }
    }
}
