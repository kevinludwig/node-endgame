$(document).ready(function() {
    SetImagePath("/img");
    SetImageType("png");
    SetHighlightOption(true);

    // head, num, chEvent, chSite, chRound, chWhite, chBlack, chResult, chDate
    SetGameSelectorOptions(null,false,0,0,0,15,15,0,10);
    SetCommentsIntoMoveText(true);
    SetCommentsOnSeparateLines(true);
    SetAutoplayDelay(1000);
    SetAutostartAutoplay(false);
    SetAutoplayNextGame(false);
    SetInitialGame(1);
    SetInitialVariation(0);
    SetInitialHalfmove(0,false);
    SetShortcutKeysEnabled(true);

    clearShortcutSquares("ABCDEFGH","12345678");

    $('#button-bar button').click(function(ev) {
        clickedBbtn(this,ev);
    });

    $('#autoplayButton').click(function() {
        var i = $(this).find(':first-child');
        if (i.hasClass('glyphicon-play')) {
            i.removeClass('glyphicon-play').addClass('glyphicon-pause');
        }
        else {
            i.removeClass('glyphicon-pause').addClass('glyphicon-play');
        }
    });

    var preview = $('.preview');
    var board = $('#GameBoard');
    $(window).resize(function() {
        preview.height(preview.width());
        if (board) board.height(board.width());
    });
    preview.height(preview.width());
    if (board) board.height(board.width());
});
