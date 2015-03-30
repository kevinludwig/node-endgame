# Overview

Play through chess endgames

# Installation and setup

* Install node `brew install node`
* Run tests `npm test`
* Start `npm start`

# TODO

- recompile bootstrap to have no breakpoint for toggle menu (or patch in css)
- home page some description of what it is
- home page title/desc on positions
- content
    - bishop vs knight +
    - rook vs pawns +
    - rook vs rook several pawns +
    - queen endings + (KQPkq)
    - rook+bishop vs. rook + (lolli, pseudo-philidor, cochrane)

# PGN4WEB Modifications

* put `fonts/*.css` in the application /css directory, which means paths need to be fixed up in that css
* do not clean the `+` from the movetext (see the `CleanMove` function)
* allow HTML (e.g. anchor tags) in the movetext (no-op `simpleHtmlentities` function)

# Future plans

- only arrow forward/back/up/down shortcut keys
- attribution
- related positions/games
