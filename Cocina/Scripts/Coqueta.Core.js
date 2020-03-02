var lenguajeDataTable = {
    "sProcessing": "<h4 class='text-info text-thin'>Cargando...</h4>",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron registros",
    "sEmptyTable": "Ningún registro disponible en esta tabla",
    "sInfo": "Mostrando del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};

//// FORMATEADORES
try { $('.telefono').inputmask({ "mask": "(999) 999-9999" }); } catch (e) { }
try { $('.codigo-postal').inputmask('99999'); } catch (e) { }
try { $('.fecha').inputmask({ "mask": "99/99/9999" }); } catch (e) { }
try { $('.fecha').datepicker({ language: 'es', format: 'dd/mm/yyyy', autoclose: true, todayHighlight: true }); } catch (e) { }
try {
    $('.hora').datetimepicker({ pickDate: false, format: 'hh:mm' }).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });
} catch (e) { }
try { $('.solo-numeros').mask('0-9', { placeholder: ' ' }); } catch (e) { }

var formatoFecha = 'DD/MM/YYYY';
var nombreDia = new Array('Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado');
var nombreCortoDia = new Array('Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab');
var nombreCorto2Dia = new Array('Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa');
var nombreMes = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
var nombreCortoMes = new Array('Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic');

if (typeof moment === "function") {
    var fechaRangoLimiteInicial = moment().subtract(730, 'days');
    var fechaRangoLimiteFinal = moment();
    var fechaRangoSeleccionInicial;
    var fechaRangoSeleccionFinal;
}

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100)
            $('.scrolltop').fadeIn();
        else
            $('.scrolltop').fadeOut();
    });

    $('#btnCambiarRol').click(function () {
        var idRolSeleccionado = $('input:radio[name=radRol]:checked').val();
        AjaxCallJson('/Seguridad/CambiarRol', { idRolSeleccionado: idRolSeleccionado }, function () { location.reload(); });
    });

    $('#btnCloseModal').click(function (e) {
        e.preventDefault();
        try { EventoHiddenModal(e); } catch (e) { }


        if (typeof CerrarModalCapturaTallas == 'function')
            location.reload();


        if (typeof CerrarModalDatosGeneral == 'function')
            location.reload();
    });
});

function InicializarCampoRangoFecha(fechaInicial, fechaFinal) {    
    if (fechaInicial == null)
        fechaInicial = fechaRangoLimiteInicial;

    if (fechaFinal == null)
        fechaFinal = fechaRangoLimiteFinal;

    $('#txtRangoFecha').daterangepicker({
        startDate: fechaInicial,
        endDate: fechaFinal,
        minDate: fechaRangoLimiteInicial,
        maxDate: fechaRangoLimiteFinal,
        ranges: {
            'HOY': [moment(), moment()],
            'AYER': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'ÚLTIMOS 7 DÍAS': [moment().subtract(6, 'days'), moment()],
            'ÚLTIMOS 30 DÍAS': [moment().subtract(29, 'days'), moment()],
            'ESTE MES': [moment().startOf('month'), moment().endOf('month')],
            'ÚLTIMO MES': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'HACE 1 MES': [moment().subtract(1, 'month'), moment()],
            'HACE 2 MESES': [moment().subtract(2, 'month'), moment()],
            'HACE 3 MESES': [moment().subtract(3, 'month'), moment()]
        },
        locale: {
            format: formatoFecha,
            separator: ' - ',
            applyLabel: 'Seleccionar',
            cancelLabel: 'Cancelar',
            fromLabel: 'Desde',
            toLabel: 'Hasta',
            customRangeLabel: 'PERSONALIZAR',
            daysOfWeek: nombreCorto2Dia,
            monthNames: nombreMes
        }
    }, FormatoCampoFecha);
    FormatoCampoFecha(fechaInicial, fechaFinal);
}

function AjaxCallModel(urlAjax, dataAjax, successAjax, errorAjax) {
    AjaxCall('application/x-www-form-urlencoded; charset=UTF-8', urlAjax, dataAjax, successAjax, errorAjax);
}

