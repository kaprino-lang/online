import * as React from "react";
import { Button, Card, Form } from "react-bootstrap"

export interface IOutputDisplayProps {
    isWaiting: boolean;
    text: string;
}

export interface IOutputDisplayState {
    counter: number;
}

export class OutputDisplay extends React.Component<IOutputDisplayProps, IOutputDisplayState> {
    counterTime = 500;
    counterLimit = 5;

    constructor(props: IOutputDisplayProps) {
        super(props);
        this.state = {
            counter: 0
        };

        setInterval(this.addCounter, this.counterTime);
    }

    addCounter() {
        this.state = {
            counter: (this.state.counter + 1) % this.counterLimit
        };
    }

    render() {
        if (this.props.isWaiting) {
            let text = "...";
            for (let c = 0; c < this.state.counter; c++) {
                text += ".";
            }

            let content = <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Output</Card.Title>
                        <p style={ { margin: "20px" } }>Executing{ text }</p>
                        <p style={ { margin: "20px" } }>It might take much time on the first execution.</p>
                    </Card.Body>
                </Card>
            </div>;
            return content;
        }
        else {
            let content = <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Output</Card.Title>
                        <Form.Control id="programText" as="textarea" rows={ 20 } value={ this.props.text } />
                    </Card.Body>
                </Card>
            </div>;
            return content;
        }
    }
}