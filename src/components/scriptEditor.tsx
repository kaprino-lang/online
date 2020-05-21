import * as React from "react";
import { Button, Card, Form } from "react-bootstrap"

export interface IScriptEditorProps {
    onScriptExecuteButtonClicked: (text: string, type: string) => void;
}

export interface IScriptEditorState {
    text: string;
}

export class ScriptEditor extends React.Component<IScriptEditorProps, IScriptEditorState> {
    constructor(props: IScriptEditorProps) {
        super(props);
        this.state = {
            text: ""
        };
    }

    onExecuteButtonClicked = () => {
        let textElement = document.getElementById("programText") as HTMLTextAreaElement;
        if (!textElement.value) {
            window.alert("No program given");
            return;
        }
        let selectElement = document.getElementById("executeType") as HTMLSelectElement;
        this.props.onScriptExecuteButtonClicked(textElement.value, selectElement.value);
        this.setState({
            text: textElement.value
        });
    };

    onTabKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        let programTextElement = document.getElementById("programText") as HTMLTextAreaElement;
        if (e.keyCode == 9 || e.which == 9) {
            e.preventDefault();
            var startPos =  programTextElement.selectionStart;
            var endPos = programTextElement.selectionEnd;
            programTextElement.value = programTextElement.value.substring(0, startPos)
                + "\t"
                + programTextElement.value.substring(endPos);
            programTextElement.selectionEnd = startPos + 1;
        }
    }

    render() {
        let content = <div>
            <Card>
                <Card.Body>
                    <Card.Title>Program</Card.Title>
                    <Form.Control id="programText" as="textarea" onKeyDown={ this.onTabKeyDown } rows={ 20 } />
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Panel</Card.Title>
                    <div style={ { display: "inline-box" } }>
                        <Form.Control id="executeType" as="select" style={ { width: "400px", margin: "20px" } }>
                            <option value="runonly">Run program</option>
                            <option value="run">Run program (Show command)</option>
                            <option value="irtoc">Convert to C</option>
                        </Form.Control>
                        <Button id="executeButton" variant="primary" style={ { margin: "20px" } } onClick={ this.onExecuteButtonClicked }>Execute</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>;
        return content;
    }
}