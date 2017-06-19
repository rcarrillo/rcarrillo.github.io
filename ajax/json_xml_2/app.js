$(document).ready(function () {
    var deuda_por_usuario = null;
    $.getJSON('gastos_personales.json', function(usuarios) {
        deuda_por_usuario = usuarios;
    });
    
    $.get('servicios_basicos.xml', function(servicios) {
        $(servicios).find('servicio').each(function(i) {
            var servicio = $(this);
            var tipo = servicio.attr('tipo');
            var nombre = servicio.find('nombre').text();

            var titulo = tipo + ' (' + nombre + ')';
            var link = $('<a/>', {href: '#', text: titulo}).click(function () {
                $('#deuda').empty();
                var total_deuda = 0.0;
                deuda_por_usuario.forEach(function (u) {
                    u.servicios.forEach(function (servicioUsuario) {
                        if (tipo === servicioUsuario.servicio) {
                            $('<tr>' +
                                '<td>' + u.nombre + '</td>' +
                                '<td>' + servicioUsuario.deuda + '</td>' +
                              '</tr>').appendTo('#deuda');
                            total_deuda += parseFloat(servicioUsuario.deuda);
                        }

                    });
                });

                $('<tr id="total">' +
                    '<td>TOTAL</td>' +
                    '<td>' + total_deuda.toFixed(2) + '</td>' +
                  '</tr>').appendTo('#deuda');
            });

            var li = $('<li/>');
            link.appendTo(li);
            li.appendTo('#servicios');
        });


    });
});
