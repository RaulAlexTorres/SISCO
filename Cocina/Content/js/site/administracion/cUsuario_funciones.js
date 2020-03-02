/* ==================================================================================================== --
-- Autor:		Francisco Javier Soto Infante
-- Creacion:    17/02/2019
-- Descripcion:	Archivo javascript para el funcionamiento del las pagina 'Usuarios.Index'
-- Version:     V_0.8
-- ==================================================================================================== */

var tabla_uActivos;
var tabla_uInactivos;
var form_Usuario;
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

    // Evento para mostrar el campo de correo en el formulario
    $("#selectTEmpleado").on("change", function () {
        mostrarCorreo();
    });

    // Evento para guardar la accion a realizar en el formulario
    $("#form-usuario button").click(function (ev) {
        accion = $(this).attr("value");
    });

    // Evento para ejecutar la accion
    $('#form-usuario').on('submit', function (e) {
        e.preventDefault();
        redirigirAccion();
    });
    
    // Adjuntamos un evento click al boton editar de la tabla usuarios-activos 
    $('#usuarios-activos tbody').on('click', '#btnEditar', function () {
        // Cuando se presiona se toma los datos de la fila en la que se encuentra el boton
        var data = tabla_uActivos.row($(this).parents('tr')).data();
        obtenerUsuario(data); // Se ejecuta la funcion y se envian los datos del usuario
    });

    // Adjuntamos un evento click al boton editar de la tabla usuarios-inactivos 
    $('#usuarios-inactivos tbody').on('click', '#btnEditar', function () {
        // Cuando se presiona se toma los datos de la fila en la que se encuentra el boton
        var data = tabla_uInactivos.row($(this).parents('tr')).data();
        obtenerUsuario(data);// Se ejecuta la funcion y se envian los datos del usuario
    });
});

