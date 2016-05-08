jQuery(document).ready(function ($) {
    var $list_puller = $('.list_puller');

    var url_ajax = '/all';
    $.ajax({
        url: url_ajax,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                add_newSync(data[i]);
            }
        },
        error: function (x) {
            alert('Something went wrong!');
        }
    });

    $('#add').on('click', function (e) {
        e.preventDefault();

        var url_ajax_create = '/create';
        var $form = $('#form-add');
        var data = $form.serializeArray();
        $.ajax({
            url: url_ajax_create,
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function (res) {
                if (!res.return) {
                    alert(res.msg);
                } else {
                    add_newSync(res.response);
                }
            },
            error: function (x) {
                alert('Something went wrong!');
            }
        });
    });

    $('body').on('click', '.delete', function () {
        var id = $(this).data('id');

        var url_ajax_delete = '/delete/' + id;
        $.ajax({
            url: url_ajax_delete,
            method: 'GET',
            success: function (res) {
                if (!res.return) {
                    alert(res.msg);
                } else {
                    $('#' + id).remove();
                }
            }
        });
    });

    function add_newSync(newSync) {

        var html = '<div class="panel panel-default" id="' + newSync._id + '">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title">' + newSync.host + ': ' + newSync.repo + '<span class="close delete" data-id="' + newSync._id + '">&times;</span></h3>' +
            '</div>' +
            '<div class="panel-body">' + newSync.dir + '</div>' +
            '</div>';

        $list_puller.append(html);
    }
});