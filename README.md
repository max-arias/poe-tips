# PoE Tips

A community-driven repository of short-form Path of Exile tips, built with performance and usability in mind.

## Tech Stack

- **Frontend**: [Astro](https://astro.build/)
- **Interactivity**: [SolidJS](https://www.solidjs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Search**: [Fuse.js](https://fusejs.io/)
- **Backend**: [PocketBase](https://pocketbase.io/)
- **Runtime/Package Manager**: [Bun](https://bun.sh/)

## Prerequisites

2.  **PocketBase**:
    - Download the latest release (v0.25+) from [pocketbase.io](https://pocketbase.io/docs/).
    - Place the `pocketbase` executable in a `pocketbase` directory in the project root (or anywhere you prefer, but update paths accordingly).
    - **Note**: The project assumes PocketBase is running at `http://127.0.0.1:8090`.

## Local Development

1.  **Install Dependencies**:
    ```bash
    bun install
    ```

2.  **Environment Setup**:
    Copy `.env.example` to `.env` and set your PocketBase admin credentials:
    ```bash
    cp .env.example .env
    ```
    Edit `.env` with your desired credentials

3.  **Start PocketBase**:
    Run the setup script to download and extract PocketBase:
    ```bash
    bun run scripts/setup-pb.ts
    ```
    Then start the server:
    ```bash
    ./pocketbase/pocketbase serve
    ```
    Access the Admin UI at `http://127.0.0.1:8090/_/`.

4.  **Initialize Schema**:
    Run the migrations to create collections and rules.
    ```bash
    ./pocketbase/pocketbase migrate up
    ```

5.  **Seed Data**:
    Populate the database with sample tips.
    ```bash
    bun run scripts/seed-pb.ts
    ```

6.  **Start Astro**:
    ```bash
    bun run dev
    ```

## Utility Scripts

*   `scripts/seed-pb.ts`: Seeds the database with data from `src/data/tips.json`.
*   `scripts/reset-pb.ts`: **WARNING** Deletes all collections and data. Use with caution.
*   `scripts/inspect-tips.ts`: Debugging script to inspect `tips` collection and test fetching.