// Funcion para inicializar las tablas
function inicializar_tablas() {
  /* Elementos de la tabla:
        l - length changing input control
        f - El buscador
        t - La tabla
        i - Table information summary
        p - Paginacion
        r - processing display element */
  //Inicializacion de la tabla de usuarios activos
  tabla_uActivos = $('#usuarios-activos').DataTable({
    responsive: true, // tabla responsiva
    dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
    language: { // Lenguaje de la tabla
      url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
    },
    ajax: { // Cargamos los datos a la tabla
        url: "/Usuario/ListarActivos/",
        type: "GET",
        dataType: "json",
    },
    columns: [ // Indicamos los datos de las columnas
        { data: "numero_empleado" },
        { data: "nombre" },
        { data: "apPaterno" },
        { data: "apMaterno" },
        { data: "id_tUsuario" },
        { data: "tipo_usu" },
        { data: "correo_E" },
        {
            orderable: false,
            data: "id_usuario",
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
    rowGroup: { // Agrupacion por tipo de usuario
        dataSrc: "tipo_usu"
    },
    columnDefs: [ // Ocultamos la columan de tipo de usuario para que no se repita
        { "visible": false, "targets": 4 },
        { "visible": false, "targets": 5 }
    ],
    order: [[5, 'asc']] // Ordenamos asecendentemente los datos por tipo de usuario
  });

  // Inicializacion de la tabla de platillos inactivos
  tabla_uInactivos = $('#usuarios-inactivos').DataTable({
    responsive: true, // tabla responsiva
    dom: '<"top">rt<"bottom"lp>', // ubicacion de los elementos
    language: { // Lenguaje de la tabla
      url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
    },
    ajax: {
        url: "/Usuario/ListarInactivos/",
        type: "GET",
        dataType: "json",
    },
    columns: [ // Indicamos los datos de las columnas
        { data: "numero_empleado" },
        { data: "nombre" },
        { data: "apPaterno" },
        { data: "apMaterno" },
        { data: "id_tUsuario" },
        { data: "tipo_usu" },
        { data: "correo_E" },
        {
            orderable: false,
            data: "id_usuario",
            render: function (data) {
                return '<button type="button"'
                    + 'class="btn btn-sm btn-icon btn-secondary" id="btnEditar" name="btnEditar">'
                    + '<i class="fa fa-pencil-alt"></i>'
                    + '<span class="sr-only">Editar</span>'
                    + '</button>'

                    + '<button type="button"'
                    + 'class="btn btn-sm btn-icon btn-secondary" onclick="return cambiarEstado(&apos;' + data + '&apos;)">'
                    + '<i class="fas fa-trash-restore-alt"></i>'
                    + '<span class="sr-only">Eliminar</span>'
                    + '</button>';
                }
        },
    ],
    rowGroup: { // Agrupacion por tipo de usuario
        dataSrc: "tipo_usu"
    },
    columnDefs: [ // Ocultamos la columan de tipo de usuario y su id para que no se repita
        { "visible": false, "targets": 4 },
        { "visible": false, "targets": 5 }
    ],
    order: [[5, 'asc']] // Ordenamos asecendentemente los datos por tipo de usuario
  });
}

// Funcion ejecutar las funciones de los botones oprimidos en el formulario
function redirigirAccion() {
    switch (accion) {
        case "btnGuardar":
            registrar();
            break;

        case "btnActualizar":
            actualizar();
            break;

        case "btnCancelar":
            limpiarFormulario();
            break;

        default:
            console.log(accion);
    }
}

/* ==================================================================================================== --
-- ===================================== Funciones Backend ============================================ --
-- ==================================================================================================== */

// Funcion para guardar el usuario
function registrar() {
    validar_formulario();
    if (form_Usuario.valid()) {
        var usuObj = { // Objeto Usuario
            Nombre: $('#inputNombre').val(),
            ApellidoPaterno: $('#inputAPaterno').val(),
            ApellidoMaterno: $('#inputAMaterno').val(),
            NumeroEmpleado: $('#inputNEmpleado').val(),
            Estatus: true,
            cTiposUsuariosId: $('#selectTEmpleado').val(),
            cEmpresasId: 4,
            CorreoElectronico: $('#inputEmail').val()
        };

        $.ajax({
            url: "/Usuario/Registrar",
            data: JSON.stringify(usuObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == "COD-0") {
                    tabla_uActivos.ajax.reload();

                    var mensaje = "¡El usuario se ha registrado con exito!";
                    var titulo = "";
                    var tipo = "success";
                    notificacion(tipo, mensaje, titulo);

                    limpiarFormulario();
                } else {
                    mostrarErrores(result);
                }
            },
            error: function (errormessage) {
                var mensaje = "No se pudo registrar el usuario :C";
                var titulo = "";
                var tipo = "error";
                notificacion(tipo, mensaje, titulo);
            }
        });
    }
}

// Funcion para guardar los cambios de datos del usuario
function actualizar() {
    validar_formulario();
    if (form_Usuario.valid()) {
        var usuObj = { // Objeto Usuario
            Id: $('#inputId').val(),
            Nombre: $('#inputNombre').val(),
            ApellidoPaterno: $('#inputAPaterno').val(),
            ApellidoMaterno: $('#inputAMaterno').val(),
            NumeroEmpleado: $('#inputNEmpleado').val(),
            cTiposUsuariosId: $('#selectTEmpleado').val(),
            CorreoElectronico: $('#inputEmail').val(),
        };

        $.ajax({
            url: "/Usuario/Actualizar",
            data: JSON.stringify(usuObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == "COD-0") {
                    tabla_uActivos.ajax.reload();
                    tabla_uInactivos.ajax.reload();

                    var mensaje = "¡El usuario se ha actualizado con exito!";
                    var titulo = "";
                    var tipo = "success";
                    notificacion(tipo, mensaje, titulo);

                    limpiarFormulario();
                    $('#btnGuardar').show();
                    $('#btnActualizar').hide();
                } else {
                    mostrarErrores(result);
                }
            },
            error: function (errormessage) {
                var mensaje = "No se pudo actualizar el usuario :C";
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
        content: 'Seguro que quieres cambiar de estado este usuario?',
        type: 'orange',
        typeAnimated: true,
        buttons: {
            Cambiar: { // si se acepta se realiza el cambio
                btnClass: 'btn-green',
                action: function () {
                    $.ajax({
                        url: "/Usuario/CambiarEstado/" + ID,
                        type: "POST",
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        success: function (result) {
                            tabla_uActivos.ajax.reload();
                            tabla_uInactivos.ajax.reload();

                            var mensaje = "¡El usuario ha cambiado de estado con exito!";
                            var titulo = "";
                            var tipo = "success";
                            notificacion(tipo, mensaje, titulo);
                        },
                        error: function (errormessage) {
                            var mensaje = "No se pudo cambiar el estado del usuario :C";
                            var titulo = "";
                            var tipo = "error";
                            notificacion(tipo, mensaje, titulo);
                        }
                    });
                }
            },
            cancelar: function () { // si se cancela mostrar un mensaje de cancelado                
            }
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
        form_Usuario = $("#form-usuario").validate({
            // Indicamos reglas de validacion
            rules: {
                inputNombre: {
                    required: true,
                    maxlength: 20
                },

                inputAPaterno: {
                    required: true,
                    maxlength: 15
                },

                inputAMaterno: {
                    maxlength: 15
                },

                inputNEmpleado: {
                    required: true,
                    maxlength: 15
                },

                inputEmail: {
                    required: true,
                    maxlength: 50
                },

                selectTEmpleado: {
                    required: true
                }
            },

            // Mensajes a mostrar si no cumple con las reglas
            messages: {
                inputNombre: {
                    required: "Campo requerido.",
                    maxlength: "Por favor ingrese no más de 20 caracteres."
                },

                inputAPaterno: {
                    required: "Campo requerido.",
                    maxlength: "Por favor ingrese no más de 15 caracteres."
                },

                inputAMaterno: {
                    required: "Campo requerido.",
                    maxlength: "Por favor ingrese no más de 15 caracteres."
                },

                inputNEmpleado: {
                    required: "Campo requerido.",
                    maxlength: "Por favor ingrese no más de 15 caracteres."
                },

                inputEmail: {
                    required: "Campo requerido.",
                    maxlength: "Por favor ingrese no más de 50 caracteres."
                },

                selectTEmpleado: {
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

// Funcion para buscar los datos del usuario en la tabla
function obtenerUsuario(data) {
    $('#inputId').val(data.id_usuario);
    $('#inputNombre').val(data.nombre);
    $('#inputAPaterno').val(data.apPaterno);
    $('#inputAMaterno').val(data.apMaterno);
    $('#inputNEmpleado').val(data.numero_empleado);
    $('#selectTEmpleado option[value=' + data.id_tUsuario + ']').prop('selected', true);
    $('#inputEmail').val(data.correo_E);

    mostrarCorreo();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('#btnActualizar').show();
    $('#btnGuardar').hide();
}

// Funcion para buscar en las tablas 
function buscadorGlobal() {
    // Buscar el valor escrito en la tabla de activos
    tabla_uActivos.search($("#buscador").val()).draw();

    // Buscar el valor escrito en la tabla de inactivos
    tabla_uInactivos.search($("#buscador").val()).draw();
}

// Funcion para aplicaar filtro de busqueda en las tablas
function filtrarPorTipo() {
    // Tomamos el valor que contiene el filtro
    var positions = $('input:checkbox[name="switch"]:checked').map(function () {
        return '^' + this.value + '$';
    }).get().join('|');

    // Buscamos el valor en la tabla de platillos activos
    tabla_uActivos.column(5).search(positions, true, false, false).draw(false);
    // Buscamos el valor en la tabla de platillos inactivos
    tabla_uInactivos.column(5).search(positions, true, false, false).draw(false);
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
    $('#inputId').val("");
    $('#inputNombre').val("");
    $('#inputAPaterno').val("");
    $('#inputAMaterno').val("");
    $('#inputNEmpleado').val("");
    $('#selectTEmpleado option[value=""]').prop('selected', true);
    $('#inputEmail').val("");

    mostrarCorreo();
    $('#btnGuardar').show();
    $('#btnActualizar').hide();
}

// Funcion para registrar el correo si es administrador
function mostrarCorreo() {
    var tipo_Usuario = $("#selectTEmpleado").val();
    if (tipo_Usuario == 1 || tipo_Usuario == 2) {
        $("#correoUsuario").show();
    } else {
        $("#correoUsuario").hide();
        $('#inputEmail').val("");
    }
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
    }
}