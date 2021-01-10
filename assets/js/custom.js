$(document).ready(function () {
    var callbackForm = $('#contact-form');
    var url = 'https://script.google.com/macros/s/AKfycbynRjOc5UsT4FFePq16Qzhjgc912_zQpoQVhDEQC-RjjnYVTaI/exec';

    $('#submit-callback-form').on('click', function (e) {
        e.preventDefault();
        var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: callbackForm.serializeObject()
        });
    })
});