function AjaxCallJson(urlAjax, dataAjax, successAjax, errorAjax) {
    AjaxCall('application/json; charset=utf-8', urlAjax, JSON.stringify(dataAjax), successAjax, errorAjax);
}

var activeRequest = 0;
function AjaxCall(contentType, urlAjax, dataAjax, successAjax, errorAjax) {
    var headers = {};
    headers['__RequestVerificationToken'] = $('input[name=__RequestVerificationToken]').val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: contentType,
        processData: false,
        url: urlAjax,
        async: true,
        headers: headers,
        data: dataAjax,
        beforeSend: function (data) {
            $('#divWait').css('display', 'inline');
            $('.btn').attr('disabled', true);
            activeRequest++;
        },
        success: function (data) {
            activeRequest--;
            if (activeRequest == 0) {
                $('#divWait').css('display', 'none');
                $('.btn').attr('disabled', false);
            }
            try { successAjax(data); } catch (e) { };
        },
        error: function (data) {
            activeRequest = 0;
            $('#divWait').css('display', 'none');
            $('.btn').attr('disabled', false);
            if (errorAjax != null)
                errorAjax(data);
            else
                ErrorAjaxInternal(data);
        }
    });
}

function ErrorAjaxInternal(result) {
    swal({ html: result.responseText });
    $('#divFooter').hide();
    $('.swal2-modal').css('width', '950px');
}

function ConfigurarCamposRequeridos() {
    $('.campoRequerido').each(function () {
        $(this).html($(this).text() + '&nbsp;&nbsp;<i class="fa fa-info-circle text-danger error"></i>');
    });
}

/*
    Función de autocompletado
 */
function Autocomplete(control, array) {
    $('#' + control).autoComplete({
        minChars: 2,
        source: function (term, suggest) {
            term = term.toLowerCase();
            var matches = [];
            for (i = 0; i < array.length; i++)
                if (~array[i].toLowerCase().indexOf(term)) matches.push(array[i]);
            suggest(matches);
        }
    });
}

function ServerDataTable(id, url, parametros, metodoHttp, columnas, callback, sorting) {
 
    var valueSorting = [0, 'asc'];
    if (sorting != null)
        valueSorting = sorting;

    $(id).dataTable({
        'bServerSide': true,
        'sAjaxSource': url,
        'sServerMethod': metodoHttp,
        'fnServerParams': function (aoData) { if (parametros != null) aoData.push(parametros); $('#divWait').css('display', 'inline'); },
        'bProcessing': true,
        'language': lenguajeDataTable,
        'aoColumns': columnas,
        'aaSorting': valueSorting,
        "fnDrawCallback": function (oSettings) {
            $('#divWait').css('display', 'none');
            if (callback != null)
                callback();
        }
    });
}

//// Modal
function AbrirModal(titulo, view, type, ancho) {
    var anchoDefault = $(window).width() - $(window).width() * 0.1;
    if (ancho != null && ancho <= anchoDefault)
        anchoDefault = ancho;
    $.ajax({
        type: type,
        url: view,
        async: false,
        dataType: 'html',
        processData: false,
        cache: false,
        beforeSend: function (data) {
            $('#divWait').css('display', 'inline');
            $('.btn').attr('disabled', true);
        },
        success: function (data) {
            $('#titulo').text(titulo);
            $('#contenidoModal').html(data);
            $('#divModal').modal({ "backdrop": "static", keyboard: false });
            $('#divWait').css('display', 'none');
            $('.btn').attr('disabled', false);
            $('#divModal .modal-dialog').css('width', anchoDefault + 'px');
            $('#divModal').modal('show');
            var tracking = $('.TrackingModal').val();
            if (tracking != null)
              AjaxCallJson('/Operacion/Tracking', { evento: $('.TrackingModal').val() }, function (data) { });
      
        },
        error: function (x) {
            $('#divWait').css('display', 'none');
            $('.btn').attr('disabled', false);
            ErrorAjaxInternal(data);
        }
    });
}

function OcultarModal() {
    $('#divModal').modal('hide');
}

