/* ======================================================================================================
-- Autor:		Francisco Javier Soto Infante
-- Creacion:    17/02/2019
-- Descripcion:	Archivo javascritp para el funcionamiento del las pagina 'Platillos.Index'
-- Version:     V_0.4
-- ====================================================================================================== */

var tabla_pActivos;
var tabla_pInactivos;
var form_platillo;
var accion;

$().ready(function () {
    inicializar_tablas();

    // Evento para ejecutar la funcion de buscar en las tablas
    $("#buscador").on("keyup click", function () {
        buscadorGlobal();
    });
    
    // Evento para ejecutar la funcion de los filtros
    $("input:checkbox").on("change", function () {
        filtrarPorTipo();
    });

    // Evento para guardar la accion a realizar en el formulario
    $("#form-platillo button").click(function (ev) {
        accion = $(this).attr("value");
    });

    // Evento para ejecutar la accion
    $('#form-platillo').on('submit', function (e) {
        e.preventDefault();
        redirigirAccion();
    });
    
    // Evento para agarrar los datos de una fila en la tabla activos y mostrarlos en el formulario
    $('#platillos-activos tbody').on('click', '#btnEditar', function () {
        var data = tabla_pActivos.row($(this).parents('tr')).data();
        obtenerPlatillo(data);
    });

    // Evento para agarrar los datos de una fila en la tabla inactivos y mostrarlos en el formulario
    $('#platillos-inactivos tbody').on('click', '#btnEditar', function () {
        var data = tabla_pInactivos.row($(this).parents('tr')).data();
        obtenerPlatillo(data);
    });
  
});

