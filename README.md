# Jukeboxd

Your personal music journal inspired by Letterboxd.

![Jukeboxd preview](https://i.imgur.com/uGIML9F.jpeg)

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

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

Add the following variables:

```env
MONGODB_URI=
NEXT_PUBLIC_URL=http://localhost:3000
WEBHOOK_SECRET=
```

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