//// Validador Jquery Validate
function AgregarValidadorFormulario(formulario, reglas) {

    //Creacion de reglas mediante expresiones regulares
    jQuery.validator.addMethod('alpha_numeric', function (value) {
        return value.match(/^([a-zA-Z0-9]+)$/);
    });

    //Se agregan las reglas a los controles.
    $(formulario).validate({
        rules: reglas,
        highlight: function (element, errorClass) {
            $(element).fadeOut(function () {
                $(element).fadeIn();
            });
            //$(element).addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            //    $(this).removeClass('pulse animated');        
            //});
        }
    });

    //Cambio de mensajes
    jQuery.extend(jQuery.validator.messages, {
        required: "Campo obligatorio.",
        number: "El formato del contenido debe ser numerico.",
        min: "El valor debe ser mayor o igual a {0}.",
        max: "El valor debe ser menor o igual a {0}.",
        step: "El formato del contenido debe entero.",
        alpha_numeric: 'El formato del campo es incorrecto.'
    });
}

function AgregarValidadorCampo(control, reglas) {

    //Creacion de reglas mediante expresiones regulares
    jQuery.validator.addMethod('alpha_numeric', function (value) {
        return value.match(/^([a-zA-Z0-9]+)$/);
    });

    //Se agregan las reglas al control.
    $(control).rules('add', reglas);

    //Cambio de mensajes
    jQuery.extend(jQuery.validator.messages, {
        required: "Campo obligatorio.",
        number: "El formato del contenido debe ser numerico.",
        min: "El valor debe ser mayor o igual a {0}.",
        max: "El valor debe ser menor o igual a {0}.",
        step: "El formato del contenido debe entero.",
        alpha_numeric: 'El formato del campo es incorrecto.'
    });
}


function dataTable(table, botones) {
    if (botones) {
        $('#' + table).dataTable({
            dom: 'Bfrtip',
            "buttons": [
                { extend: 'excelHtml5', text: '<i class="fa fa-file-excel-o"></i>', titleAttr: 'Excel', className: 'btn btn-primary' },
                { extend: 'pdfHtml5', text: '<i class="fa fa-file-pdf-o"></i>', titleAttr: 'PDF', className: 'btn btn-primary' },
                { extend: 'csvHtml5', text: '<i class="fa fa-file-text-o"></i>', titleAttr: 'CSV', className: 'btn btn-primary' }],
            "sPaginationType": "full_numbers",
            "paging": true,
            "ordering": true,
            "info": true,
            "responsive": true,
            "destroy": true,
            "language": lenguajeDataTable
        });
    } else {
        $('#' + table).dataTable({
            "paging": true,
            "ordering": true,
            "info": true,
            "responsive": true,
            "destroy": true,
            "language": lenguajeDataTable
        });
    }
}

function ConfirmacionGuardarRegistro(sucessConfirmacion) {
    MostrarMensajeConfirmacion('¿Desea guardar el registro?', sucessConfirmacion, 'warning');
}

function ConfirmacionEliminarRegistro(sucessConfirmacion) {
    MostrarMensajeConfirmacion('¿Desea eliminar el registro?', sucessConfirmacion, 'error');
}

function NotificacionRegistroGuardado(sucessConfirmacion) {
    NotificacionAccionRealizada('Registro guardado correctamente.', true, sucessConfirmacion, true);
    
}

function NotificacionRegistroEliminado(sucessConfirmacion) {
    NotificacionAccionRealizada('Registro eliminado correctamente.', true, sucessConfirmacion, true);
}

function NotificacionAccionRealizada(mensaje, cerrarModal, sucessConfirmacion, cerrarAutomatico) {
    swal({
        text: mensaje,
        type: 'success',
        showConfirmButton: cerrarAutomatico ? false : true,
        confirmButtonText: cerrarAutomatico ? "" : "Aceptar"
    });
    if (cerrarAutomatico != null && cerrarAutomatico == true) {
        setTimeout(function (notificacion) {
            swal.closeModal();

            if (cerrarModal)
                OcultarModal();

            if (sucessConfirmacion != null)
                sucessConfirmacion();
        }, 1000);
    }
    else {
        if (cerrarModal)
            OcultarModal();

        if (sucessConfirmacion != null)
            sucessConfirmacion();
    }

}

