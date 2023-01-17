import { spawn } from "child_process";

export function runCargo(args: string[], root: string) {
    const command = `cargo ${args.join(" ")}`;
    console.log(`Running: ${command}`);
    return new Promise<void>((resolve, reject) => {
		spawn("cargo", args, {
			cwd: root,
			shell: true,
			stdio: "inherit",
		})
			.on("error", reject)
			.on("close", code => {
				if (code) reject(new Error(`Cargo failed with exit code ${code}`));
				else resolve();
			});
	});
}