// Funcion para inicializar la tabla de activos e inactivos
function inicializar_tablas() {
    /* Elementos de la tabla:
        l - length changing input control
        f - El buscador
        t - La tabla
        i - Table information summary
        p - Paginacion
        r - processing display element
    */
    // Inicializacion de la tabla de platillos activos
    tabla_pActivos = $('#platillos-activos').DataTable({
        responsive: true, // tabla responsiva
        dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
        language: { // Lenguaje de la tabla
          url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        ajax: { // Cargamos los datos a la tabla
            url: "/Platillo/ListarActivos/",
            type: "GET",
            dataType: "json",
        },
        columns: [ // Indicamos los datos de las columnas
            { data: "platillo" },
            { data: "id_tPlatillo" },
            { data: "tipo_plat" },
            {
                orderable: false,
                data: "id_platillo",
                render: function (data) {
                    return '<button type="button"'
                        + 'class="btn btn-sm btn-icon btn-secondary" id="btnEditar" name="btnEditar">'
                        + '<i class="fa fa-pencil-alt"></i>'
                        + '<span class="sr-only">Editar</span>'
                        + '</button>'

                        + '<button type="button"'
                        + 'class="btn btn-sm btn-icon btn-secondary" onclick="return cambiarEstado(&apos;' + data + '&apos;)">'
                        + '<i class="far fa-trash-alt"></i>'
                        + '<span class="sr-only">Eliminar</span>'
                        + '</button>';
                }
            },
        ],
        rowGroup: { // Agrupacion por la columna tipo de platillo
            dataSrc: "tipo_plat"
        },
        columnDefs: [ // Ocultamos la columna de tipo de platillo
            { "visible": false, "targets": 1 }
        ],
        order: [[1, 'asc']] // Ordenamos asecendentemente los datos por tipo de platillo
    });

    // Inicializacion de la tabla de platillos inactivos
    tabla_pInactivos = $('#platillos-inactivos').DataTable({
        responsive: true, // tabla responsiva
        dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
        language: { // Lenguaje de la tabla
          url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
          },
        ajax: { // Cargamos los datos a la tabla
            url: "/Platillo/ListarInactivos/",
            type: "GET",
            dataType: "json",
        },
        columns: [ // Indicamos los datos de las columnas
            { data: "platillo" },
            { data: "id_tPlatillo" },
            { data: "tipo_plat" },
            {
                orderable: false,
                data: "id_platillo",
                render: function (data) {
                    return '<button type="button"'
                        + 'class="btn btn-sm btn-icon btn-secondary" id="btnEditar" name="btnEditar">'
                        + '<i class="fa fa-pencil-alt"></i>'
                        + '<span class="sr-only">Editar</span>'
                        + '</button>'

                        + '<button type="button"'
                        + 'class="btn btn-sm btn-icon btn-secondary" onclick="return cambiarEstado(&apos;' + data + '&apos;)">'
                        + '<i class="far fa-trash-alt"></i>'
                        + '<span class="sr-only">Eliminar</span>'
                        + '</button>';
                }
            },
        ],
        rowGroup: { // Agrupacion por la columna tipo de platillo
            dataSrc: "tipo_plat"
        },
        columnDefs: [ // Ocultamos la columna de tipo de platillo
            { "visible": false, "targets": 1 }
        ],
        order: [[1, 'asc']] // Ordenamos asecendentemente los datos por tipo de platillo
    });
}

// Funcion ejecutar las funciones de los botones oprimidos en el formulario
function redirigirAccion() {
    switch (accion) {
        case "btnGuardar":
            registrarPlatillo();
            break;

        case "btnActualizar":
            actualizarPlatillo();
            break;

        case "btnCancelar":
            limpiarFormulario();
            break;

        default:
            console.log(accion);
    }
}

/* ======================================================================================================
-- ===================================== Funciones Backend ==============================================
-- ====================================================================================================== */

/* -------------------------
-- -- Funciones Platillos --
-- ------------------------- */

// Funcion para guardar el formulario
function registrarPlatillo() {
    validar_formularios();
    if (form_platillo.valid()) {
        var platObj = { // Objeto platillo
            Descripcion: $('#inputPlatillo').val(),
            Estatus: true,
            cTiposPlatillosId: $('#selectTPlatillo').val()
        };

        $.ajax({
            url: "/Platillo/Registrar",
            data: JSON.stringify(platObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (codigo) {
                if (codigo == "COD-0") {
                    // Recargamos la tabla de activos
                    tabla_pActivos.ajax.reload();

                    // Creamos el mensaje de exito
                    var mensaje = "¡El platillo se ha registrado con exito!";
                    var titulo = "";
                    var tipo = "success";
                    notificacion(tipo, mensaje, titulo); 

                    // limpiamos el formulario
                    limpiarFormulario(); 
                } else {
                    mostrarErrores(codigo);
                }
            },
            error: function (errormessage) {
                var mensaje = "No se pudo registrar el platillo :C";
                var titulo = "";
                var tipo = "error";
                notificacion(tipo, mensaje, titulo);
            }
        });
    }
}

// Funcion para guardar los cambios en el formulario
function actualizarPlatillo() {
    validar_formularios();
    if (form_platillo.valid()) {
        var platObj = { // Objeto platillo
            Id: $('#inputIdPlatillo').val(),
            Descripcion: $('#inputPlatillo').val(),
            cTiposPlatillosId: $('#selectTPlatillo').val()
        };

        $.ajax({
            url: "/Platillo/Actualizar",
            data: JSON.stringify(platObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (codigo) {
                if (codigo == "COD-0") {
                    // Recargamos la tabla de activos e inactivos
                    tabla_pActivos.ajax.reload();
                    tabla_pInactivos.ajax.reload();

                    // Creamos el mensaje de exito
                    var mensaje = "¡El platillo se ha actualizado con exito!";
                    var titulo = "";
                    var tipo = "success";
                    notificacion(tipo, mensaje, titulo); 

                    // Reiniciamos el formulario (limpiar y resetear botones)
                    limpiarFormulario(); 
                    $('#btnGuardar').show(); 
                    $('#btnActualizar').hide();
                } else {
                    mostrarErrores(codigo);
                }
            },
            error: function (errormessage) {
                var mensaje = "No se pudo actualizar el platillo :C";
                var titulo = "";
                var tipo = "error";
                notificacion(tipo, mensaje, titulo);
            }
        });
    }
}

// Funcion para cambiar el estatus de 0 a 1
function cambiarEstado(ID) {
    $.confirm({ // muestra una alerta de confirmacion
        icon: 'fas fa-exclamation-triangle',
        title: 'Alerta!',
        content: 'Seguro que quieres cambiar de estado este platillo?',
        type: 'orange',
        typeAnimated: true,
        buttons: {
            Cambiar: { // si se acepta se realiza el cambio
                btnClass: 'btn-green',
                action: function () {
                    $.ajax({
                        url: "/Platillo/CambiarEstado/" + ID,
                        type: "POST",
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        success: function (result) {
                            tabla_pActivos.ajax.reload();
                            tabla_pInactivos.ajax.reload();

                            var mensaje = "¡El platillo ha cambiado de estado con exito!";
                            var titulo = "";
                            var tipo = "success";
                            notificacion(tipo, mensaje, titulo);
                        },
                        error: function (errormessage) {
                            var mensaje = "No se pudo cambiar el estado del platillo :C";
                            var titulo = "";
                            var tipo = "error";
                            notificacion(tipo, mensaje, titulo);
                        }
                    });
                }
            },
            cancelar: function () { }
        }
    });
}

/* -------------------------
-- - Funciones  TPlatillos -
-- ------------------------- */


/* ======================================================================================================
-- ===================================== Funciones Frontend =============================================
-- ====================================================================================================== */

// Funcion para validar los formularios
function validar_formularios() {
    try {
        // Inicia la validacion del formulario de platillos
        form_platillo = $("#form-platillo").validate({
            // Indicamos reglas de validacion
            rules: {
                inputPlatillo: {
                    required: true,
                    maxlength: 25
                },

                selectTPlatillo: {
                    required: true
                }
            },

            // Mensajes a mostrar si no cumple con las reglas
            messages: {
                inputPlatillo: {
                    required: "Campo requerido.",
                    maxlength: "Por favor ingrese no más de 25 caracteres."
                },

                selectTPlatillo: {
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
                // Validacion de combobox o selects
                if (
                    $el.hasClass("selectTPlatillo") ||
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

// Funcion para buscar los datos del platillo en la tabla
function obtenerPlatillo(data) {
    // Colocamos los datos en el formuario
    $('#inputIdPlatillo').val(data.id_platillo);
    $('#inputPlatillo').val(data.platillo);
    $('#selectTPlatillo option[value=' + data.id_tPlatillo + ']').prop('selected', true);

    // Animacion para subir la pantalla y mostrar/ocultar botones
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('#btnActualizar').show();
    $('#btnGuardar').hide();
}

// Funcion para buscar en las tablas 
function buscadorGlobal() {
  // Buscar el valor en la tabla de activos
    tabla_pActivos.search($("#buscador").val()).draw();

  // Buscar el valor en la tabla de inactivos
    tabla_pInactivos.search($("#buscador").val()).draw();
}

// Funcion para aplicaar filtro de busqueda en las tablas
function filtrarPorTipo() {
  // Tomamos el valor que contiene el filtro
  var positions = $('input:checkbox[name="switch"]:checked')
    .map(function () {
      return "^" + this.value + "$";
    })
    .get()
    .join("|");

  // Buscamos el valor en la tabla de activos
    tabla_pActivos.column(1).search(positions, true, false, false).draw(false);
  // Buscamos el valor en la tabla de inactivos
    tabla_pInactivos.column(1).search(positions, true, false, false).draw(false);
}

// Funcion para limpiar los campos del formulario
function limpiarFormulario() {
    // Limpiamos el formulario
    $('#inputIdPlatillo').val("");
    $('#inputPlatillo').val("");
    $('#selectTPlatillo option[value=""]').prop('selected', true);

    // Animacion para mostrar/ocultar botones
    $('#btnGuardar').show();
    $('#btnActualizar').hide();
}

// Funcion para notificar los errores
function mostrarErrores(codigo) {
    var tipo = "error";
    var titulo = "";
    switch (codigo) {
        case "COD-1":
            var mensaje = "¡El platillo ya existe!";
            notificacion(tipo, mensaje, titulo);
            break;

        case "COD-2":
            var mensaje = "¡Favor de llenar los campos requeridos!";
            notificacion(tipo, mensaje, titulo);
            break;
    }
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