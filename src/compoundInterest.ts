
export interface FutureBalance {
    principal: number,
    total: number
}

export default function compoundInterest(
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
): FutureBalance {

    let total = p;
    let principal = p;

    for (let i = 0; i < t * n; i++) {
        total += (c * cn) || 0;
        total = total + (total * r);

        principal += (c * cn) || 0;
    }

    return { total, principal };
}