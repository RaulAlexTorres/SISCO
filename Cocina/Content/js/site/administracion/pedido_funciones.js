/* ==================================================================================================== --
-- Autor:		Francisco Javier Soto Infante
-- Creacion:    27/02/2019
-- Descripcion:	Archivo javascript para el funcionamiento del las pagina 'Pedido.Index'
-- Version:     V_0.2
-- ==================================================================================================== */

var tabla_Pedido;
var form_Pedido;

$().ready(function () {
    inicializar_tabla();

    // Adjuntamos un evento de escritura al input con el id: 'buscador'
    $("#buscador").on("keyup click", function () {
        // Cuando se escribe algo en el input se ejecuta la funcion
        buscadorGlobal();
    });
    
    // Adjuntamos un evento de cambio al combobox de seleccion de año
    $("#filtroPorAño").on("change", function () {
        // Cuando cambia el estado de un checkbox se ejecuta la funcion
        obtenerSemanas();
    });

    // Adjuntamos un evento click al boton guardar
    $('#btnGuardar').on('click', function () {
        registrar();
    });

    // Adjuntamos un evento click al boton actualizar
    $('#btnActualiza').on('click', function () {
        actualizar();
    });
    
});

// Funcion para inicializar las tablas
function inicializar_tabla() {
    /* Elementos de la tabla:
          l - length changing input control
          f - El buscador
          t - La tabla
          i - Table information summary
          p - Paginacion
          r - processing display element
    */
    //Inicializacion de la tabla de pedidos
    tabla_Pedido = $('#pedidos-barra').DataTable({
        responsive: true, // tabla responsiva
        dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
        language: { // Lenguaje de la tabla
            url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        ajax: { // Cargamos los datos a la tabla
            url: "/Pedido/ListarPedidos/",
            type: "GET",
            dataType: "json",
        },
        columns: [ // Indicamos los datos de las columnas
            { data: "semana" },
            { data: "tipo_platillo" },
            { data: "platillos_LJ" },
            { data: "asistencia_LJ" },
            { data: "platillos_V" },
            { data: "asistencia_V" }
        ],
        columnDefs: [ // Ocultamos la columan de tipo de usuario para que no se repita
            { "visible": false, "targets": 6 }
        ],
        order: [[6, 'asc']] // Ordenamos asecendentemente los datos por semana
    });
}

/* ==================================================================================================== --
-- ===================================== Funciones Backend ============================================ --
-- ==================================================================================================== */

// Funcion para guardar el usuario
function registrar() {
    validar_formulario();
    if (form_Pedido.valid()) {
        var año = $('#selectAño').val();
        var nSemana = $('#selectSemana').val();
        var nPlatillo = $('#inputNPlatillos').val();

        $.post('/Pedido/registrarPedido', { año: año, nSemana: nSemana, nPlatillo: nPlatillo },
            function (result) {
                if (result == "COD-0") {
                    tabla_Pedido.ajax.reload();

                    var mensaje = "¡Se ha registrado con exito!";
                    var titulo = "";
                    var tipo = "success";
                    notificacion(tipo, mensaje, titulo);
                } else {
                    mostrarErrores(result);
                }
            }, 'json').fail(function () {
                var mensaje = "No se pudo registrar el pedido :C";
                var titulo = "";
                var tipo = "error";
                notificacion(tipo, mensaje, titulo);
            });
    }
}

// Funcion para guardar los cambios de datos del usuario
function actualizar() {
    validar_formulario();
    if (form_Pedido.valid()) {
        var año = $('#selectAño').val();
        var nSemana = $('#selectSemana').val();
        var nPlatillo = $('#inputNPlatillos').val();

        $.post('/Pedido/actualizarPedido', { año: año, nSemana: nSemana, nPlatillo: nPlatillo },
            function (result) {
                if (result == "COD-0") {
                    tabla_Pedido.ajax.reload();

                    var mensaje = "¡Se ha actualizado con exito!";
                    var titulo = "";
                    var tipo = "success";
                    notificacion(tipo, mensaje, titulo);
                } else {
                    mostrarErrores(result);
                }
            }, 'json').fail(function () {
                var mensaje = "No se pudo actualizar el pedido :C";
                var titulo = "";
                var tipo = "error";
                notificacion(tipo, mensaje, titulo);
            });
    }
}

// Funcion para guardar los cambios de datos del usuario
function obtenerSemanas() {
    filtrarPorAño();
    var año = $('#filtroPorAño').val();
    $.ajax({
        url: "/Pedido/obtenerSemanas/" + año,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            
        },
        error: function (errormessage) {
            
        }
    });
}

/* ==================================================================================================== --
-- ===================================== Funciones Frontend =========================================== --
-- ==================================================================================================== */

// Funcion para validar los formularios
function validar_formulario() {
    try {
        // Inicia la validacion del formulario de usuarios
        form_Pedido = $("#form-pedido").validate({
            // Indicamos reglas de validacion
            rules: {
                selectSemana: {
                    required: true
                },

                inputNPlatillos: {
                    required: true,
                    maxlength: 20
                }
            },

            // Mensajes a mostrar si no cumple con las reglas
            messages: {
                selectSemana: {
                    required: "Campo requerido."
                },

                inputNPlatillos: {
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
                // Validacion de combobox o selects
                if (
                    $el.hasClass("selectTEmpleado") ||
                    $el.attr("data-role") === "tagsinput"
                ) {
                    isValid = false;
                    $el.parent().addClass("is-invalid");
                }
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

// Funcion para aplicaar filtro de busqueda en las tablas
function filtrarPorAño() {
    // Tomamos el valor que contiene el filtro
    var positions = $('#filtroPorAño').map(function () {
        return '^' + this.value + '$';
    }).get().join('|');

    // Buscamos el valor en la tabla de platillos activos
    tabla_Pedido.column(6).search(positions, true, false, false).draw(false);
}

// Funcion para buscar en las tablas 
function buscadorGlobal() {
    // Buscar el valor escrito en la tabla de activos
    tabla_uActivos.search($("#buscador").val()).draw();

    // Buscar el valor escrito en la tabla de inactivos
    tabla_uInactivos.search($("#buscador").val()).draw();
}

// Funcion para avisar al usuario si se pudo realizar la accion
function notificacion(tipo, mensaje, titulo) {
    toastr[tipo](mensaje, titulo, {
        positionClass: "toast-top-right",
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        rtl: false,
        timeOut: 3500
    });
}

// Funcion para limpiar los campos del formulario
function limpiarFormulario() {
    $('#inputNPlatillos').val("");
    $('#selectSemana option[value=""]').prop('selected', true);
    
    $('#btnGuardar').show();
    $('#btnActualizar').hide();
}

// Funcion para notificar los errores
function mostrarErrores(result) {
    var nError = result.split("-");
    var tipo = "error";
    var titulo = "";
    switch (parseInt(nError[1])) {
        case 1:
            var mensaje = "¡El numero de empleado ya existe!";
            notificacion(tipo, mensaje, titulo);
            break;

        case 2:
            var mensaje = "¡El correo electronico ya existe!";
            notificacion(tipo, mensaje, titulo);
            break;

        case 3:
            var mensaje = "¡Favor de llenar los campos requeridos!";
            notificacion(tipo, mensaje, titulo);
            break;
        default:
    }
}