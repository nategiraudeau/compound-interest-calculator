import React, { Component } from 'react';
import { ThemeProvider } from '@rmwc/theme';
import { Switch } from '@rmwc/switch';
import { IconButton } from '@rmwc/icon-button';

import * as Icons from 'react-feather';

import '@rmwc/theme/styles';
import '@rmwc/switch/styles';
import '@rmwc/icon-button/styles';

import Form from './Form';
import Output from './Output';

export function delay(milliseconds: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
    });
}

export default class Calculator extends Component {

    state = {
        darkMode: false,
        principal: 0,
        visible: true,
        total: 0
    }

    async toggleDarkMode(force?: boolean) {

        await delay(200);

        const { darkMode } = this.state;
        const newMode = force === null || force === undefined ? !darkMode : force;

        this.setState({
            visible: false
        });

        await delay(170);

        this.setState({
            darkMode: newMode
        });

        await delay(170);

        this.setState({
            visible: true
        });
    }

    handleCompoundInterest(p: number, t: number) {

        const { principal, total } = this.state;

        if (p !== principal || t !== total) {
            this.setState({
                principal: p || 0,
                total: t || 0
            });
        }
    }

    render() {

        const { darkMode, principal, total, visible } = this.state;

        document.body.classList.toggle('dark', darkMode);

        return (
            <ThemeProvider options={{
                background: darkMode ? 'black' : 'white',
                onBackground: darkMode ? 'white' : 'black'
            }}>
                <div className={`calculator${darkMode ? ' dark' : ' light'}${visible ? '' : ' invisible'}`}>
                    <div className="__content__">
                        <div className="header">
                            <h1 className="title">Compound Interest <br /> <span id="calculator">Calculator</span></h1>
                            <div className="actions">
                                <div className="darkmode-toggle">
                                    <p>Dark Mode</p>
                                    <Switch className="switch" onChange={(e) => {
                                        this.toggleDarkMode(!!e.currentTarget.checked);
                                    }} checked={darkMode} />
                                </div>
                                <div className="verticle-divider" />
                                <IconButton icon={
                                    <Icons.GitHub />
                                } />
                            </div>
                        </div>
                        <div className="calculator-content">
                            <Form onChange={(p, t) => this.handleCompoundInterest(p, t)} />
                            <div className="panel-spacing" />
                            <Output principal={principal} total={total} />
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="footer-content">
                            <h5>Copyright &copy; 2020 Nate Giraudeau</h5>
                        </div>
                    </footer>
                </ div>
            </ThemeProvider>
        )
    }
}
