import {Dropdown} from 'bootstrap'

jQuery(function($) {
    const imageLinks = $(".ImageLink");
    const imageModal = $("#imagemodal");
    const imageModalImg = $("#imagemodal img")

    if (imageLinks.length === 0 || imageModal.length === 0 || imageModalImg === 0) {
        return;
    }

    imageLinks.each(function(e) {
        $(this).on("click", function(e) {
            const src = $(this).attr("src");
            imageModalImg.attr("src", src);
            imageModal.modal("show");
        });
    });

});