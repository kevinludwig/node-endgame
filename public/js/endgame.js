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

    $('#custom-game-buttons button').click(function(ev) {
        clickedBbtn(this,ev);
    });

    $('#autoplayButton').click(function() {
        var i = $(this).find(':first-child');
        if (i.hasClass('icon-play')) {
            i.removeClass('icon-play').addClass('icon-pause');
        }
        else {
            i.removeClass('icon-pause').addClass('icon-play');
        }
    });
});
