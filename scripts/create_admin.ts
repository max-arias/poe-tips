import { spawn } from "child_process";
import path from "path";

const email = process.env.POCKETBASE_ADMIN_EMAIL;
const password = process.env.POCKETBASE_ADMIN_PASSWORD;

if (!email || !password) {
    console.error("Error: POCKETBASE_ADMIN_EMAIL or POCKETBASE_ADMIN_PASSWORD not set in .env");
    process.exit(1);
}

console.log(`Creating superuser: ${email}`);

const pbPath = path.join("pocketbase", "pocketbase.exe");
const proc = spawn(pbPath, ["superuser", "upsert", email, password], {
    stdio: "inherit",
    shell: true
});

proc.on('close', (code) => {
    if (code === 0) {
        console.log("Superuser created successfully.");
    } else {
        console.error(`Superuser creation failed with code ${code}`);
        process.exit(code);
    }
});
