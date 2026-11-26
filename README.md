# Cambio Card Game

Cambio Card Game is a single-page card game inspired by Cambio and Cabo. Play against three computer opponents and try to finish with the lowest score.

## Quick start

Play online at [honneground.github.io/Cambio-Card-Game](https://honneground.github.io/Cambio-Card-Game/), or open `index.html` in a browser and choose a 1-, 4-, or 8-round match. The game runs locally with no build step or backend.

You can also serve the project locally.

```sh
python -m http.server 8080
```

Then open [localhost:8080](http://localhost:8080).

## Browser play and installation

Open the game in a browser on your device. The table adapts to portrait and landscape layouts, and you can tap or drag cards in either orientation.

To install the game, open it over HTTPS in a browser that supports web app installation and use the browser's install option. You can also use the localhost URL above to test installation.

Launch **Cambio** as a standalone app where supported. Once the browser has cached the game during an online visit, you can start it offline and resume a match saved in that app or browser.

## How to play

- Memorize your two revealed cards at the start of each round. On your turn, draw from the deck or take the top discard. You can replace a card in your hand, and a card drawn from the deck can also be discarded directly.
- Directly discarding an 8 lets you peek at one of your own cards. A 9 lets you spy on an opponent's card, and a 10 lets you swap two cards without looking.
- During a matching window, discard a card of the same rank as the top discard. A successful match can lead to another match within the remaining time. With opponent matching enabled, a successful match on an opponent's card requires giving them one of your own cards face down.
- Call **Monkey!** at the start of your turn to give each opponent one final turn. A failed call adds 10 points. Emptying your hand can trigger the call automatically.

New matches enable zero-point red kings, a zero score for a successful Monkey caller, opponent matching, and the four-card QQKK Kamikaze rule by default. Settings let you change these options, counting equal point values once, how tied Monkey calls are scored, and whether the opening discard starts a matching window. Rule changes apply when the next match starts.

## Controls and saves

You can click or drag cards. Drag a deck card onto an occupied slot to replace that card directly, then briefly reveal the new card. Space triggers the available action shown on the board, Enter calls Monkey on your turn, and P pauses or resumes play.

The game saves preferences and match progress in the browser. After the last round, you can export the match log as TXT or download the structured match record as JSON.
