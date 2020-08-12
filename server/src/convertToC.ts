import childproc from "child_process"
import { v4 as uuid } from "uuid"
import fs from "fs"

export function convertToC(program: string): string {
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

        const ll_file_path = `/app/tmp/${id}.ll`;
        const cbe_command = `llvm-cbe ${ll_file_path}`;

        childproc.exec(cbe_command, (err, _, stderr) => {
            if (err) {
                out = `--Error message--\n${err.message}`;
                return;
            }
            if (stderr) {
                out = `--Error message--\n${stderr}`;
                return;
            }

            const out_file_path = `/app/tmp/${id}.cbe.c`;

            let buffer = fs.readFileSync(out_file_path);
            let ctext = buffer.toString();
            ctext = ctext.replace(new RegExp("uint32_t", "g"), "int");
            out = ctext;
        });
    });

    return out;
}
