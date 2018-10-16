var arreglo = []

$("#formulario").submit(function () {
    var resultado = $(this).serializeObject()
    arreglo.push(resultado)
    $("#elementos").html("")
    arreglo.forEach(elementos => {
        $("#elementos").append('<div class="col-md-2">' +
            '<img src="' + elementos.url + '"' +
            'class="img-fluid" alt="imagen" srcset="">' +
            '<h5>' + elementos.titulo + '</h5>' +
            '<p>' + elementos.pais + '</p>' +
            '</div>')
    });
    return false;
})


$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function () {

    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function (element) {
            $(element)
                .closest('.form-group')
                .removeClass('has-error');
        }
    });

    $.validator.addMethod('daterange', function (value, element) {
        if (this.optional(element)) {
            return true;
        }

        var startDate = Date.parse('1900-1-1'),
            endDate = Date.parse('2001-1-1'),
            enteredDate = Date.parse(value);

        if (isNaN(enteredDate)) return false;

        return ((startDate <= enteredDate) && (enteredDate <= endDate));
    }, "");


    $("#run")
        .rut({ formatOn: 'keyup', validateOn: 'keyup' })
        .on('rutInvalido', function () {
            $(this).parents(".control-group").addClass("error")
        })
        .on('rutValido', function () {
            $(this).parents(".control-group").removeClass("error")
        });

    $("#formulario").validate({
        rules: {
            nombre: {
                required: true,
                lettersonly: true
            },
            run: {
                required: true,
            },
            fechNacimiento: {
                required: true,
                daterange: true
            },
            telefono: {
                required: true,
                integer: true
            },
            correo: {
                required: true,
                email: true
            },
            region: {
                required: true
            },
            comuna: {
                required: true
            },
            vivienda: {
                required: true
            }
        },
        messages: {
            nombre: {
                required: 'Este campo es obligatorio',
                lettersonly: 'Ingrese solo letras'
            },
            run: {
                required: 'Este campo es obligatorio',
            },
            fechanacimiento: {
                required: 'Este campo es obligatorio',
                daterange: 'Debes ser mayor de edad'
            },
            telefono: {
                required: 'Este campo es obligatorio',
                integer: 'Ingrese solo numeros'
            },
            correo: {
                required: 'Este campo es obligatorio',
                email: 'Ingrese una dirección de correo valida'
            },
            region: {
                required: 'Este campo es obligatorio'
            },
            comuna: {
                required: 'Este campo es obligatorio'
            },
            vivienda: {
                required: 'Este campo es obligatorio'
            }
        }
    })
})


$(function () {
    cargarRegion()
})

function cargarRegion() {
    chile.regiones.forEach(region => {
        $("#region").append('<option value="' + region.region + '">' + region.region + '</option>')
    })
}

$("#region").change(function () {
    var region = $(this).val()
    var regionCompleta = chile.regiones.find(r => r.region == region)
    $("#comuna").html("")
    $("#comuna").append('<option hidden ">Seleccione</option>')
    regionCompleta.comunas.forEach(comuna => {
        $("#comuna").append('<option value="' + comuna + '">' + comuna + '</option>')
    })

})

var chile = {
    "regiones": [{
        "region": "Arica y Parinacota",
        "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
    },
    {
        "region": "Tarapacá",
        "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
    },
    {
        "region": "Antofagasta",
        "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
    },
    {
        "region": "Atacama",
        "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
    },
    {
        "region": "Coquimbo",
        "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
    },
    {
        "region": "Valparaíso",
        "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
    },
    {
        "region": "Región del Libertador Gral. Bernardo O’Higgins",
        "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
    },
    {
        "region": "Región del Maule",
        "comunas": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
    },
    {
        "region": "Región de Ñuble",
        "comunas": ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"]
    },
    {
        "region": "Región del Biobío",
        "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"]
    },
    {
        "region": "Región de la Araucanía",
        "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]
    },
    {
        "region": "Región de Los Ríos",
        "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
    },
    {
        "region": "Región de Los Lagos",
        "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
    },
    {
        "region": "Región Aisén del Gral. Carlos Ibáñez del Campo",
        "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
    },
    {
        "region": "Región de Magallanes y de la Antártica Chilena",
        "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    },
    {
        "region": "Región Metropolitana de Santiago",
        "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
    }]
}

$(".bigotes").on("click", function () {

    $(".titulo").html("Bigotes")
    var image = new Image();
    var src = 'img/rescatados/Bigotes_tn.jpg';
    image.src = src;

    $('#perro').append(image);

    $(".description").html("Bigotes es muy amistoso y jugueton.")
});
$(".chocolate").on("click", function () {

    $(".titulo").html("Chocolate")
    var image = new Image();
    var src = 'img/rescatados/Chocolate_tn.jpg';
    image.src = src;

    $('#perro').append(image);

    $(".description").html("Chocolate es un perro muy amoroso e inteligente.")
});
$(".luna").on("click", function () {

    $(".titulo").html("Luna")
    var image = new Image();
    var src = 'img/rescatados/Luna_tn.jpg';
    image.src = src;

    $('#perro').append(image);

    $(".description").html("Luna, es muy pequeña y traviesa.")
});
$(".maya").on("click", function () {

    $(".titulo").html("Maya")
    var image = new Image();
    var src = 'img/rescatados/Maya_tn.jpg';
    image.src = src;

    $('#perro').append(image);

    $(".description").html("Maya es muy obediente y regalona.")
});
$(".oso").on("click", function () {

    $(".titulo").html("Oso")
    var image = new Image();
    var src = 'img/rescatados/Oso_tn.jpg'; 
    image.src = src;

    $('#perro').append(image);

    $(".description").html("Oso, es muy tranquilo y le gusta la nieve.")
});
$(".pexel").on("click", function () {

    $(".titulo").html("Pexel")
    var image = new Image();
    var src = 'img/rescatados/Pexel_tn.jpg';
    image.src = src;

    $('#perro').append(image);

    $(".description").html("Pexel, es un yorkshire muy alegre")
});
$(".wifi").on("click", function () {

    $(".titulo").html("Wifi")
    var image = new Image();
    var src = 'img/rescatados/Wifi_tn.jpg';
    image.src = src;

    $('#perro').append(image);

    $(".description").html("Wifi, es muy travieso y le gusta jugar con los zapatos.")
});