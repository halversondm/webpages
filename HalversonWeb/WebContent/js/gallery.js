$(document).ready(function () {
    $('li img').on('click', function () {
        var src = $(this).attr('src');
        var img = '<img src="' + src + '" class="img-responsive"/>';

        var index = $(this).parent('li').index();
        var html = '';
        html += img;
        html += '<div style="height:25px;clear:both;display:block;">';
        html += '<a class="controls next" href="' + (index + 2) + '">next &raquo;</a>';
        html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
        html += '</div>';

        var myModal = $('#myModal');
        myModal.modal();
        myModal.on('shown.bs.modal', function () {
            $('#myModal .modal-body').html(html);
            $('a.controls').trigger('click');
        });
        myModal.on('hidden.bs.modal', function () {
            $('#myModal .modal-body').html('');
        });
    });
});

if (window.Event)
    document.captureEvents(Event.MOUSEUP);
function noContextMenu() {
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
}
function noRightClick(e) {
    if (window.Event) {
        if (e.which == 2 || e.which == 3) {
            return false;
        }
    } else if (event.button == 2 || event.button == 3) {
        event.cancelBubble = true
        event.returnValue = false;
        return false;
    }
}
document.oncontextmenu = noContextMenu;
document.onmousedown = noRightClick;

/* inside the modal behavior */
$(document).on('click', 'a.controls', function () {
    var index = $(this).attr('href');
    var src = $('ul.row li:nth-child(' + index + ') img').attr('src');
    $('.modal-body img').attr('src', src);

    var newPrevIndex = parseInt(index) - 1;
    var newNextIndex = parseInt(newPrevIndex) + 2;

    if ($(this).hasClass('previous')) {
        $(this).attr('href', newPrevIndex);
        $('a.next').attr('href', newNextIndex);
    } else {
        $(this).attr('href', newNextIndex);
        $('a.previous').attr('href', newPrevIndex);
    }

    var total = $('ul.row li').length + 1;
    //hide next button
    if (total === newNextIndex) {
        $('a.next').hide();
    } else {
        $('a.next').show()
    }
    //hide previous button
    if (newPrevIndex === 0) {
        $('a.previous').hide();
    } else {
        $('a.previous').show()
    }
    return false;
});

var generateGallery = {
    process: function (firstPhotoNumber, lastPhotoNumber, thisPage, totalPages) {
        var html = '<ul class="row"><li class="col-lg-12"></li>';
        for (i = firstPhotoNumber; i <= lastPhotoNumber; i++) {
            html += '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4"><img class="img-responsive" src="./photos/photo' + [i] + '.jpg" /></li>';
        }
        html += '</ul><hr>';
        for (i = 1; i <= totalPages; i++) {
            if ([i] == thisPage) {
                html += '<span class="label label-success">Page ' + [i] + '</span>&nbsp;';
            } else {
                html += '<a class="btn btn-primary btn-xs" href="gallery' + [i] + '.html" role="button">Page ' + [i] + '</a>&nbsp;';
            }
        }
        $('#photoGallery').append(html);
    }
};