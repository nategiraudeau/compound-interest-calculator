import React, { Component } from 'react';
import { Radio } from '@rmwc/radio';

import '@rmwc/radio/styles';

import compoundInterest from '../compoundInterest';

export const parseInput = (input: string): number =>
    Number.parseFloat(input.replace('$', ''));

export interface FormState {
    /** The initial principal balance. */
    p: number,
    /** The interest rate. */
    r: number,
    /** The number of times interest applied per time period. */
    n: number,
    /** The number of time periods elapsed. */
    t: number,
    /** The ammount contributed at each time preiod. */
    c: number,
    /** The number of times contributed per time period. */
    cn: number
}

export interface FormProps {
    onChange?: (total: number, principle: number) => void
}

export default class Form extends Component<FormProps> {

    state: FormState = {
        p: 10000,
        r: 0.1,
        n: 1,
        t: 2,
        c: 100,
        cn: 1
    }

    inputHandler(key: string): ((event: React.ChangeEvent<HTMLInputElement>) => void) {
        return (e) => {
            e.preventDefault();

            const value = parseInput(e.currentTarget.value);

            this.setState({
                [key]: value
            });
        }
    }

    handleInitialDeposit = this.inputHandler('p');
    handleContrubution = this.inputHandler('c');
    handleTimeSpan = this.inputHandler('t');

    parseRate(value: string): number {
        const initialValue = parseFloat(value.replace('%', ''));
        const precentage = parseFloat(((initialValue) / 100).toFixed(2));

        return precentage;
    }

    handleRate(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        this.setState({
            r: this.parseRate(e.currentTarget.value) || 0
        });
    }

    setContributionFrequency(frequency: string) {
        let cn = 1;

        if (frequency === 'daily') cn = 365;
        if (frequency === 'monthly') cn = 12;

        this.setState({ cn });
    }

    setCompoundFrequency(frequency: string) {
        let n = 1;

        if (frequency === 'daily') n = 365;
        if (frequency === 'monthly') n = 12;

        this.setState({ n });
    }

    render() {

        const { p, r, n, t, c, cn } = this.state;
        const { total, principal } = compoundInterest(p, r, n, t, c, cn);
        const { onChange } = this.props;

        if (onChange) onChange(principal, total);

        return (
            <div className="form panel">
                <div className="form-row">
                    <div className="row-item">
                        <h4>Initial Deposit</h4>
                        <MoneyInput small value={p} onChange={(e) => this.handleInitialDeposit(e)} />
                    </div>
                    <div className="row-space" />
                    <div className="row-item">
                        <h4>Contributions</h4>
                        <MoneyInput value={c || 0} onChange={(e) => this.handleContrubution(e)} />
                        <div className="radio-group">
                            <Radio className="radio" value="daily" onChange={e => this.setContributionFrequency(e.currentTarget.value)} checked={cn === 365} name="contribution">Daily</Radio>
                            <div className="spacing" />
                            <Radio className="radio" value="monthly" onChange={e => this.setContributionFrequency(e.currentTarget.value)} checked={cn === 12} name="contribution">Monthly</Radio>
                            <div className="spacing" />
                            <Radio className="radio" value="annually" onChange={e => this.setContributionFrequency(e.currentTarget.value)} checked={cn === 1} name="contribution">Annually</Radio>
                        </div>
                    </div>
                </div>
                <br />
                <div className="form-row">
                    <div className="row-item">
                        <h4>Investment Time Span</h4>
                        <label className="text-input-extended large">
                            <input className="text-input" maxLength={2} value={t || ''} onChange={(e) => this.handleTimeSpan(e)} placeholder="0" />
                            <span className="text-input-trailing">years</span>
                        </label>
                    </div>
                    <div className="row-space" />
                    <div className="row-item">
                        <h4>Estimated Rate of Return</h4>
                        <label className="text-input-extended">
                            <input className="text-input" value={r ? parseInt((r * 100).toString()) : ''} onChange={(e) => this.handleRate(e)} placeholder="0%" />
                            <span className="text-input-trailing">%</span>
                        </label>
                        <br />
                    </div>
                </div>

                <br />

                <h4>Compound Frequency</h4>
                <div>
                    <div className="radio-group">
                        <Radio className="radio" value="daily" onChange={e => this.setCompoundFrequency(e.currentTarget.value)} checked={n === 365} name="compound">Daily</Radio>
                        <div className="spacing" />
                        <Radio className="radio" value="monthly" onChange={e => this.setCompoundFrequency(e.currentTarget.value)} checked={n === 12} name="compound">Monthly</Radio>
                        <div className="spacing" />
                        <Radio className="radio" value="annually" onChange={e => this.setCompoundFrequency(e.currentTarget.value)} checked={n === 1} name="compound">Annually</Radio>
                    </div>
                </div>
            </div>
        )
    }
}

export interface MoneyInputProps {
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void),
    value?: number,
    small?: boolean
}

export const MoneyInput: React.FC<MoneyInputProps> = ({ onChange, value, small }) => (
    <input className={`text-input${small ? ' small' : ''}`} maxLength={20} onChange={onChange} value={value ? `$${value}` : ''} placeholder="$0" />
);