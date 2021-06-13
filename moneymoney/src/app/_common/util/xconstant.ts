// WALLET TYPE
export const WALLET_TYPE_CASH = 1;
export const WALLET_TYPE_SAVINGS_ACCOUNT = 2;
export const WALLET_TYPE_FIXED_ACCOUNT = 3;
export const WALLET_TYPE_OTHER = 90;

//DEBT
export const DEBT_TYPE_CREDIT_CARD = 1;
export const DEBT_TYPE_DEBIT_CARD = 2;
export const DEBT_TYPE_CREDIT = 3;

// TRANSACTION TYPE
export const TRANSACTION_TYPE_EXPENSE = 1;
export const TRANSACTION_TYPE_INCOME = 2;

export const WalletType = Object.freeze(
    [
        {code:WALLET_TYPE_CASH, name:'เงินสด'},
        {code:WALLET_TYPE_SAVINGS_ACCOUNT, name:'บัญชีออมทรัพย์'},
        {code:WALLET_TYPE_FIXED_ACCOUNT, name:'บัญชีเงินฝากประจำ'},
        {code:WALLET_TYPE_OTHER, name:'อื่นๆ'}
    ]
);

