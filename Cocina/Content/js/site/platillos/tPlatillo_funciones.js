/* =================================================================================================
-- Autor:		Francisco Javier Soto Infante
-- Creacion:    17/02/2019
-- Descripcion:	Archivo javascritp para el funcionamiento del las pagina 'CatalogoTPlatillo'
-- Version:     V_0.1
-- ================================================================================================= */

$().ready(function () {
    validar_formularios();
    inicializar_tablas();

    // Adjuntamos un evento de escritura al input con el id: 'table-search'
    $("#table-search").on("keyup click", function () {
        // Cuando se escribe algo en el input se ejecuta la funcion
        buscadorGlobal();
    });
});

// Funcion para inicializar las tablas
function inicializar_tablas() {
    /* Inicializacion de la tabla de tipos de platillos activos
       Elementos de la tabla:
        l - length changing input control
        f - El buscador
        t - La tabla
        i - Table information summary
        p - Paginacion
        r - processing display element
    */
    $('#tplatillos-activos').DataTable({
        responsive: true, // tabla responsiva
        dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
        language: { // Lenguaje de la tabla
            url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        }
    });

    // Inicializacion de la tabla de tipos de platillos activos
    $('#tplatillos-inactivos').DataTable({
        responsive: true, // tabla responsiva
        dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
        language: { // Lenguaje de la tabla
            url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        }
    });
}

// Funcion para validar los formularios
function validar_formularios() {
    // Inicia la validacion del formulario tipo platillo
    try {
        $("#form-tipoPlatillo").validate({
            rules: {
                inputTPlatillo: {
                    required: true,
                    maxlength: 20
                }
            },
            
            // Mensajes a mostrar si no cumple con las reglas
            messages: {
                inputTPlatillo: {
                    required: "Campo requerido.",
                    maxlength: "Por favor ingrese no más de 20 caracteres."
                }
            },

            // Colocación de errores
            errorPlacement: function errorPlacement(error, element) {
                var $parent = $(element).parents(".form-group");
                // Validamos que no se dupliquen los mensajes de errores
                if ($parent.find(".jquery-validation-error").length) {
                    return;
                }
                // Indicamos el estilo de como se van a mostrar los errores
                $parent.append(
                    error.addClass(
                        "jquery-validation-error small form-text invalid-feedback"
                    )
                );
            },
            // Elementos que se van a recalcar el error
            highlight: function (element) {
                var $el = $(element);
                var $parent = $el.parents(".form-group");
                $el.addClass("is-invalid");
            },
            // Elementos para quitar el recalque de error
            unhighlight: function (element) {
                $(element)
                    .parents(".form-group")
                    .find(".is-invalid")
                    .removeClass("is-invalid");
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// Funcion para buscar en las tablas
function buscadorGlobal() {
    // Buscar el valor escrito en la tabla de activos
    $("#tplatillos-activos")
        .DataTable()
        .search($("#table-search").val())
        .draw();

    // Buscar el valor escrito en la tabla de inactivos
    $("#tplatillos-inactivos")
        .DataTable()
        .search($("#table-search").val())
        .draw();
}