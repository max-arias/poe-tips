import { mkdir, unlink } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";

const PB_VERSION = "0.25.8";
const PB_DIR = "pocketbase";

async function main() {
    console.log(`🚀 Setting up PocketBase v${PB_VERSION}...`);

    // 1. Detect OS/Arch
    const os = process.platform; // 'win32', 'linux', 'darwin'
    const arch = process.arch;   // 'x64', 'arm64'

    let pbOs = "";
    let pbArch = "";

    if (os === "win32") pbOs = "windows";
    else if (os === "darwin") pbOs = "darwin";
    else if (os === "linux") pbOs = "linux";
    else {
        console.error(`❌ Unsupported OS: ${os}`);
        process.exit(1);
    }

    if (arch === "x64") pbArch = "amd64";
    else if (arch === "arm64") pbArch = "arm64";
    else {
        console.error(`❌ Unsupported Architecture: ${arch}`);
        process.exit(1);
    }

    const zipName = `pocketbase_${PB_VERSION}_${pbOs}_${pbArch}.zip`;
    const downloadUrl = `https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${zipName}`;

    console.log(`📦 Detected: ${pbOs}/${pbArch}`);
    console.log(`⬇️  Downloading from: ${downloadUrl}`);

    // 2. Download
    try {
        const response = await fetch(downloadUrl);
        if (!response.ok) {
            throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
        }

        const zipBuffer = await response.arrayBuffer();
        const zipPath = join(process.cwd(), zipName);
        await Bun.write(zipPath, zipBuffer);
        console.log("✅ Download complete.");

        // 3. Extract
        console.log("📂 Extracting...");
        await mkdir(PB_DIR, { recursive: true });

        if (os === "win32") {
            // Use PowerShell to unzip
            await $`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${PB_DIR}' -Force"`;
        } else {
            // Use unzip command
            await $`unzip -o ${zipPath} -d ${PB_DIR}`;
            // Make executable
            await $`chmod +x ${join(PB_DIR, "pocketbase")}`;
        }
        console.log("✅ Extraction complete.");

        // 4. Cleanup
        await unlink(zipPath);
        console.log("🧹 Cleanup complete.");

        console.log(`\n🎉 PocketBase setup finished! Run it with:\n./pocketbase/pocketbase serve`);

    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

main();
