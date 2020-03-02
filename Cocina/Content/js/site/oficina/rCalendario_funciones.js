$().ready(function () {
    var grd = function () {
        $("input[type='radio']").click(function () {
            var previousValue = $(this).attr('previousValue');
            var name = $(this).attr('name');
            var dia = name.split('_');

            if (name === 'rGrupoMenu') {
                var id = $(this).attr('id');
                var grupo = id.split('_');

                if (previousValue == 'checked') {
                    $(this).removeAttr('checked');
                    $(this).attr('previousValue', false);
                    $(this).prop('checked', false); // extra

                    $("input[class=" + grupo[1] + "]:radio").removeAttr("checked"); // extra
                    $("input[class=" + grupo[1] + "]:radio").prop("checked", false); // extra

                    $("input[class= fruta]:checkbox").prop("disabled", true); // extra
                    $("input[class= fruta]:checkbox").removeAttr("checked"); // extra
                    $("input[class= fruta]:checkbox").prop("checked", false); // extra
                } else {
                    $("input[name=" + name + "]:radio").attr('previousValue', false);
                    $(this).attr('previousValue', 'checked');

                    $("input[class=" + grupo[1] + "]:radio").attr("checked", true); // extra
                    $("input[class=" + grupo[1] + "]:radio").prop("checked", true); // extra

                    $("input[class= fruta]:checkbox").removeAttr("disabled"); // extra
                }
            } else {
                if (previousValue == 'checked') {
                    $(this).removeAttr('checked');
                    $(this).attr('previousValue', false);
                    $(this).prop('checked', false); // extra

                    $("input[name=" + dia[0] + "_fruta]:checkbox").prop("disabled", true); // extra
                    $("input[name=" + dia[0] + "_fruta]:checkbox").removeAttr("checked"); // extra
                    $("input[name=" + dia[0] + "_fruta]:checkbox").prop("checked", false); // extra
                } else {
                    $("input[name=" + dia[0] + "_fruta]:checkbox").removeAttr("disabled"); // extra
                    $("input[name=" + name + "]:radio").attr('previousValue', false);
                    $(this).attr('previousValue', 'checked');
                }
            }
        });
    };

    grd('1');
});