import childproc from "child_process"
import { v4 as uuid } from "uuid"
import fs from "fs"

export function convertToC(program: string): string {
    const id = uuid();
    const file_path = "/app/tmp/" + id + ".kpr";
    fs.writeFileSync(file_path, program);

    const kprc_command = "kprc " + file_path;
    try {
        childproc.execSync(kprc_command);
    }
    catch(error) {
        return error;
    }

    const ll_file_path = "/app/tmp/" + id + ".ll";
    const cbe_command = "llvm-cbe " + ll_file_path;
    try {
        childproc.execSync(cbe_command);
    }
    catch(error) {
        return error;
    }

    const out_file_path = "/app/tmp/" + id + ".cbe.c";
    let buffer = fs.readFileSync(out_file_path);
    let ctext = buffer.toString();
    ctext = ctext.replace(new RegExp("uint32_t", "g"), "int");
    return ctext;
}

export function executeOutOnly(program: string): string {
    const id = uuid();
    const file_path = "/app/tmp/" + id + ".kpr";
    fs.writeFileSync(file_path, program);

    const command = "kprc " + file_path + " -r";
    try {
        childproc.execSync(command);
        const executable_path = "/app/tmp/" + id;
        let buffer = childproc.execSync(executable_path);
        return buffer.toString();
    }
    catch(error) {
        return error;
    }
}

export function execute(program: string): string {
    const id = uuid();
    const file_path = "/app/tmp/" + id + ".kpr";
    fs.writeFileSync(file_path, program);

    const command = "kprc " + file_path + " -r";
    try {
        let buffer = childproc.execSync(command);
        return buffer.toString();
    }
    catch(error) {
        return error;
    }
}