function MostrarMensajeNotificacion(mensaje) {
    swal({
        text: mensaje,
        type: 'info',
        showCancelButton: false
    });
}

function MostrarMensajeConfirmacion(mensaje, sucessConfirmacion, tipo) {
    swal({
        html: mensaje,
        type: tipo,
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO"
    }).then(function () {
        sucessConfirmacion();
    }).catch(swal.noop);
}

function MostrarMensajeExito(mensaje, cerrarAutomatico) {
    if (cerrarAutomatico != null && cerrarAutomatico == true) {
        swal({
            html: mensaje,
            type: "success",
            timer: 8000,
            confirmButtonText: "Aceptar"
        });
    }
    else {
        swal({
            html: mensaje,
            type: "success",
            confirmButtonText: "Aceptar"
        });
    }
}

function MostrarMensajeError(mensaje, cerrarAutomatico) {
    if (cerrarAutomatico != null && cerrarAutomatico == true) {
        swal({
            html: mensaje,
            type: "error",
            timer: 5000,
            confirmButtonText: "Aceptar"
        });
    }
    else {
        swal({
            html: mensaje,
            type: "error",
            confirmButtonText: "Aceptar"
        });
    }
}

function MostrarMensajeMultipleError(mensaje) {
    swal({
        html: mensaje,
        type: "error",
        timer: 5000,
        confirmButtonText: "Aceptar"
    });
}

function AjaxCallView(urlAjax, dataAjax, successAjax, errorAjax) {
    $.ajax({
        type: 'POST',
        dataType: 'html',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        url: urlAjax,
        async: false,
        cache: false,
        data: dataAjax,
        beforeSend: function (data) {
            $('#divWait').css('display', 'inline');
            $('.btn').attr('disabled', true);
        },
        success: function (data) {
            $('#divWait').css('display', 'none');
            $('.btn').attr('disabled', false);
            successAjax(data);
        },
        error: function (data) {
            $('#divWait').css('display', 'none');
            $('.btn').attr('disabled', false);
            if (errorAjax != null)
                errorAjax(data);
            else
                ErrorAjaxInternal(data);
        }
    });
}

function ValidarRangoFechas(fechaInicial, fechaFinal) {
    if (fechaInicial != null && fechaFinal != null && fechaInicial != "" && fechaFinal != "") {
        var partesInicial = fechaInicial.split('/');
        var partesFinal = fechaFinal.split('/');
        //Mes+Dia+Año
        var inicial = new Date(partesInicial[1].toString() + '/' + partesInicial[0].toString() + '/' + partesInicial[2].toString());
        var final = new Date(partesFinal[1].toString() + '/' + partesFinal[0].toString() + '/' + partesFinal[2].toString());
        if (inicial > final) {
            MostrarMensajeError('La fecha inicial no puede ser mayor a la fecha final.');
            return false;
        }
        else {
            return true;
        }
    }
}

function ValidarFechaMenorActual(fechafinal) {
    var partesInicial = fechafinal.split("/");
    var hoy = new Date();
    //Año+Mes+Dia
    var final = new Date(partesInicial[1].toString() + '/' + partesInicial[0].toString() + '/' + partesInicial[2].toString());
    var actual = hoy.getFullYear().toString() + hoy.getMonth().toString() + hoy.getDay().toString();
    var finalFecha = final.getFullYear().toString() + final.getMonth().toString() + final.getDay().toString();

    if (actual > finalFecha) {
        MostrarMensajeError('La fecha final no puede ser menor a la fecha inicial.');
        return false;
    }
    else
        return true;
}

function FormatoMoneda(numero) {
    return "$ " + numero.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function FormatoCampoFecha(start, end) {
    $('#txtRangoFecha span').html('Desde&nbsp;&nbsp;&nbsp;&nbsp;' + start.format(formatoFecha) + '&nbsp;&nbsp;&nbsp;&nbsp;hasta&nbsp;&nbsp;&nbsp;&nbsp;' + end.format(formatoFecha));
    fechaRangoSeleccionInicial = start.format(formatoFecha);
    fechaRangoSeleccionFinal = end.format(formatoFecha);
}


