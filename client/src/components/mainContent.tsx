import * as React from "react";
import { Container, Col, Row } from "react-bootstrap"

import { InformationCard } from "./informationCard"
import { OutputDisplay } from "./outputDisplay"
import { ScriptEditor } from "./scriptEditor"

export interface IMainContentProps {
    compilerVersion: string;
}

export interface IMainContentState {
    isWaiting: boolean;
    output: string;
}

export class MainContent extends React.Component<IMainContentProps, IMainContentState> {
    constructor(props: IMainContentProps) {
        super(props);
        this.state = {
            isWaiting: false,
            output: ""
        };
    }

    onExecuteButtonClicked = (text: string, type: string)  => {
        this.setState({
            isWaiting: true,
            output: ""
        });

        let textEncoded = encodeURIComponent(text);
        fetch(`https://kaprino.herokuapp.com/api/v1?type=${type}&file=${textEncoded}`).then(res => {
            res.json().then((obj) => {
                this.setState({
                    isWaiting: false,
                    output: obj.output
                });
            });
        }).catch(error => {
            this.setState({
                isWaiting: false,
                output: "Error" + error
            });
        });
    }

    render() {
        let content = <div style={ { width: "80%", margin: "auto" } }>
            <h1 style={ { margin: "30px 20px" } }>Kaprino Online Compiler</h1>
            <Container style={ { margin: "0px" } }>
                <Row>
                    <Col>
                        <ScriptEditor onScriptExecuteButtonClicked={ this.onExecuteButtonClicked }></ScriptEditor>
                    </Col>
                    <Col>
                        <OutputDisplay text={ this.state.output } isWaiting={ this.state.isWaiting }></OutputDisplay>
                        <InformationCard compilerVersion={ this.props.compilerVersion }></InformationCard>
                    </Col>
                </Row>
            </Container>
        </div>;
        return content;
    }
}