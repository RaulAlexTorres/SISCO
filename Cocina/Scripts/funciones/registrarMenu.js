$(document).ready(function () {
    $('#frm-menu').on('submit', function (e) {
        e.preventDefault();
        var json = {};
        $.each($("#tbl1 :input").serializeArray(), function (i, field) {
            json[field.name] = field.value || '';
        });
        var data = { paramJson: JSON.stringify(json) };
        $.ajax({
            url: "/MenuUsuario/RegistrarMenuSemana",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/json",
            dataType: "html",
            success: function (data) {
                if (data == 1) {
                    $("input.chck-barra").attr("disabled", true);
                    $("input.chck-barra").removeAttr("checked");

                    $("input.chck-oficina").attr("disabled", true);
                    $("input.chck-oficina").removeAttr("checked");

                    $("input.chck-especial").attr("disabled", true);
                    $("input.chck-especial").removeAttr("checked");

                    $("#btnSubmit").attr("disabled", true);
                    $("#platillos").remove();
                    $("#check").remove();
                } else {
                    alert("SELECCIONE PLATILLO");
                }
                
            },
            error: function (menus) {
                alert("HOLA");
            }
        });
    });

    $("#inputGroupSelect01").change(function () {
        var rangoSemana = $('#inputGroupSelect01 option:selected').val();
        $.ajax({
            type: "GET",
            url: "/MenuUsuario/BuscarMenuSemana",
            contentType: "application/json; charset=utf-8",
            data: { 'rangoSemana': rangoSemana },
            dataType: "json",
            cache: false,
            success: function (menus) {
                if (menus != 1 && menus != 2 && menus != 3 && menus != 4) {
                    $("input.chck-barra").removeAttr("disabled");
                    $("input.chck-oficina").removeAttr("disabled");
                    $("input.chck-especial").removeAttr("disabled");
                    $('#btnSubmit').removeAttr("disabled");
                    var count = 0;
                    var tabla = '<tr style="text-align: center;" id="platillos">';
                    for (var i = 0; i < menus.length; i++) {
                        count++;
                        tabla = tabla + '<td>' + menus[i].plato + '</td>';
                        if (count == 3) {
                            tabla = tabla + '<td>' + menus[i].fruta + '</td>';
                            count = 0;
                        }
                    }
                    tabla = tabla + '</tr>';

                    var no_platillo = 0;
                    var seccion_dia = 1;
                    var clases = ["barra", "oficina", "especial"];
                    var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

                    tabla = tabla + '<tr style="text-align: center;" id="check">';
                    for (var i = 0; i < menus.length; i++) {
                        tabla = tabla + '<td><input type="checkbox" id="prueba_' + i + '" class="' + clases[no_platillo] + '" name="r' + seccion_dia + '_plato" value="' + menus[i].idPlato + '" onclick="seleccion' + dias[seccion_dia - 1] + '(this)"></td>';
                        no_platillo++;
                        if (no_platillo == 3) {
                            tabla = tabla + '<td><input type="checkbox" id="fruta_' + i + '" class="fruta" name="r' + seccion_dia + '_fruta" disabled></td>';
                            no_platillo = 0;
                            seccion_dia++;
                        }
                    }
                    tabla = tabla + '</tr>';
                    $("#menu").html(tabla);
                } else {
                    switch (menus) {
                        case 1:
                            alert("Ya registro el menu de esta semana");
                            break;

                        case 2:
                            alert("Esta semana ya expiro");
                            break;

                        case 3:
                            //alert("");
                            break;

                        case 4:
                            alert("No llegaron datos");
                            break;

                    }

                    $("input.chck-barra").attr("disabled", true);
                    $("input.chck-barra").removeAttr("checked");
                    $("input.chck-barra").prop("checked", false);

                    $("input.chck-oficina").attr("disabled", true);
                    $("input.chck-oficina").removeAttr("checked");
                    $("input.chck-oficina").prop("checked", false);

                    $("input.chck-especial").attr("disabled", true);
                    $("input.chck-especial").removeAttr("checked");
                    $("input.chck-especial").prop("checked", false);

                    $("#btnSubmit").attr("disabled", true);
                    $("#platillos").remove();
                    $("#check").remove();
                }
            },
            error: function (menus) {
                alert("ERROR");
                $("#platillos").remove();
                $("#check").remove();
            }
        });
    });

    $("input:checkbox").on('click', function () {
        var $box = $(this);
        if ($box.is(":checked")) {
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
            $("input.fruta").removeAttr("disabled");

            var id_input = $box.attr("id");
            switch (id_input) {
                case "chck-barra":
                    $("input.barra").attr("checked", true);
                    $("input.barra").prop("checked", true);

                    $("input.oficina").removeAttr("checked");
                    $("input.oficina").prop("checked", false);
                    $("input.especial").removeAttr("checked");
                    $("input.especial").prop("checked", false);
                    break;

                case "chck-oficina":
                    $("input.oficina").attr("checked", true);
                    $("input.oficina").prop("checked", true);

                    $("input.barra").removeAttr("checked");
                    $("input.barra").prop("checked", false);
                    $("input.especial").removeAttr("checked");
                    $("input.especial").prop("checked", false);
                    break;

                case "chck-especial":
                    $("input.especial").attr("checked", true);
                    $("input.especial").prop("checked", true);

                    $("input.barra").removeAttr("checked");
                    $("input.barra").prop("checked", false);
                    $("input.oficina").removeAttr("checked");
                    $("input.oficina").prop("checked", false);
                    break;
            }
        } else {
            $("input.fruta").prop("disabled", true);
            $("input.fruta").removeAttr("checked");
            $("input.fruta").prop("checked", false);
            $box.prop("checked", false);

            var id_inputDis = $box.attr("id");
            switch (id_inputDis) {
                case "chck-barra":
                    $("input.barra").removeAttr("checked");
                    $("input.barra").prop("checked", false);
                    break;

                case "chck-oficina":
                    $("input.oficina").removeAttr("checked");
                    $("input.oficina").prop("checked", false);
                    break;

                case "chck-especial":
                    $("input.especial").removeAttr("checked");
                    $("input.especial").prop("checked", false);
                    break;
            }
        }
    });
});

