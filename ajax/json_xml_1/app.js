$(document).ready(function () {

    var servicios_por_tipo = {};

    $.get('servicios_basicos.xml', function(servicios) {
        $(servicios).find('servicio').each(function(i) {
            var servicio = $(this);
            var tipo = servicio.attr('tipo');
            servicios_por_tipo[tipo] = {
                'nombre': servicio.find('nombre').text(),
                'direccion': servicio.find('direccion').text(),
                'telefono': servicio.find('telefono').text()
            }
        });
    });

    $.getJSON('gastos_personales.json', function(usuarios) {
        usuarios.forEach(function(u) {
            var link = $('<a/>', {href: '#', text: u.nombre}).click(function () {
                // clousure beats global var :)
                $('#deuda').empty();
                var total_deuda = 0.0;
                u.servicios.forEach(function (deuda) {
                    var servicio = servicios_por_tipo[deuda.servicio];

                    $('<tr>' +
                        '<td>' + servicio.nombre + '</td>' +
                        '<td>' + servicio.direccion + '</td>' +
                        '<td>' + servicio.telefono + '</td>' +
                        '<td>' + deuda.deuda + '</td>' +
                      '</tr>').appendTo('#deuda');

                    total_deuda += parseFloat(deuda.deuda);
                });

                $('<tr id="total">' +
                    '<td>TOTAL</td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td>' + total_deuda.toFixed(2) + '</td>' +
                  '</tr>').appendTo('#deuda');
            })

            var li = $('<li/>');
            link.appendTo(li);
            li.appendTo('#usuarios');
        });
    });
});
