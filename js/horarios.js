var called = 0;

// Update on load to fill all the available height
$('#table').on('load-success.bs.table', function() {
    var $div = $('.div-table');
    var $table = $('#table');

    // Avoid infinite loop
    if (called != 0) {
        return;
    }
    called = 1;

    $table.bootstrapTable('refreshOptions', {
        height: $div.height()
    });
});

$(window).resize(function () {
    $('#table').bootstrapTable('resetView');
});

// Load filter from cookie
$(function() {
    var filter = JSON.parse(Cookies.get('saveId.bs.table.filterBy'));
    var filterGroups = filter.recruitmentGroup;
    $('#table-filter').selectpicker('val', filterGroups || []);
});

// Update filter
$('#table-filter').on('hidden.bs.select', function (e) {
    var filterVal = $('#table-filter').val();

    if (filterVal.length > 0) {
        $('#table').bootstrapTable('filterBy', {
            "recruitmentGroup": filterVal
        });
    } else {
        $('#table').bootstrapTable('filterBy', {});
    }
});

function detailFormatter(index, row) {
    var html = [];

    html.push('<p>' + row.schoolName + ' - ' + row.schoolCode + '</p>');
    html.push('<p><b>Horário nº:</b> ' + row.contractNumber + ' ');
    html.push('<b>Horas:</b> ' + row.nHoursPerWeek + 'h</p>');
    html.push('<p><b>Data Final de Colocação:</b> ' + row.contractEndDate);
    if (row.contractEndDate != '2021-08-31') {
        html.push(' (Temporário)</p>');
    } else {
        html.push(' (Anual)</p>');
    }
    html.push('<p><b>Data Final de Candidatura:</b> ' + row.applicationDeadline + '</p>');
    if (row.recruitmentGroup == "T. E.") {
        html.push('<p><b>Grupo de Recrutamento:</b> Técnico Especializado</p>');
    } else {
        html.push('<p><b>Grupo de Recrutamento:</b> ' + row.recruitmentGroup + '</p>');
    }
    html.push('<p><b>Concelho:</b> ' + row.county + ' ');
    html.push('<b>Distrito:</b> ' + row.district + '</p>');
    html.push('<p><b>Disciplina / Projeto:</b> ' + row.classProject + '</p>');
    if (row.qualifications.length > 0) {
        html.push('<p><b>Curso / Habilitação :</b> ' + row.qualifications + '</p>');
    }

    return html.join('');
}