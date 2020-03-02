/* =================================================================================================
-- Autor:		Francisco Javier Soto Infante
-- Creacion:    17/02/2019
-- Descripcion:	Archivo javascritp para el funcionamiento del las pagina 'CatalogoMenu'
-- Version:     V_0.2
-- ================================================================================================= */

$().ready(function () {
    validar_formularios();
    inicializar_tablas();

    // Adjuntamos un evento de escritura al input con el id: 'buscador'
    $("#buscador").on("keyup click", function () {
        // Cuando se escribe algo en el input se ejecuta la funcion
        buscadorGlobal();
    });
});

// Funcion para inicializar las tablas
function inicializar_tablas() {
    /* Inicializacion de la tabla de tipos de menu activos
       Elementos de la tabla:
        l - length changing input control
        f - El buscador
        t - La tabla
        i - Table information summary
        p - Paginacion
        r - processing display element
    */
    $('#menu-activos').DataTable({
        responsive: true, // tabla responsiva
        dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
        language: { // Lenguaje de la tabla
            url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        rowGroup: { // Agrupacion por la tercera columna de la tabla
            dataSrc: 0
        },
        columnDefs: [ // Ocultamos la tercera columna para que no se repita
            { "visible": false, "targets": 0 }
        ],
        order: [[0, 'asc']] // Ordenamos asecendentemente los datos en base a la tercera tabla
    });

    // Inicializacion de la tabla de tipos de menu inactivos
    $('#menu-inactivos').DataTable({
        responsive: true, // tabla responsiva
        dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
        language: { // Lenguaje de la tabla
            url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        rowGroup: { // Agrupacion por la tercera columna de la tabla
            dataSrc: 0
        },
        columnDefs: [ // Ocultamos la tercera columna para que no se repita
            { "visible": false, "targets": 0 }
        ],
        order: [[0, 'asc']] // Ordenamos asecendentemente los datos en base a la tercera tabla
    });
}

// Funcion para validar los formularios
function validar_formularios() {
    // Inicia la validacion del formulario tipo menu
    try {
        $("#form-menu").validate({
            // Indicamos reglas de validacion
            rules: {
                inputFecha: {
                    required: true
                },
                
                selectFruta: {
                    required: true
                },

                selectPostre: {
                    required: true
                },

                selectMBarra: {
                    required: true
                },

                selectMOficina: {
                    required: true
                },

                selectMEspecial: {
                    required: true
                }
            },

            // Mensajes a mostrar si no cumple con las reglas
            messages: {
                inputFecha: {
                    required: "Campo requerido."
                },
                
                selectFruta: {
                    required: "Campo requerido."
                },

                selectPostre: {
                    required: "Campo requerido."
                },

                selectMBarra: {
                    required: "Campo requerido."
                },

                selectMOficina: {
                    required: "Campo requerido."
                },

                selectMEspecial: {
                    required: "Campo requerido."
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
    $("#menu-activos")
        .DataTable()
        .search($("#buscador").val())
        .draw();

    // Buscar el valor escrito en la tabla de inactivos
    $("#menu-inactivos")
        .DataTable()
        .search($("#buscador").val())
        .draw();
}