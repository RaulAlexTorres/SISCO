namespace Cocina.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Modelo : DbContext
    {
        public Modelo()
            : base("name=Modelo")
        {
        }

        public virtual DbSet<aUsuarios> aUsuarios { get; set; }
        public virtual DbSet<cEmpresas> cEmpresas { get; set; }
        public virtual DbSet<cPlatillos> cPlatillos { get; set; }
        public virtual DbSet<cTiposMenus> cTiposMenus { get; set; }
        public virtual DbSet<cTiposPlatillos> cTiposPlatillos { get; set; }
        public virtual DbSet<cTiposTickets> cTiposTickets { get; set; }
        public virtual DbSet<cTiposUsuarios> cTiposUsuarios { get; set; }
        public virtual DbSet<mReportesContabilidad> mReportesContabilidad { get; set; }
        public virtual DbSet<rComentarios> rComentarios { get; set; }
        public virtual DbSet<rMenus> rMenus { get; set; }
        public virtual DbSet<rPermisosReportes> rPermisosReportes { get; set; }
        public virtual DbSet<rRegistrarMenusUsuarios> rRegistrarMenusUsuarios { get; set; }
        public virtual DbSet<rTickets> rTickets { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<aUsuarios>()
                .Property(e => e.NumeroEmpleado)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<aUsuarios>()
                .HasMany(e => e.rComentarios)
                .WithRequired(e => e.aUsuarios)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<aUsuarios>()
                .HasMany(e => e.rRegistrarMenusUsuarios)
                .WithRequired(e => e.aUsuarios)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<aUsuarios>()
                .HasMany(e => e.rTickets)
                .WithRequired(e => e.aUsuarios)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cEmpresas>()
                .HasMany(e => e.aUsuarios)
                .WithRequired(e => e.cEmpresas)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cPlatillos>()
                .HasMany(e => e.rMenus)
                .WithRequired(e => e.cPlatillos)
                .HasForeignKey(e => e.PlatilloFuerteId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cPlatillos>()
                .HasMany(e => e.rMenus1)
                .WithRequired(e => e.cPlatillos1)
                .HasForeignKey(e => e.PostreId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cPlatillos>()
                .HasMany(e => e.rMenus2)
                .WithRequired(e => e.cPlatillos2)
                .HasForeignKey(e => e.FrutaId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cTiposMenus>()
                .HasMany(e => e.mReportesContabilidad)
                .WithRequired(e => e.cTiposMenus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cTiposMenus>()
                .HasMany(e => e.rMenus)
                .WithRequired(e => e.cTiposMenus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cTiposPlatillos>()
                .HasMany(e => e.cPlatillos)
                .WithRequired(e => e.cTiposPlatillos)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cTiposTickets>()
                .HasMany(e => e.rTickets)
                .WithRequired(e => e.cTiposTickets1)
                .HasForeignKey(e => e.cTiposTicketsId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cTiposUsuarios>()
                .HasMany(e => e.aUsuarios)
                .WithRequired(e => e.cTiposUsuarios)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<cTiposUsuarios>()
                .HasMany(e => e.rPermisosReportes)
                .WithRequired(e => e.cTiposUsuarios)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<mReportesContabilidad>()
                .HasMany(e => e.rPermisosReportes)
                .WithRequired(e => e.mReportesContabilidad)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<rMenus>()
                .HasMany(e => e.rRegistrarMenusUsuarios)
                .WithRequired(e => e.rMenus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<rRegistrarMenusUsuarios>()
                .HasMany(e => e.rComentarios)
                .WithRequired(e => e.rRegistrarMenusUsuarios)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<rRegistrarMenusUsuarios>()
                .HasMany(e => e.rTickets)
                .WithRequired(e => e.rRegistrarMenusUsuarios)
                .WillCascadeOnDelete(false);
        }
    }
}
