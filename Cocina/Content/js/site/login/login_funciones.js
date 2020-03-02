/* =================================================================================================
-- Autor:		Francisco Javier Soto Infante
-- Creacion:    15/02/2019
-- Descripcion:	Archivo javascritp para el funcionamiento del las paginas de 'Login' y 'Reestablecer-
                -Contraseña'
-- Version:     V_0.2
-- ================================================================================================= */

$().ready(function () {
  voltear_tarjeta();
  cambiar_formulario();
  cargar_particulas_fondo();
  validar_formularios();
});

// Funcion para la animacion de volteo de la tarjeta
function voltear_tarjeta() {
  try {
    // Indicamos el objeto que queremos que se quiera voltear
    $("#card").flip({ // En este caso es un div con el id: 'card'
      trigger: "manual"
    });

    // Al presionar un boton con el id: 'flip-btn' volteara la tarjeta
    $("#flip-btn").click(function () {
      $("#card").flip(true);
    });

    // Al presionar un boton con el id: 'unflip-btn' desvolteara la tarjeta
    $("#unflip-btn").click(function () {
      $("#card").flip(false);
    });

    $("#unflip2-btn").click(function () {
      $("#card").flip(false);
    });
  } catch (error) {
    console.log(error);
  }
}

// Funcion para la animacion de transicion de los formularios entre 'login' y 'olvidar contraseña'
function cambiar_formulario() {
  try {
    // Obtenemos los objetos con los id
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    // Validamos si existen los objetos
    if (signInButton !== null || signUpButton !== null) {
      // Si existen se les agrega un evento click para agregar una clase del css 'custom.css'
      signUpButton.addEventListener("click", () => {
        container.classList.add("panel-derecho-activo");
      });
      // Si existen se les agrega un evento click para quitar la clase del css 'custom.css'
      signInButton.addEventListener("click", () => {
        container.classList.remove("panel-derecho-activo");
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// Funcion para cargar la animacion de las particulas en las paginas
function cargar_particulas_fondo() {
  try {
    // Obtenemos los objetos con los id
    var fondo_login = document.getElementById("particles-js");
    var fondo_reestablecer = document.getElementById("notfound-state");
    // Validamos si existen los objetos
    if (fondo_login !== null) {
      /* Si existen se cargan las particulas en base al id y el archivo que contiene las configuracion-
         de las particulas */
      particlesJS.load(
        "particles-js",
        "/Content/js/particles.js/pages/particles.json",
        function () {
          console.log("callback - particles.js config loaded");
        }
      );
    }

    if (fondo_reestablecer !== null) {
      particlesJS.load(
        "notfound-state",
        "/Content/js/particles.js/pages/particles-error.json",
        function () {
          console.log("callback - particles.js config loaded");
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// Funcion para validar los formularios
function validar_formularios() {
  // Inicia la validacion del formulario de login
  try {
    $("#form-inicio").validate({
      // Indicamos reglas de validacion
      rules: {
        inputEmpleado: {
          required: true,
          autofocus: true
        },
        inputContraseña: {
          required: true
        }
      },

      // Mensajes a mostrar si no cumple con las reglas
      messages: {
        inputEmpleado: {
          required: "Campo requerido."
        },
        inputContraseña: {
          required: "Campo requerido."
        }
      },

      // Colocación de errores
      errorPlacement: function errorPlacement(error, element) {
        var $parent = $(element).parents(".form-label-group");
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
      errorElement: "span",
      // Elementos que se van a recalcar el error
      highlight: function (element) {
        var $el = $(element);
        var $parent = $el.parents(".form-label-group");
        $el.addClass("is-invalid");
      },
      // Elementos para quitar el recalque de error
      unhighlight: function (element) {
        $(element)
          .parents(".form-label-group")
          .find(".is-invalid")
          .removeClass("is-invalid");
      }
    });
  } catch (error) {
    console.log(error);
  }

  // Inicia la validacion del formulario de olvidar contraseña
  try {
    $("#form-olvidar").validate({
      // Indicamos reglas de validacion
      rules: {
        inputEmail: {
          required: true,
          email: true
        }
      },

      // Mensajes a mostrar si no cumple con las reglas
      messages: {
        inputEmail: {
          required: "Campo requerido."
        }
      },

      // Colocación de errores
      errorPlacement: function errorPlacement(error, element) {
        var $parent = $(element).parents(".form-label-group");
        console.log($parent);
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
      errorElement: "span",
      // Elementos que se van a recalcar el error
      highlight: function (element) {
        var $el = $(element);
        var $parent = $el.parents(".form-label-group");
        $el.addClass("is-invalid");
      },
      // Elementos para quitar el error
      unhighlight: function (element) {
        $(element)
          .parents(".form-label-group")
          .find(".is-invalid")
          .removeClass("is-invalid");
      }
    });
  } catch (error) {
    console.log(error);
  }

  // Inicia la validacion del formulario de reestablecer contraseña
  try {
    $("#form-reestablecer").validate({
      // Indicamos reglas de validacion
      rules: {
        inputCodigo: {
          required: true,
          maxlength: 7
        },

        inputContraseña: {
          required: true,
          maxlength: 15
        },

        inputConfirmar: {
          required: true,
          maxlength: 15,
          equalTo: "#inputContraseña"
        }
      },
      
      // Mensajes a mostrar si no cumple con las reglas
      messages: {
        inputCodigo: {
          required: "Campo requerido.",
          maxlength: "Por favor ingrese no más de 7 caracteres."
        },

        inputContraseña: {
          required: "Campo requerido.",
          maxlength: "Por favor ingrese no más de 15 caracteres."
        },

        inputConfirmar: {
          required: "Campo requerido.",
          maxlength: "Por favor ingrese no más de 15 caracteres.",
          equalTo: "Las contraseñas no son iguales."
        }
      },

      // Colocación de errores
      errorPlacement: function errorPlacement(error, element) {
        var $parent = $(element).parents(".form-label-group");
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
      errorElement: "span",
      highlight: function (element) {
        var $el = $(element);
        var $parent = $el.parents(".form-label-group");
        $el.addClass("is-invalid");
      },
      unhighlight: function (element) {
        $(element)
          .parents(".form-label-group")
          .find(".is-invalid")
          .removeClass("is-invalid");
      }
    });

    $("#inputConfirmar").bind("cut copy paste", function (e) {
      e.preventDefault();
    });
  } catch (error) {
    console.log(error);
  }
}