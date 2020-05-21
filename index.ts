import express from "express"
import cors from "cors"

import { execute, executeOutOnly, convertToC } from "./src/api/executeKprc"

const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static('html'));
app.use(express.static('dist'));

const router: express.Router = express.Router();
router.get('/api/v1', (req: express.Request, res: express.Response) => {
    let type = req.query["type"];
    if (type) {
        if (type == "run") {
            let file = req.query["file"];
            if (file) {
                let output = execute(file as string);
                res.send({
                    message: "OK.",
                    output: output
                });
            }
            else {
                res.send({
                    message: "Error! Not found file."
                });
            }
        }
        else if (type == "runonly") {
            let file = req.query["file"];
            if (file) {
                let output = executeOutOnly(file as string);
                res.send({
                    message: "OK.",
                    output: output
                });
            }
            else {
                res.send({
                    message: "Error! Not found file."
                });
            }
        }
        else if (type == "irtoc") {
            let file = req.query["file"];
            if (file) {
                let output = convertToC(file as string);
                res.send({
                    message: "OK.",
                    output: output
                });
            }
            else {
                res.send({
                    message: "Error! Not found file."
                });
            }
        }
        else {
            res.send({
                message: "Error! The \"type\" param is not good."
            });
        }
    }
    else {
        res.send({
            message: "Error! The \"type\" param is required."
        });
    }
});
app.use(router);

app.listen(process.env.PORT, () => { console.log('Port openned!'); });
