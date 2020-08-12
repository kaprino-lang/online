import * as React from "react";
import { Button, Card, Form } from "react-bootstrap"

export interface IOutputDisplayProps {
    text: string;
}

export interface IOutputDisplayState {

}

export class OutputDisplay extends React.Component<IOutputDisplayProps, IOutputDisplayState> {
    constructor(props: IOutputDisplayProps) {
        super(props);
        this.state = { };
    }

    render() {
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