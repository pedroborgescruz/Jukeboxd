# Jukeboxd

Your personal music journal, inspired by Letterboxd.

<img width="1512" height="728" alt="image" src="https://github.com/user-attachments/assets/74d90e3e-833f-4d50-9002-aa4f560eed08" />

<img width="1510" height="726" alt="image" src="https://github.com/user-attachments/assets/33533d4b-5363-4412-8f03-2678536e0483" />

<img width="1512" height="731" alt="image" src="https://github.com/user-attachments/assets/225f7f44-30cf-4b54-a830-0a0e1ee36684" />

<img width="1512" height="734" alt="image" src="https://github.com/user-attachments/assets/78131efa-9274-4a9b-ac93-60954c21f95c" />

<img width="1512" height="726" alt="image" src="https://github.com/user-attachments/assets/b2ea1224-78fd-4352-a7ba-829aa42227d2" />

<img width="1512" height="733" alt="image" src="https://github.com/user-attachments/assets/e5fff873-a5ff-4f87-a4a0-d26ccb9f392a" />

<img width="1511" height="728" alt="image" src="https://github.com/user-attachments/assets/aeb82db0-3a8a-4bf2-896e-510785e929ca" />


Jukeboxd is a social-first app for people who want to track what they listen to, write better music reviews, and discover albums through other listeners instead of recommendation algorithms.

## What You Can Do

- Log and rate albums
- Write and read reviews
- Explore artist and album profile pages
- Follow other users and engage with their activity
- Track personal listening stats over time

## Tech Stack

- `Next.js 15` + `React 19`
- `MongoDB` with `Mongoose`
- `Clerk` for authentication
- `Tailwind CSS` for styling
- `Prisma` available in the project dependencies

## Getting Started

### 1) Clone and install

```bash
git clone https://github.com/pedroborgescruz/jukeboxd.git
cd jukeboxd
npm install
```

### 2) Create your environment file

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following variables (see `.env.example` for the full list):

```env
NEXT_PUBLIC_URL=http://localhost:3000
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_MARKET=US
```

When Spotify credentials are set, artist and album pages use the Spotify Web API first and fall back to MusicBrainz. Without Spotify, MusicBrainz is used as before.

If you are using Clerk locally, also add the Clerk keys used by your app setup.

### 3) Run the app

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start the local development server
- `npm run build` - Build for production
- `npm run start` - Run the production build
- `npm run lint` - Run ESLint checks

## Project Structure (high level)

```text
src/
  app/           # Next.js app routes and API handlers
  components/    # Reusable UI components
  lib/           # Database and shared server/client utilities
```

## Current Status

The project is under active development. Core flows (auth, profiles, albums, reviews) are in place and being iterated on.

## Roadmap

- Improve discovery and search quality
- Expand social features around reviews
- Add richer listening/statistics visualizations
- Improve mobile UX and performance

Feature ideas and known issues: [GitHub Issues](https://github.com/pedroborgescruz/jukeboxd/issues)

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Make your changes
4. Run `npm run lint`
5. Open a pull request

## License

Distributed under the GNU License. See `LICENSE.md` for details.

## Contact

Pedro Borges  
Twitter/X: [@pedroborgespc](https://twitter.com/pedroborgespc)  
Email: pedroborgespc@gmail.com
