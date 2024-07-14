# (ICON) Tonsura

### Tonsura brings music sharing among everyone and forever

#### Mission: Allowing everyone to share music together even when they have bad taste for streaming platforms

## 💡 Inspiration 

**Sharing music can be **annoying.**** On September 22, 2022, Jean tried to send to Alex his favorite playlist on Spotify

* After correctly getting the right link to share, Alex was unable to open it because she uses Deezer
* Alex felt sad about not being able to listen to Jean's playlist
* This kept happening over and over among various group of friends and family 

And this is just one example, arguably a very impactful one in Alex and Jean's lives. So how do we ensure this never happens again? With **Tonsura**! 🤖

Beyond this simple example, we want to ultimately transform the music streaming industry by connecting easily the platforms together and giving the ownership back to the artists.

## ❓ What it does

**Tonsura** allows you to share a music from any of the most used streaming services and share it to anyone else. Every song has it's own track identity card that we can use to redirect you to the right platform. Creating and sharing your playlists made easy and permanent. Access analytics on any track and get recommended new tracks that you will maybe love.

**Login** with WorldCoin or Safe.

**Access** xx

## 🚧 How we built it 

Technologies Used: WorldCoin login, Safe, IPFS, Web3.Storage, The Graph subgraphs, ENS

1. **Safe : Passkeys** 
    - We used Safe to store the passkeys of the users and to allow them to login to the platform
    - Directory -> ./tonsura/src/app/components/ ... LoginWithPasskey.tsx / PasskeyList.tsx / ...
2. **WorldCoin : Incognito Actions**
    - We used WorldCoin incognito actions to allow users to login to the platform
    - Directory -> IDKitWidget at ./tonsura/src/app/playlist/page.tsx
3. **The Graph : New Subgraph**
    - We created a new subgraph to index some music tracks data such as links to access the musics on all available platforms.
    - Directory -> ./tonsura/graph-v1
4. **ENS : Naming Smart Contracts**
    - We used ENS to name the playlists smart contracts that we deployed on the blockchain.
    - Directory -> ./tonsura/src/contracts/Playlist.sol && tonsuraPlaylists.sol

## Pitch

👀 [Slide Deck]()
## The Team
![team slide page](Team.png)
