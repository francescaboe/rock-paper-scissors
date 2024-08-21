# Rock Paper Scissors
A simple multiplayer rock paper scissors game. 
People can play against the computer or against a friend by sharing a link,
multiple pairs can play at the same time.
generate random usernames for players (?)

### Backend
- Tech stack: Node.js with Express, Socket.io


### Frontend
- Tech stack: React with TypeScript, Tailwind


#### Steps
- setup ci/cd
- design prototype (mobile, tablet and desktop)
- fe: setup modes (pc or friend) [don't forget tests!]
- fe: setup game logic and basic ui
- be: setup be stuff [don't forget tests!]
 
#### Requirements
- [ ] multiplayer
- [ ] light-dark-whimsical mode, other ui improvements, animations // in progress
- [x] mobile first & responsiveness // in progress
- [ ] accessibility: semantic html, aria-labels // in progress
- [ ] modes: vs computer, vs friend (share a link)
- [x] add score


- [ ] performance
- [ ] security
- [ ] usability

##### Optional/advanced
- [ ] improve ui > create 3D graphics?
- [ ] add chat popup
- [ ] add game history
- [ ] add leaderboard (wins in a row)
- [ ] add optional login to save progress
- [ ] add advanced game strategy for single mode (e.g. randomness, minimax, etc. https://chatgpt.com/share/1fc96d0d-d54c-42e4-b04d-bc4d720d4090)

```
rock-paper-scissors/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── gameRoomManager.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Lobby
│   │   │   ├── SinglePlayerMode
│   │   │   ├── MultiplayerMode
│   │   │   └── RockPaperScissors
│   │   ├── types/
│   │   │   ├── game.types.ts
│   │   │   └── ...
│   │   ├── utils/
│   │   │   ├── gameReducer.ts
│   │   │   └── ...
│   │   ├── api/
│   │   │   ├── gameApi.ts
│   │   │   └── ...
│   │   ├── ...
│   │   └── index.js
│   ├── package.json
│   └── ...
├── README.md
└── ...
```
## Daily tasks
- [ ] add tests for routes