function seleccionLunes(id) {
    var myCheckbox;
    var myCheckbox2;
    if (id.checked) {
        myCheckbox = document.getElementsByName("r1_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", true);
        $("#" + id.id).prop("checked", true);

        myCheckbox2 = document.getElementsByName("r1_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).removeAttr("disabled");
        });
    } else {
        myCheckbox = document.getElementsByName("r1_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", false);
        $("#" + id.id).prop("checked", false);

        myCheckbox2 = document.getElementsByName("r1_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).prop("disabled", true);
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
    }
}

function seleccionMartes(id) {
    var myCheckbox;
    var myCheckbox2;
    if (id.checked) {
        myCheckbox = document.getElementsByName("r2_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", true);
        $("#" + id.id).prop("checked", true);

        myCheckbox2 = document.getElementsByName("r2_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).removeAttr("disabled");
        });
    } else {
        myCheckbox = document.getElementsByName("r2_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", false);
        $("#" + id.id).prop("checked", false);

        myCheckbox2 = document.getElementsByName("r2_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).prop("disabled", true);
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
    }
}

function seleccionMiercoles(id) {
    var myCheckbox;
    var myCheckbox2;
    if (id.checked) {
        var myCheckbox = document.getElementsByName("r3_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", true);
        $("#" + id.id).prop("checked", true);

        myCheckbox2 = document.getElementsByName("r3_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).removeAttr("disabled");
        });
    } else {
        var myCheckbox = document.getElementsByName("r3_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", false);
        $("#" + id.id).prop("checked", false);

        myCheckbox2 = document.getElementsByName("r3_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).prop("disabled", true);
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
    }
}

function seleccionJueves(id) {
    var myCheckbox;
    var myCheckbox2;
    if (id.checked) {
        var myCheckbox = document.getElementsByName("r4_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", true);
        $("#" + id.id).prop("checked", true);

        myCheckbox2 = document.getElementsByName("r4_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).removeAttr("disabled");
        });
    } else {
        var myCheckbox = document.getElementsByName("r4_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", false);
        $("#" + id.id).prop("checked", false);

        myCheckbox2 = document.getElementsByName("r4_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).prop("disabled", true);
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
    }
}

function seleccionViernes(id) {
    var myCheckbox;
    var myCheckbox2;
    if (id.checked) {
        var myCheckbox = document.getElementsByName("r5_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", true);
        $("#" + id.id).prop("checked", true);

        myCheckbox2 = document.getElementsByName("r5_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).removeAttr("disabled");
        });
    } else {
        var myCheckbox = document.getElementsByName("r5_plato");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
        $("#" + id.id).attr("checked", false);
        $("#" + id.id).prop("checked", false);

        myCheckbox2 = document.getElementsByName("r5_fruta");
        Array.prototype.forEach.call(myCheckbox2, function (el) {
            $("#" + el.id).prop("disabled", true);
            $("#" + el.id).removeAttr("checked");
            $("#" + el.id).prop("checked", false);
        });
    }
}