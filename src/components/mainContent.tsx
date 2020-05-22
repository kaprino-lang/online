import * as React from "react";
import { Container, Col, Row } from "react-bootstrap"

import { InformationCard } from "./informationCard"
import { OutputDisplay } from "./outputDisplay"
import { ScriptEditor } from "./scriptEditor"

export interface IMainContentProps {
    compilerVersion: string;
}

export interface IMainContentState {
    output: string;
}

export class MainContent extends React.Component<IMainContentProps, IMainContentState> {
    constructor(props: IMainContentProps) {
        super(props);
        this.state = {
            output: ""
        };
    }

    escapeHtml(str: string){
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#x27;');
        str = str.replace(/`/g, '&#x60;');
        str = str.replace(/\n/g, '<br />');
        return str;
    }

    onExecuteButtonClicked = (text: string, type: string)  => {
        let textEncoded = encodeURIComponent(text);
        fetch(`https://kaprino.herokuapp.com/api/v1?type=${type}&file=${textEncoded}`).then(res => {
            res.json().then((obj) => {
                this.setState({
                    output: obj.output
                });
            });
        }).catch(error => {
            this.setState({
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
                        <OutputDisplay text={ this.state.output }></OutputDisplay>
                        <InformationCard compilerVersion={ this.props.compilerVersion }></InformationCard>
                    </Col>
                </Row>
            </Container>
        </div>;
        return content;
    }
}