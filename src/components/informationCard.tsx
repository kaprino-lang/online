import * as React from "react";
import { Button, Card, Form } from "react-bootstrap"

export interface IInformationCardProps {
    compilerVersion: string;
}

export interface IInformationCardState {

}

export class InformationCard extends React.Component<IInformationCardProps, IInformationCardState> {
    constructor(props: IInformationCardProps) {
        super(props);
        this.state = { };
    }

    render() {
        let content = <div>
            <Card>
                <Card.Body>
                    <Card.Title>Info</Card.Title>
                    <p style={ { margin: "20px" } }>kprc version: { this.props.compilerVersion }</p>
                    <p style={ { margin: "20px" } }>
                        GitHub links&nbsp;:&nbsp;
                        <a href="https://github.com/kaprino-lang/kaprino">Kaprino</a>
                        &nbsp;|&nbsp;
                        <a href="https://github.com/kaprino-lang/kaprino-online-compiler">Kaprino Online Compiler</a>
                    </p>
                    <p style={ { margin: "20px" } }>This site uses <a href="https://github.com/JuliaComputing/llvm-cbe">llvm-cbe</a>.</p>
                </Card.Body>
            </Card>
        </div>;
        return content;
    }
}