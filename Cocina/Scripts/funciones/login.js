$('#login').on('submit', function (e) {
    e.preventDefault();

    var inputNumero = $('#inputNumero').val();
    var inputContraseña = $('#inputContraseña').val();

    $.post('/Home/InicioSesion', { inputNumero: inputNumero, inputContraseña: inputContraseña },
     function (returnedData) {
         if (data == 1) {
             var alerta = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
             + '<strong>Lo Sentimos!</strong> El usuario no existe.'
             + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
             + '<span aria-hidden="true">&times;</span>'
             + '</button>'
             + '</div>';
             $("#alerta").html(alerta);
         }
     }, 'json').fail(function () {
         console.log("error");
     });
});

//$('#recovery').on('submit', function (e) {
//    e.preventDefault();

//    var inputEmail = $('#inputEmail').val();

//    $.post('/Home/RecuperarContraseña', { inputEmail: inputEmail },
//     function (returnedData) {
//         if (data == 1) {
//             var alerta = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
//             + '<strong>Lo Sentimos!</strong> El usuario no existe.'
//             + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
//             + '<span aria-hidden="true">&times;</span>'
//             + '</button>'
//             + '</div>';
//         }
//         $("#alerta").html(alerta);
//     }, 'json').fail(function () {
//         console.log("error");
//     });
//});