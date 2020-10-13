import React from 'react';
import numberWithCommas from '../numberWithCommas';
import * as Icons from 'react-feather';
import { Button } from '@rmwc/button';

import '@rmwc/button/styles';

export interface Output {
    principal: number,
    total: number
}

const Output: React.FC<Output> = ({ principal, total }) => {

    function intWithCommas(x: number): string {
        return '$' + numberWithCommas(parseInt(x.toString()));
    }

    let totalDisplay = '$0', principalDisplay = '$0';

    let tooMuchMoney = false;

    if (total >= Number.MAX_SAFE_INTEGER) {
        tooMuchMoney = true;
        totalDisplay = 'Too much money!';
    } else totalDisplay = intWithCommas(total);

    if (principal >= Number.MAX_SAFE_INTEGER) {
        principalDisplay = 'Too much money!';
    } else principalDisplay = intWithCommas(principal);

    let fontSize = 44;

    if (totalDisplay.length === 11) { fontSize = 40; }
    if (totalDisplay.length === 12) { fontSize = 36; }
    if (totalDisplay.length === 13) { fontSize = 32; }
    if (totalDisplay.length === 14) { fontSize = 28; }
    if (totalDisplay.length >= 15) { fontSize = 24; }
    if (totalDisplay.length >= 19) { fontSize = 20; }

    if (principalDisplay) { }

    return (
        <div className="output panel">
            <h2 className="future-balance">Future Balance</h2>
            <hr />
            {
                tooMuchMoney ? (
                    <div className="too-much-money">
                        <Icons.AlertTriangle size={52} />
                        <h2>That's too much money!</h2>
                    </div>
                ) : (
                        <div style={{
                            fontSize: `${fontSize}px`
                        }} className="output-total">
                            {totalDisplay}
                        </div>
                    )
            }
            <hr />
            <Button className="save-button" raised>Save</Button>
        </div>
    )
}

export default Output;
