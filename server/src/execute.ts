import childproc from "child_process"
import { v4 as uuid } from "uuid"
import fs from "fs"

export function execute(program: string): string {
    let out = "";

    const id = uuid();
    const file_path = `/app/tmp/${id}.kpr`;

    fs.writeFileSync(file_path, program);

    const command = `kprc ${file_path}`;

    childproc.exec(command, (err, _, stderr) => {
        if (err) {
            out = `--Error message--\n${err.message}`;
            return;
        }
        if (stderr) {
            out = `--Error message--\n${stderr}`;
            return;
        }

        const executable_path = `/app/tmp/${id}`;

        childproc.exec(executable_path, (err, stdout, stderr) => {
            if (err) {
                out = `--Error message--\n${err.message}`;
                return;
            }
            if (stderr) {
                out = `--Error message--\n${stderr}`;
                return;
            }

            out = stdout;
        });
    });

    return out;
}
