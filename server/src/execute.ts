import childproc from "child_process"
import { v4 as uuid } from "uuid"
import fs from "fs"

export function execute(program: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const id = uuid();
        const file_path = `/app/tmp/${id}.kpr`;

        fs.writeFileSync(file_path, program);

        const command = `kprc ${file_path}`;

        childproc.exec(command, (err, _, stderr) => {
            if (err) {
                resolve(`--Error message--\n${err.message}`);
            }
            if (stderr) {
                resolve(`--Error message--\n${stderr}`);
            }

            const executable_path = `/app/tmp/${id}`;

            childproc.exec(executable_path, (err, stdout, stderr) => {
                if (err) {
                    resolve(`--Error message--\n${err.message}`);
                }
                if (stderr) {
                    resolve(`--Error message--\n${stderr}`);
                }

                resolve(stdout);
            });
        });
    });
}
