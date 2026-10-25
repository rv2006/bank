import React, { useState, useMemo } from 'react';
import {
  Building2,
  Users,
  CreditCard,
  ArrowLeftRight,
  ShieldAlert,
  FileText,
  Database,
  Terminal,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Check,
  TrendingUp,
  Landmark,
  Wallet,
  PiggyBank,
  UserCheck,
  Play,
} from 'lucide-react';

// ============================================================================
// INITIAL 3NF RELATIONAL DATABASE SEED STATE (ORACLE DB SIMULATION)
// ============================================================================
const INITIAL_DB = {
  BRANCH: [
    {
      branch_id: 'BR01',
      branch_name: 'Vellore Main Branch',
      city: 'Vellore',
      ifsc_code: 'ORCL0001001',
    },
    {
      branch_id: 'BR02',
      branch_name: 'Chennai Anna Nagar',
      city: 'Chennai',
      ifsc_code: 'ORCL0001002',
    },
    {
      branch_id: 'BR03',
      branch_name: 'Bengaluru MG Road',
      city: 'Bengaluru',
      ifsc_code: 'ORCL0001003',
    },
  ],
  CUSTOMER: [
    {
      customer_id: 'CUST101',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@vit.ac.in',
      phone: '9876543210',
      address: '12 Katpadi Road, Vellore',
      dob: '1998-05-14',
      created_date: '2025-01-10',
    },
    {
      customer_id: 'CUST102',
      name: 'Priya Nair',
      email: 'priya.nair@gmail.com',
      phone: '9840123456',
      address: '45 2nd Avenue, Anna Nagar, Chennai',
      dob: '1999-11-22',
      created_date: '2025-01-12',
    },
    {
      customer_id: 'CUST103',
      name: 'Rohan Verma',
      email: 'rohan.verma@outlook.com',
      phone: '9731112233',
      address: '88 Brigade Road, Bengaluru',
      dob: '1995-08-03',
      created_date: '2025-02-01',
    },
  ],
  ACCOUNT: [
    {
      account_id: 'ACC2001',
      branch_id: 'BR01',
      account_type: 'SAVINGS',
      balance: 45000,
      status: 'ACTIVE',
      open_date: '2025-01-10',
    },
    {
      account_id: 'ACC2002',
      branch_id: 'BR01',
      account_type: 'CURRENT',
      balance: 120000,
      status: 'ACTIVE',
      open_date: '2025-01-15',
    },
    {
      account_id: 'ACC2003',
      branch_id: 'BR02',
      account_type: 'SAVINGS',
      balance: 18500,
      status: 'ACTIVE',
      open_date: '2025-01-20',
    },
    {
      account_id: 'ACC2004',
      branch_id: 'BR03',
      account_type: 'SAVINGS',
      balance: 3200,
      status: 'FROZEN',
      open_date: '2025-02-05',
    },
  ],
  ACCOUNT_HOLDER: [
    { account_id: 'ACC2001', customer_id: 'CUST101', holder_role: 'PRIMARY' },
    { account_id: 'ACC2001', customer_id: 'CUST102', holder_role: 'JOINT' }, // Joint Account between Aarav & Priya
    { account_id: 'ACC2002', customer_id: 'CUST101', holder_role: 'PRIMARY' },
    { account_id: 'ACC2003', customer_id: 'CUST102', holder_role: 'PRIMARY' },
    { account_id: 'ACC2004', customer_id: 'CUST103', holder_role: 'PRIMARY' },
  ],
  TRANSACTIONS: [
    {
      txn_id: 'TXN9001',
      account_id: 'ACC2001',
      txn_type: 'DEPOSIT',
      amount: 45000,
      txn_date: '2025-01-10 10:15:00',
      description: 'Initial Account Opening Deposit',
    },
    {
      txn_id: 'TXN9002',
      account_id: 'ACC2002',
      txn_type: 'DEPOSIT',
      amount: 120000,
      txn_date: '2025-01-15 11:30:00',
      description: 'Business Capital Deposit',
    },
    {
      txn_id: 'TXN9003',
      account_id: 'ACC2003',
      txn_type: 'DEPOSIT',
      amount: 18500,
      txn_date: '2025-01-20 14:20:00',
      description: 'Initial Deposit',
    },
  ],
  LOAN: [
    {
      loan_id: 'LN501',
      disbursed_account_id: 'ACC2001',
      principal: 200000,
      interest_rate: 9.5,
      tenure_months: 24,
      status: 'APPROVED',
      start_date: '2025-02-01',
      emi_amount: 9183,
    },
    {
      loan_id: 'LN502',
      disbursed_account_id: 'ACC2003',
      principal: 150000,
      interest_rate: 10.5,
      tenure_months: 36,
      status: 'PENDING',
      start_date: '2025-03-01',
      emi_amount: 4875,
    },
  ],
  LOAN_BORROWER: [
    { loan_id: 'LN501', customer_id: 'CUST101', role: 'PRIMARY' },
    { loan_id: 'LN501', customer_id: 'CUST102', role: 'CO-BORROWER' }, // Joint Loan
    { loan_id: 'LN502', customer_id: 'CUST102', role: 'PRIMARY' },
  ],
  LOAN_PAYMENT: [
    { payment_id: 'PAY301', loan_id: 'LN501', amount: 9183, pay_date: '2025-03-01 09:00:00' },
  ],
  CARD: [
    {
      card_id: 'CRD701',
      account_id: 'ACC2001',
      card_no: '4532-8891-2234-1009',
      card_type: 'DEBIT',
      expiry_date: '12/29',
      status: 'ACTIVE',
    },
    {
      card_id: 'CRD702',
      account_id: 'ACC2003',
      card_no: '5109-3341-9980-4412',
      card_type: 'DEBIT',
      expiry_date: '08/28',
      status: 'ACTIVE',
    },
    {
      card_id: 'CRD703',
      account_id: 'ACC2004',
      card_no: '4111-2222-3333-4444',
      card_type: 'CREDIT',
      expiry_date: '05/27',
      status: 'BLOCKED',
    },
  ],
  FIXED_DEPOSIT: [
    {
      fd_id: 'FD801',
      customer_id: 'CUST101',
      account_id: 'ACC2001',
      principal: 25000,
      rate: 7.25,
      months: 12,
      start_date: '2025-01-18',
      status: 'ACTIVE',
    },
  ],
  AUDIT_LOG: [
    {
      log_id: 'AUD1001',
      account_id: 'ACC2001',
      old_balance: 0,
      new_balance: 45000,
      changed_on: '2025-01-10 10:15:00',
      trigger_source: 'TRG_ACCOUNT_AUDIT (Initial Deposit)',
    },
    {
      log_id: 'AUD1002',
      account_id: 'ACC2002',
      old_balance: 0,
      new_balance: 120000,
      changed_on: '2025-01-15 11:30:00',
      trigger_source: 'TRG_ACCOUNT_AUDIT (Initial Deposit)',
    },
    {
      log_id: 'AUD1003',
      account_id: 'ACC2003',
      old_balance: 0,
      new_balance: 18500,
      changed_on: '2025-01-20 14:20:00',
      trigger_source: 'TRG_ACCOUNT_AUDIT (Initial Deposit)',
    },
  ],
};

// Helper: Calculate Monthly EMI: P * r * (1+r)^n / ((1+r)^n - 1)
function calculateEmi(principal, annualRate, tenureMonths) {
  const P = Number(principal);
  const r = Number(annualRate) / 12 / 100;
  const n = Number(tenureMonths);
  if (!P || !r || !n) return 0;
  const factor = Math.pow(1 + r, n);
  return Math.round((P * r * factor) / (factor - 1));
}

function nowTimestamp() {
  const d = new Date();
  return d.toISOString().replace('T', ' ').substring(0, 19);
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Public+Sans:wght@400;500;600;700&display=swap');
body { font-family: 'Public Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
h1, h2, h3, .font-display { font-family: Fraunces, Georgia, serif; letter-spacing: -0.01em; }
td, th { font-variant-numeric: tabular-nums; }
thead th { font-weight: 600; }
input, select, textarea { outline: none; }
input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible {
  outline: 2px solid #0f766e;
  outline-offset: 1px;
}
::selection { background: #99f6e4; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
`;

export default function App() {
  const [db, setDb] = useState(INITIAL_DB);
  const [activeRole, setActiveRole] = useState('CUSTOMER'); // 'CUSTOMER' | 'STAFF' | 'MANAGER'
  const [activeCustomerId, setActiveCustomerId] = useState('CUST101');
  const [customerSubTab, setCustomerSubTab] = useState('ACCOUNTS');
  const [staffSubTab, setStaffSubTab] = useState('CUSTOMERS_ACCOUNTS');
  const [managerSubTab, setManagerSubTab] = useState('REPORTS');

  // Toast / Oracle Error Banner State
  const [notification, setNotification] = useState(null);

  // Live SQL & PL/SQL Execution Log for DBMS Review Demo
  const [sqlLogs, setSqlLogs] = useState([
    {
      id: 1,
      time: '10:00:00',
      status: 'COMMIT',
      proc: 'SYSTEM_INIT',
      sql: 'ALTER SESSION SET ISOLATION_LEVEL = READ COMMITTED; -- 3NF Schema & Triggers Active',
      detail: 'TRG_MIN_BALANCE and TRG_ACCOUNT_AUDIT enabled on ACCOUNT table.',
    },
  ]);

  const [showSqlDrawer, setShowSqlDrawer] = useState(true);

  // Helper to log SQL execution
  const pushSqlLog = (status, proc, sql, detail) => {
    setSqlLogs((prev) => [
      {
        id: Date.now() + Math.random(),
        time: new Date().toLocaleTimeString(),
        status,
        proc,
        sql,
        detail,
      },
      ...prev,
    ]);
  };

  const showToast = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 6000);
  };

  // ============================================================================
  // CORE ORACLE PL/SQL ENGINE & TRIGGER SIMULATION
  // ============================================================================

  // 1. Deposit (PRC_DEPOSIT)
  const executeDeposit = (accountId, amountStr, description = 'Cash / Online Deposit') => {
    const amount = Number(amountStr);
    if (!amount || amount <= 0) {
      pushSqlLog(
        'ROLLBACK',
        'PRC_DEPOSIT',
        `INSERT INTO TRANSACTIONS ... AMOUNT = ${amountStr}`,
        'ORA-02290: check constraint (CHK_AMOUNT_POSITIVE) violated'
      );
      showToast(
        'error',
        'ORA-02290: Check Constraint Violated',
        'Deposit amount must be strictly greater than ₹0.'
      );
      return false;
    }

    const acc = db.ACCOUNT.find((a) => a.account_id === accountId);
    if (!acc) return false;

    if (acc.status !== 'ACTIVE') {
      pushSqlLog(
        'ROLLBACK',
        'TRG_MIN_BALANCE',
        `UPDATE ACCOUNT SET balance = balance + ${amount} WHERE account_id = '${accountId}';`,
        `ORA-20002: Account ${accountId} is ${acc.status}. Transactions are blocked.`
      );
      showToast(
        'error',
        `ORA-20002: Account ${acc.status}`,
        `Account ${accountId} is currently ${acc.status}. Cannot deposit funds.`
      );
      return false;
    }

    const oldBal = acc.balance;
    const newBal = oldBal + amount;
    const timestamp = nowTimestamp();
    const txnId = 'TXN' + Math.floor(1000 + Math.random() * 9000);
    const audId = 'AUD' + Math.floor(1000 + Math.random() * 9000);

    setDb((prev) => ({
      ...prev,
      ACCOUNT: prev.ACCOUNT.map((a) =>
        a.account_id === accountId ? { ...a, balance: newBal } : a
      ),
      TRANSACTIONS: [
        {
          txn_id: txnId,
          account_id: accountId,
          txn_type: 'DEPOSIT',
          amount,
          txn_date: timestamp,
          description,
        },
        ...prev.TRANSACTIONS,
      ],
      AUDIT_LOG: [
        {
          log_id: audId,
          account_id: accountId,
          old_balance: oldBal,
          new_balance: newBal,
          changed_on: timestamp,
          trigger_source: 'TRG_ACCOUNT_AUDIT (DEPOSIT)',
        },
        ...prev.AUDIT_LOG,
      ],
    }));

    pushSqlLog(
      'COMMIT',
      'PRC_DEPOSIT',
      `EXEC PRC_DEPOSIT('${accountId}', ${amount});`,
      `Account ${accountId} credited. TRG_ACCOUNT_AUDIT logged ₹${oldBal} -> ₹${newBal}.`
    );
    showToast(
      'success',
      'Deposit Committed',
      `₹${amount.toLocaleString('en-IN')} credited to ${accountId}. Audit trail updated.`
    );
    return true;
  };

  // 2. Withdraw (PRC_WITHDRAW with TRG_MIN_BALANCE check)
  const executeWithdraw = (accountId, amountStr, description = 'ATM / Branch Withdrawal') => {
    const amount = Number(amountStr);
    if (!amount || amount <= 0) {
      pushSqlLog(
        'ROLLBACK',
        'PRC_WITHDRAW',
        `EXEC PRC_WITHDRAW('${accountId}', ${amountStr});`,
        'ORA-02290: check constraint (CHK_AMOUNT_POSITIVE) violated'
      );
      showToast(
        'error',
        'ORA-02290: Check Constraint Violated',
        'Withdrawal amount must be greater than ₹0.'
      );
      return false;
    }

    const acc = db.ACCOUNT.find((a) => a.account_id === accountId);
    if (!acc) return false;

    if (acc.status !== 'ACTIVE') {
      pushSqlLog(
        'ROLLBACK',
        'TRG_MIN_BALANCE',
        `UPDATE ACCOUNT SET balance = balance - ${amount} WHERE account_id = '${accountId}';`,
        `ORA-20002: Account ${accountId} is ${acc.status}. Cannot transact.`
      );
      showToast(
        'error',
        `ORA-20002: Account ${acc.status}`,
        `Account ${accountId} is ${acc.status}. Withdrawal rejected by trigger.`
      );
      return false;
    }

    const oldBal = acc.balance;
    const newBal = oldBal - amount;

    if (newBal < 500) {
      pushSqlLog(
        'ROLLBACK',
        'TRG_MIN_BALANCE',
        `UPDATE ACCOUNT SET balance = ${newBal} WHERE account_id = '${accountId}'; -- ROLLBACK`,
        `ORA-20001: Minimum balance of Rs. 500 must be maintained. Attempted balance: ₹${newBal}.`
      );
      showToast(
        'error',
        'ORA-20001: Trigger TRG_MIN_BALANCE Blocked Withdrawal',
        `Withdrawal of ₹${amount.toLocaleString('en-IN')} would leave ₹${newBal.toLocaleString('en-IN')}, which is below the ₹500 minimum requirement.`
      );
      return false;
    }

    const timestamp = nowTimestamp();
    const txnId = 'TXN' + Math.floor(1000 + Math.random() * 9000);
    const audId = 'AUD' + Math.floor(1000 + Math.random() * 9000);

    setDb((prev) => ({
      ...prev,
      ACCOUNT: prev.ACCOUNT.map((a) =>
        a.account_id === accountId ? { ...a, balance: newBal } : a
      ),
      TRANSACTIONS: [
        {
          txn_id: txnId,
          account_id: accountId,
          txn_type: 'WITHDRAW',
          amount,
          txn_date: timestamp,
          description,
        },
        ...prev.TRANSACTIONS,
      ],
      AUDIT_LOG: [
        {
          log_id: audId,
          account_id: accountId,
          old_balance: oldBal,
          new_balance: newBal,
          changed_on: timestamp,
          trigger_source: 'TRG_ACCOUNT_AUDIT (WITHDRAW)',
        },
        ...prev.AUDIT_LOG,
      ],
    }));

    pushSqlLog(
      'COMMIT',
      'PRC_WITHDRAW',
      `EXEC PRC_WITHDRAW('${accountId}', ${amount});`,
      `TRG_MIN_BALANCE passed (₹${newBal} >= 500). TRG_ACCOUNT_AUDIT logged ₹${oldBal} -> ₹${newBal}.`
    );
    showToast(
      'success',
      'Withdrawal Committed',
      `₹${amount.toLocaleString('en-IN')} debited from ${accountId}.`
    );
    return true;
  };

  // 3. Atomic All-Or-Nothing Transfer (PRC_TRANSFER_FUNDS)
  const executeAtomicTransfer = (fromAccId, toAccId, amountStr, remark = 'IMPS Fund Transfer') => {
    const amount = Number(amountStr);
    if (!amount || amount <= 0) {
      pushSqlLog(
        'ROLLBACK',
        'PRC_TRANSFER_FUNDS',
        `EXEC PRC_TRANSFER_FUNDS('${fromAccId}', '${toAccId}', ${amountStr});`,
        'ORA-02290: Transfer amount must be > 0.'
      );
      showToast(
        'error',
        'ORA-02290: Constraint Violation',
        'Transfer amount must be greater than ₹0.'
      );
      return false;
    }

    if (fromAccId === toAccId) {
      pushSqlLog(
        'ROLLBACK',
        'PRC_TRANSFER_FUNDS',
        `EXEC PRC_TRANSFER_FUNDS('${fromAccId}', '${toAccId}', ${amount});`,
        'ORA-20003: Source and destination accounts cannot be identical.'
      );
      showToast(
        'error',
        'ORA-20003: Invalid Transfer',
        'Source and destination accounts cannot be the same.'
      );
      return false;
    }

    const sourceAcc = db.ACCOUNT.find((a) => a.account_id === fromAccId);
    const destAcc = db.ACCOUNT.find((a) => a.account_id === toAccId);

    if (!sourceAcc || !destAcc) {
      showToast('error', 'ORA-02291: Foreign Key Error', 'Destination account ID does not exist.');
      return false;
    }

    // Check Source Account Status
    if (sourceAcc.status !== 'ACTIVE') {
      pushSqlLog(
        'ROLLBACK',
        'PRC_TRANSFER_FUNDS',
        `UPDATE ACCOUNT SET balance = balance - ${amount} WHERE account_id = '${fromAccId}';\nROLLBACK;`,
        `ORA-20002: Source Account ${fromAccId} is ${sourceAcc.status}. Atomic Rollback Executed.`
      );
      showToast(
        'error',
        `ORA-20002: Atomic Transfer Rolled Back`,
        `Source account ${fromAccId} is ${sourceAcc.status}. No funds were moved.`
      );
      return false;
    }

    // Check Minimum Balance on Source Account
    const newSourceBal = sourceAcc.balance - amount;
    if (newSourceBal < 500) {
      pushSqlLog(
        'ROLLBACK',
        'PRC_TRANSFER_FUNDS',
        `BEGIN\n  UPDATE ACCOUNT SET balance = balance - ${amount} WHERE account_id = '${fromAccId}';\n  -- TRG_MIN_BALANCE raised ORA-20001\n  ROLLBACK;\nEND;`,
        `ORA-20001: Minimum balance of Rs. 500 violated on ${fromAccId} (would become ₹${newSourceBal}). Entire transfer rolled back.`
      );
      showToast(
        'error',
        'ORA-20001: Atomic Rollback Executed',
        `Insufficient balance above ₹500 minimum in ${fromAccId}. Transaction safely rolled back.`
      );
      return false;
    }

    // Simulate Partial Failure Scenario: Debit succeeds in memory, but Destination is FROZEN/CLOSED!
    if (destAcc.status !== 'ACTIVE') {
      pushSqlLog(
        'ROLLBACK',
        'PRC_TRANSFER_FUNDS',
        `BEGIN\n  UPDATE ACCOUNT SET balance = balance - ${amount} WHERE account_id = '${fromAccId}'; -- Step 1 OK\n  UPDATE ACCOUNT SET balance = balance + ${amount} WHERE account_id = '${toAccId}'; -- FAILED (Account ${destAcc.status})\n  ROLLBACK; -- Step 1 Debit Reverted!\nEND;`,
        `ORA-20002: Destination Account ${toAccId} is ${destAcc.status}. Step 1 debit on ${fromAccId} was ROLLED BACK automatically!`
      );
      showToast(
        'error',
        'ORA-20002: Partial Transfer Prevented (ROLLBACK)',
        `Destination account ${toAccId} is ${destAcc.status}. Debit from ${fromAccId} was rolled back so no money was lost!`
      );
      return false;
    }

    // Both sides valid -> COMMIT
    const newDestBal = destAcc.balance + amount;
    const timestamp = nowTimestamp();
    const txnOut = 'TXN' + Math.floor(1000 + Math.random() * 9000);
    const txnIn = 'TXN' + Math.floor(1000 + Math.random() * 9000);
    const audOut = 'AUD' + Math.floor(1000 + Math.random() * 9000);
    const audIn = 'AUD' + Math.floor(1000 + Math.random() * 9000);

    setDb((prev) => ({
      ...prev,
      ACCOUNT: prev.ACCOUNT.map((a) => {
        if (a.account_id === fromAccId) return { ...a, balance: newSourceBal };
        if (a.account_id === toAccId) return { ...a, balance: newDestBal };
        return a;
      }),
      TRANSACTIONS: [
        {
          txn_id: txnIn,
          account_id: toAccId,
          txn_type: 'TRANSFER_IN',
          amount,
          txn_date: timestamp,
          description: `Transfer from ${fromAccId} (${remark})`,
        },
        {
          txn_id: txnOut,
          account_id: fromAccId,
          txn_type: 'TRANSFER_OUT',
          amount,
          txn_date: timestamp,
          description: `Transfer to ${toAccId} (${remark})`,
        },
        ...prev.TRANSACTIONS,
      ],
      AUDIT_LOG: [
        {
          log_id: audIn,
          account_id: toAccId,
          old_balance: destAcc.balance,
          new_balance: newDestBal,
          changed_on: timestamp,
          trigger_source: 'TRG_ACCOUNT_AUDIT (TRANSFER_IN)',
        },
        {
          log_id: audOut,
          account_id: fromAccId,
          old_balance: sourceAcc.balance,
          new_balance: newSourceBal,
          changed_on: timestamp,
          trigger_source: 'TRG_ACCOUNT_AUDIT (TRANSFER_OUT)',
        },
        ...prev.AUDIT_LOG,
      ],
    }));

    pushSqlLog(
      'COMMIT',
      'PRC_TRANSFER_FUNDS',
      `EXEC PRC_TRANSFER_FUNDS('${fromAccId}', '${toAccId}', ${amount});\nCOMMIT;`,
      `Atomic Transfer Succeeded: ${fromAccId} (₹${sourceAcc.balance}->₹${newSourceBal}), ${toAccId} (₹${destAcc.balance}->₹${newDestBal}). 2 Audit rows inserted.`
    );
    showToast(
      'success',
      'Atomic Transfer Committed',
      `₹${amount.toLocaleString('en-IN')} transferred from ${fromAccId} to ${toAccId} with full ACID compliance.`
    );
    return true;
  };

  // 4. Apply for Loan (with optional Co-borrower)
  const applyForLoan = ({ accountId, principal, rate, months, coBorrowerId }) => {
    const P = Number(principal);
    const R = Number(rate);
    const N = Number(months);
    if (P <= 0 || R <= 0 || N <= 0) {
      showToast(
        'error',
        'ORA-02290: Constraint Violation',
        'Loan principal, interest rate, and tenure must be positive.'
      );
      return;
    }

    const loanId = 'LN' + Math.floor(503 + Math.random() * 490);
    const emi = calculateEmi(P, R, N);
    const today = new Date().toISOString().split('T')[0];

    const newBorrowers = [{ loan_id: loanId, customer_id: activeCustomerId, role: 'PRIMARY' }];
    if (coBorrowerId && coBorrowerId !== 'NONE' && coBorrowerId !== activeCustomerId) {
      newBorrowers.push({ loan_id: loanId, customer_id: coBorrowerId, role: 'CO-BORROWER' });
    }

    setDb((prev) => ({
      ...prev,
      LOAN: [
        {
          loan_id: loanId,
          disbursed_account_id: accountId,
          principal: P,
          interest_rate: R,
          tenure_months: N,
          status: 'PENDING',
          start_date: today,
          emi_amount: emi,
        },
        ...prev.LOAN,
      ],
      LOAN_BORROWER: [...prev.LOAN_BORROWER, ...newBorrowers],
    }));

    pushSqlLog(
      'COMMIT',
      'PRC_APPLY_LOAN',
      `INSERT INTO LOAN VALUES ('${loanId}', '${accountId}', ${P}, ${R}, ${N}, 'PENDING', SYSDATE);\n-- FN_CALC_EMI returned ₹${emi}/month`,
      `Loan ${loanId} created in PENDING status (${newBorrowers.length > 1 ? 'Joint Loan with ' + coBorrowerId : 'Single Borrower'}).`
    );
    showToast(
      'success',
      'Loan Application Submitted',
      `Loan ${loanId} (EMI: ₹${emi.toLocaleString('en-IN')}/mo) submitted for Staff approval.`
    );
  };

  // 5. Approve Loan (Staff Action -> Credits principal to disbursed_account_id)
  const approveLoan = (loanId) => {
    const loan = db.LOAN.find((l) => l.loan_id === loanId);
    if (!loan || loan.status !== 'PENDING') return;

    const acc = db.ACCOUNT.find((a) => a.account_id === loan.disbursed_account_id);
    if (!acc || acc.status !== 'ACTIVE') {
      pushSqlLog(
        'ROLLBACK',
        'PRC_APPROVE_LOAN',
        `EXEC PRC_APPROVE_LOAN('${loanId}');`,
        `ORA-20002: Disbursal account ${loan.disbursed_account_id} is not ACTIVE.`
      );
      showToast(
        'error',
        'ORA-20002: Disbursal Failed',
        `Target account ${loan.disbursed_account_id} is ${acc?.status}. Cannot disburse loan.`
      );
      return;
    }

    const oldBal = acc.balance;
    const newBal = oldBal + loan.principal;
    const timestamp = nowTimestamp();
    const txnId = 'TXN' + Math.floor(1000 + Math.random() * 9000);
    const audId = 'AUD' + Math.floor(1000 + Math.random() * 9000);

    setDb((prev) => ({
      ...prev,
      LOAN: prev.LOAN.map((l) => (l.loan_id === loanId ? { ...l, status: 'APPROVED' } : l)),
      ACCOUNT: prev.ACCOUNT.map((a) =>
        a.account_id === acc.account_id ? { ...a, balance: newBal } : a
      ),
      TRANSACTIONS: [
        {
          txn_id: txnId,
          account_id: acc.account_id,
          txn_type: 'LOAN_DISBURSAL',
          amount: loan.principal,
          txn_date: timestamp,
          description: `Loan ${loanId} Principal Disbursed`,
        },
        ...prev.TRANSACTIONS,
      ],
      AUDIT_LOG: [
        {
          log_id: audId,
          account_id: acc.account_id,
          old_balance: oldBal,
          new_balance: newBal,
          changed_on: timestamp,
          trigger_source: `TRG_ACCOUNT_AUDIT (LOAN_DISBURSAL ${loanId})`,
        },
        ...prev.AUDIT_LOG,
      ],
    }));

    pushSqlLog(
      'COMMIT',
      'PRC_APPROVE_LOAN',
      `EXEC PRC_APPROVE_LOAN('${loanId}'); -- Credits ₹${loan.principal} to ${acc.account_id}`,
      `Loan ${loanId} APPROVED. Principal ₹${loan.principal} credited to ${acc.account_id}. Audit logged ₹${oldBal} -> ₹${newBal}.`
    );
    showToast(
      'success',
      'Loan Approved & Disbursed',
      `Loan ${loanId} approved! ₹${loan.principal.toLocaleString('en-IN')} credited to account ${acc.account_id}.`
    );
  };

  // 6. Pay Loan EMI (Deducts from disbursed_account_id & inserts into LOAN_PAYMENT)
  const payLoanEmi = (loanId) => {
    const loan = db.LOAN.find((l) => l.loan_id === loanId);
    if (!loan || loan.status !== 'APPROVED') return;

    const acc = db.ACCOUNT.find((a) => a.account_id === loan.disbursed_account_id);
    if (!acc || acc.status !== 'ACTIVE') {
      showToast(
        'error',
        'ORA-20002: Account Inactive',
        `Disbursal account ${loan.disbursed_account_id} is ${acc?.status}.`
      );
      return;
    }

    const emi = loan.emi_amount;
    const oldBal = acc.balance;
    const newBal = oldBal - emi;

    if (newBal < 500) {
      pushSqlLog(
        'ROLLBACK',
        'PRC_PAY_EMI',
        `EXEC PRC_PAY_EMI('${loanId}');`,
        `ORA-20001: Minimum balance of Rs. 500 violated on ${acc.account_id} during EMI debit.`
      );
      showToast(
        'error',
        'ORA-20001: EMI Debit Blocked',
        `Paying EMI of ₹${emi.toLocaleString('en-IN')} would leave ${acc.account_id} below ₹500 minimum balance.`
      );
      return;
    }

    const timestamp = nowTimestamp();
    const payId = 'PAY' + Math.floor(302 + Math.random() * 600);
    const txnId = 'TXN' + Math.floor(1000 + Math.random() * 9000);
    const audId = 'AUD' + Math.floor(1000 + Math.random() * 9000);

    setDb((prev) => ({
      ...prev,
      ACCOUNT: prev.ACCOUNT.map((a) =>
        a.account_id === acc.account_id ? { ...a, balance: newBal } : a
      ),
      LOAN_PAYMENT: [
        { payment_id: payId, loan_id: loanId, amount: emi, pay_date: timestamp },
        ...prev.LOAN_PAYMENT,
      ],
      TRANSACTIONS: [
        {
          txn_id: txnId,
          account_id: acc.account_id,
          txn_type: 'EMI_PAYMENT',
          amount: emi,
          txn_date: timestamp,
          description: `Monthly EMI Payment for Loan ${loanId}`,
        },
        ...prev.TRANSACTIONS,
      ],
      AUDIT_LOG: [
        {
          log_id: audId,
          account_id: acc.account_id,
          old_balance: oldBal,
          new_balance: newBal,
          changed_on: timestamp,
          trigger_source: `TRG_ACCOUNT_AUDIT (EMI_PAYMENT ${loanId})`,
        },
        ...prev.AUDIT_LOG,
      ],
    }));

    pushSqlLog(
      'COMMIT',
      'PRC_PAY_EMI',
      `EXEC PRC_PAY_EMI('${loanId}');`,
      `EMI ₹${emi} deducted from ${acc.account_id}. Recorded in LOAN_PAYMENT (${payId}).`
    );
    showToast(
      'success',
      'EMI Payment Recorded',
      `₹${emi.toLocaleString('en-IN')} paid towards Loan ${loanId} from ${acc.account_id}.`
    );
  };

  // 7. Fixed Deposits: Open FD, Close Early (Principal only), Mature (Principal + Interest)
  const openFixedDeposit = ({ accountId, principalStr, rateStr, monthsStr }) => {
    const P = Number(principalStr);
    const R = Number(rateStr);
    const M = Number(monthsStr);
    if (P <= 0 || R <= 0 || M <= 0) {
      showToast(
        'error',
        'ORA-02290: Constraint Error',
        'FD Principal, Rate, and Months must be positive.'
      );
      return;
    }

    const acc = db.ACCOUNT.find((a) => a.account_id === accountId);
    if (!acc || acc.status !== 'ACTIVE') {
      showToast('error', 'ORA-20002: Account Inactive', `Account ${accountId} is not ACTIVE.`);
      return;
    }

    const oldBal = acc.balance;
    const newBal = oldBal - P;
    if (newBal < 500) {
      pushSqlLog(
        'ROLLBACK',
        'PRC_OPEN_FD',
        `EXEC PRC_OPEN_FD('${activeCustomerId}', '${accountId}', ${P}, ${R}, ${M});`,
        'ORA-20001: Minimum balance of Rs. 500 must be maintained.'
      );
      showToast(
        'error',
        'ORA-20001: Minimum Balance Trigger',
        `Opening FD of ₹${P.toLocaleString('en-IN')} leaves balance below ₹500.`
      );
      return;
    }

    const fdId = 'FD' + Math.floor(802 + Math.random() * 190);
    const today = new Date().toISOString().split('T')[0];
    const timestamp = nowTimestamp();

    setDb((prev) => ({
      ...prev,
      ACCOUNT: prev.ACCOUNT.map((a) =>
        a.account_id === accountId ? { ...a, balance: newBal } : a
      ),
      FIXED_DEPOSIT: [
        {
          fd_id: fdId,
          customer_id: activeCustomerId,
          account_id: accountId,
          principal: P,
          rate: R,
          months: M,
          start_date: today,
          status: 'ACTIVE',
        },
        ...prev.FIXED_DEPOSIT,
      ],
      TRANSACTIONS: [
        {
          txn_id: 'TXN' + Math.floor(1000 + Math.random() * 9000),
          account_id: accountId,
          txn_type: 'FD_OPEN',
          amount: P,
          txn_date: timestamp,
          description: `Opened Fixed Deposit ${fdId} (${R}% for ${M}m)`,
        },
        ...prev.TRANSACTIONS,
      ],
      AUDIT_LOG: [
        {
          log_id: 'AUD' + Math.floor(1000 + Math.random() * 9000),
          account_id: accountId,
          old_balance: oldBal,
          new_balance: newBal,
          changed_on: timestamp,
          trigger_source: `TRG_ACCOUNT_AUDIT (FD_OPEN ${fdId})`,
        },
        ...prev.AUDIT_LOG,
      ],
    }));

    pushSqlLog(
      'COMMIT',
      'PRC_OPEN_FD',
      `EXEC PRC_OPEN_FD('${activeCustomerId}', '${accountId}', ${P}, ${R}, ${M});`,
      `FD ${fdId} created. ₹${P} debited from ${accountId}.`
    );
    showToast(
      'success',
      'Fixed Deposit Opened',
      `FD ${fdId} for ₹${P.toLocaleString('en-IN')} is now ACTIVE.`
    );
  };

  const settleFixedDeposit = (fdId, mode) => {
    // mode: 'EARLY' (returns only principal) | 'MATURE' (returns principal + simple interest)
    const fd = db.FIXED_DEPOSIT.find((f) => f.fd_id === fdId);
    if (!fd || fd.status !== 'ACTIVE') return;

    const acc = db.ACCOUNT.find((a) => a.account_id === fd.account_id);
    if (!acc || acc.status !== 'ACTIVE') {
      showToast(
        'error',
        'ORA-20002: Linked Account Frozen/Closed',
        `Cannot credit proceeds to ${fd.account_id} because it is ${acc?.status}.`
      );
      return;
    }

    const interest =
      mode === 'MATURE' ? Math.round(fd.principal * (fd.rate / 100) * (fd.months / 12)) : 0;
    const payout = fd.principal + interest;
    const oldBal = acc.balance;
    const newBal = oldBal + payout;
    const newStatus = mode === 'MATURE' ? 'MATURED' : 'CLOSED_EARLY';
    const timestamp = nowTimestamp();

    setDb((prev) => ({
      ...prev,
      FIXED_DEPOSIT: prev.FIXED_DEPOSIT.map((f) =>
        f.fd_id === fdId ? { ...f, status: newStatus } : f
      ),
      ACCOUNT: prev.ACCOUNT.map((a) =>
        a.account_id === acc.account_id ? { ...a, balance: newBal } : a
      ),
      TRANSACTIONS: [
        {
          txn_id: 'TXN' + Math.floor(1000 + Math.random() * 9000),
          account_id: acc.account_id,
          txn_type: 'FD_CLOSE',
          amount: payout,
          txn_date: timestamp,
          description:
            mode === 'MATURE'
              ? `FD ${fdId} Matured (Principal ₹${fd.principal} + Interest ₹${interest})`
              : `FD ${fdId} Closed Early (Principal ₹${fd.principal} only, ₹0 interest)`,
        },
        ...prev.TRANSACTIONS,
      ],
      AUDIT_LOG: [
        {
          log_id: 'AUD' + Math.floor(1000 + Math.random() * 9000),
          account_id: acc.account_id,
          old_balance: oldBal,
          new_balance: newBal,
          changed_on: timestamp,
          trigger_source: `TRG_ACCOUNT_AUDIT (FD_${newStatus} ${fdId})`,
        },
        ...prev.AUDIT_LOG,
      ],
    }));

    pushSqlLog(
      'COMMIT',
      'PRC_CLOSE_FD',
      `EXEC PRC_CLOSE_FD('${fdId}', '${mode}');`,
      `FD ${fdId} marked ${newStatus}. Payout ₹${payout} (Interest: ₹${interest}) credited to ${acc.account_id}.`
    );
    showToast(
      'success',
      `FD ${newStatus}`,
      `₹${payout.toLocaleString('en-IN')} credited to ${acc.account_id} (${mode === 'EARLY' ? 'Early closure: Principal only' : `Includes ₹${interest} interest`}).`
    );
  };

  // ============================================================================
  // DERIVED DATA FOR ACTIVE CUSTOMER
  // ============================================================================
  const activeCustomer = useMemo(
    () => db.CUSTOMER.find((c) => c.customer_id === activeCustomerId) || db.CUSTOMER[0],
    [db.CUSTOMER, activeCustomerId]
  );

  const customerAccounts = useMemo(() => {
    const links = db.ACCOUNT_HOLDER.filter((ah) => ah.customer_id === activeCustomerId);
    return links.map((link) => {
      const acc = db.ACCOUNT.find((a) => a.account_id === link.account_id);
      const branch = db.BRANCH.find((b) => b.branch_id === acc?.branch_id);
      const allHolders = db.ACCOUNT_HOLDER.filter((h) => h.account_id === link.account_id).map(
        (h) => {
          const c = db.CUSTOMER.find((cust) => cust.customer_id === h.customer_id);
          return { ...h, name: c?.name };
        }
      );
      return { ...acc, holder_role: link.holder_role, branch, allHolders };
    });
  }, [db, activeCustomerId]);

  const customerLoans = useMemo(() => {
    const links = db.LOAN_BORROWER.filter((lb) => lb.customer_id === activeCustomerId);
    return links.map((link) => {
      const loan = db.LOAN.find((l) => l.loan_id === link.loan_id);
      const payments = db.LOAN_PAYMENT.filter((p) => p.loan_id === link.loan_id);
      const borrowers = db.LOAN_BORROWER.filter((b) => b.loan_id === link.loan_id).map((b) => {
        const c = db.CUSTOMER.find((cust) => cust.customer_id === b.customer_id);
        return { ...b, name: c?.name };
      });
      return { ...loan, my_role: link.role, payments, borrowers };
    });
  }, [db, activeCustomerId]);

  // ============================================================================
  // SUB-COMPONENTS FOR PORTALS
  // ============================================================================

  // --- CUSTOMER PORTAL ---
  const CustomerPortal = () => {
    const [txnMode, setTxnMode] = useState('TRANSFER'); // 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER'
    const [selectedAcc, setSelectedAcc] = useState(customerAccounts[0]?.account_id || '');
    const [targetAcc, setTargetAcc] = useState('ACC2003');
    const [amount, setAmount] = useState('2500');
    const [remark, setRemark] = useState('Monthly Expense');

    // Loan Form State
    const [loanAcc, setLoanAcc] = useState(customerAccounts[0]?.account_id || '');
    const [loanPrincipal, setLoanPrincipal] = useState('100000');
    const [loanRate, setLoanRate] = useState('9.5');
    const [loanMonths, setLoanMonths] = useState('24');
    const [coBorrower, setCoBorrower] = useState('NONE');

    // FD Form State
    const [fdAcc, setFdAcc] = useState(customerAccounts[0]?.account_id || '');
    const [fdPrincipal, setFdPrincipal] = useState('15000');
    const [fdRate, setFdRate] = useState('7.5');
    const [fdMonths, setFdMonths] = useState('12');

    const previewEmi = calculateEmi(loanPrincipal, loanRate, loanMonths);

    const myAccountIds = customerAccounts.map((a) => a.account_id);
    const myTransactions = db.TRANSACTIONS.filter((t) => myAccountIds.includes(t.account_id));
    const myAuditLogs = db.AUDIT_LOG.filter((a) => myAccountIds.includes(a.account_id));
    const myFds = db.FIXED_DEPOSIT.filter((f) => f.customer_id === activeCustomerId);

    return (
      <div className="space-y-6">
        {/* Customer Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-200 bg-teal-50 text-lg font-bold text-teal-700">
              {activeCustomer.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">{activeCustomer.name}</h2>
                <span className="rounded bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-700">
                  {activeCustomer.customer_id}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {activeCustomer.email} • {activeCustomer.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Simulate Logged-in Customer:</span>
            <select
              value={activeCustomerId}
              onChange={(e) => setActiveCustomerId(e.target.value)}
              className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-teal-200 focus:outline-none"
            >
              {db.CUSTOMER.map((c) => (
                <option key={c.customer_id} value={c.customer_id}>
                  {c.name} ({c.customer_id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'ACCOUNTS', label: 'My Accounts & Cards', icon: Wallet },
            { id: 'MOVE_MONEY', label: 'Move Money (ACID & Triggers)', icon: ArrowLeftRight },
            { id: 'TRANSACTIONS', label: 'Transactions', icon: FileText },
            { id: 'LOANS', label: 'Loans & EMIs (Joint Support)', icon: Landmark },
            { id: 'FD', label: 'Fixed Deposits', icon: PiggyBank },
            { id: 'AUDIT', label: 'My Audit Log', icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCustomerSubTab(tab.id)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${
                  customerSubTab === tab.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MY ACCOUNTS & CARDS */}
        {customerSubTab === 'ACCOUNTS' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {customerAccounts.map((acc) => (
                <div
                  key={acc.account_id}
                  className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-teal-700">
                          {acc.account_id}
                        </span>
                        <span className="rounded bg-slate-50 px-2 py-0.5 text-xs text-slate-700">
                          {acc.account_type}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-semibold ${
                            acc.holder_role === 'JOINT'
                              ? 'border border-amber-200 bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {acc.holder_role} HOLDER
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          acc.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {acc.status}
                      </span>
                    </div>

                    <div className="my-4">
                      <p className="text-xs text-slate-500">Available Balance</p>
                      <p className="mt-1 text-3xl font-bold text-slate-900">
                        ₹{acc.balance.toLocaleString('en-IN')}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Min. Required Balance: ₹500 (Enforced by TRG_MIN_BALANCE)
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 text-xs text-slate-500">
                    <div>
                      <span className="text-slate-500">Branch:</span> {acc.branch?.branch_name} (
                      {acc.branch?.ifsc_code})
                    </div>
                    <div>
                      <span className="text-slate-500">Holders:</span>{' '}
                      {acc.allHolders.map((h) => `${h.name} (${h.holder_role})`).join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Linked Cards */}
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
                <CreditCard className="h-4 w-4 text-teal-700" /> Issued Debit & Credit Cards
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {db.CARD.filter((c) => myAccountIds.includes(c.account_id)).map((card) => (
                  <div
                    key={card.card_id}
                    className="rounded-lg border border-slate-300 bg-gradient-to-br from-slate-50 to-white p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-700">{card.card_type} CARD</span>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-semibold ${
                          card.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {card.status}
                      </span>
                    </div>
                    <p className="my-2 font-mono text-base text-slate-900">{card.card_no}</p>
                    <div className="mt-3 flex justify-between text-xs text-slate-500">
                      <span>Linked: {card.account_id}</span>
                      <span>Exp: {card.expiry_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MOVE MONEY (DEPOSIT, WITHDRAW, ATOMIC TRANSFER & LIVE REVIEW DEMO BUTTONS) */}
        {customerSubTab === 'MOVE_MONEY' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-2">
              <div className="mb-6 flex gap-2">
                {['TRANSFER', 'DEPOSIT', 'WITHDRAW'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTxnMode(mode)}
                    className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition ${
                      txnMode === mode
                        ? 'bg-teal-700 text-white'
                        : 'bg-slate-50 text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {mode === 'TRANSFER' ? 'Atomic Transfer (PRC_TRANSFER_FUNDS)' : mode}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Select Your Account</label>
                  <select
                    value={selectedAcc}
                    onChange={(e) => setSelectedAcc(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900"
                  >
                    {customerAccounts.map((a) => (
                      <option key={a.account_id} value={a.account_id}>
                        {a.account_id} ({a.account_type} - {a.holder_role}) — Balance: ₹
                        {a.balance.toLocaleString('en-IN')} [{a.status}]
                      </option>
                    ))}
                  </select>
                </div>

                {txnMode === 'TRANSFER' && (
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Destination Account (Any Bank Account)
                    </label>
                    <select
                      value={targetAcc}
                      onChange={(e) => setTargetAcc(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900"
                    >
                      {db.ACCOUNT.map((a) => (
                        <option key={a.account_id} value={a.account_id}>
                          {a.account_id} ({a.account_type}) — Status: {a.status} — Current Bal: ₹
                          {a.balance.toLocaleString('en-IN')}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Amount (₹)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Description / Narration
                    </label>
                    <input
                      type="text"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (txnMode === 'DEPOSIT') executeDeposit(selectedAcc, amount, remark);
                    if (txnMode === 'WITHDRAW') executeWithdraw(selectedAcc, amount, remark);
                    if (txnMode === 'TRANSFER')
                      executeAtomicTransfer(selectedAcc, targetAcc, amount, remark);
                  }}
                  className="w-full rounded-md bg-teal-700 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-800"
                >
                  Execute {txnMode} in Oracle Engine
                </button>
              </div>
            </div>

            {/* One-Click Reviewer Test Scenarios */}
            <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5">
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-700">
                  <Play className="h-4 w-4" /> Live Review I Test Scenarios
                </h3>
                <p className="mb-4 text-xs text-slate-500">
                  Click any test case below to demonstrate Oracle constraints, triggers, and ACID
                  rollbacks live during your review:
                </p>

                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      const acc = db.ACCOUNT.find((a) => a.account_id === 'ACC2001');
                      if (acc)
                        executeWithdraw('ACC2001', acc.balance - 200, 'Test Below Rs 500 Trigger');
                    }}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 p-3 text-left text-xs transition hover:bg-slate-100"
                  >
                    <div className="font-semibold text-rose-700">
                      1. Trigger TRG_MIN_BALANCE Block
                    </div>
                    <div className="mt-0.5 text-slate-500">
                      Attempts withdrawal leaving ₹200 (&lt; ₹500 min). Raises ORA-20001.
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      executeAtomicTransfer(
                        'ACC2001',
                        'ACC2004',
                        2000,
                        'Transfer to Frozen Account Test'
                      );
                    }}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 p-3 text-left text-xs transition hover:bg-slate-100"
                  >
                    <div className="font-semibold text-amber-700">
                      2. Partial Transfer Atomic ROLLBACK
                    </div>
                    <div className="mt-0.5 text-slate-500">
                      Debits ACC2001, but credit to ACC2004 (FROZEN) fails. Reverts debit
                      automatically!
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      executeAtomicTransfer(
                        'ACC2001',
                        'ACC2001',
                        1000,
                        'Same Account Transfer Test'
                      );
                    }}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 p-3 text-left text-xs transition hover:bg-slate-100"
                  >
                    <div className="font-semibold text-teal-700">
                      3. Same-Account Transfer Constraint
                    </div>
                    <div className="mt-0.5 text-slate-500">
                      Attempts ACC2001 → ACC2001. Blocked with ORA-20003.
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      executeDeposit('ACC2001', 0, 'Zero Amount Test');
                    }}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 p-3 text-left text-xs transition hover:bg-slate-100"
                  >
                    <div className="font-semibold text-emerald-700">
                      4. Zero/Negative Amount CHECK
                    </div>
                    <div className="mt-0.5 text-slate-500">
                      Tests CHECK (amount &gt; 0) constraint with ₹0 deposit.
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSACTIONS HISTORY */}
        {customerSubTab === 'TRANSACTIONS' && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">
                TRANSACTIONS Table (Filtered for Your Accounts)
              </h3>
              <span className="text-xs text-slate-500">{myTransactions.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs text-slate-500">
                  <tr>
                    <th className="p-3">TXN_ID</th>
                    <th className="p-3">ACCOUNT_ID</th>
                    <th className="p-3">TXN_TYPE</th>
                    <th className="p-3">AMOUNT</th>
                    <th className="p-3">TXN_DATE</th>
                    <th className="p-3">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {myTransactions.map((t) => (
                    <tr key={t.txn_id} className="hover:bg-slate-100">
                      <td className="p-3 font-mono text-xs text-teal-700">{t.txn_id}</td>
                      <td className="p-3 font-mono text-xs text-slate-900">{t.account_id}</td>
                      <td className="p-3">
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-semibold ${
                            ['DEPOSIT', 'TRANSFER_IN', 'LOAN_DISBURSAL', 'FD_CLOSE'].includes(
                              t.txn_type
                            )
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {t.txn_type}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        ₹{t.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 font-mono text-xs text-slate-500">{t.txn_date}</td>
                      <td className="p-3 text-slate-700">{t.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LOANS & EMIs */}
        {customerSubTab === 'LOANS' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">
                My Active & Pending Loans (Single & Joint Co-Borrowed)
              </h3>
              {customerLoans.map((loan) => (
                <div key={loan.loan_id} className="rounded-lg border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-teal-700">{loan.loan_id}</span>
                      <span className="rounded bg-slate-50 px-2 py-0.5 text-xs text-slate-700">
                        Disbursal A/c: {loan.disbursed_account_id}
                      </span>
                      <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        My Role: {loan.my_role}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        loan.status === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {loan.status}
                    </span>
                  </div>

                  <div className="my-4 grid grid-cols-2 gap-4 rounded-md border border-slate-200 bg-slate-100 p-3 sm:grid-cols-4">
                    <div>
                      <p className="text-xs text-slate-500">Principal</p>
                      <p className="text-base font-bold text-slate-900">
                        ₹{loan.principal.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Interest Rate</p>
                      <p className="text-base font-bold text-slate-900">
                        {loan.interest_rate}% p.a.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Tenure</p>
                      <p className="text-base font-bold text-slate-900">
                        {loan.tenure_months} Months
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Monthly EMI (FN_CALC_EMI)</p>
                      <p className="text-base font-bold text-teal-700">
                        ₹{loan.emi_amount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                    <div>
                      Borrowers: {loan.borrowers.map((b) => `${b.name} (${b.role})`).join(', ')} •
                      Paid Instalments: {loan.payments.length}
                    </div>
                    {loan.status === 'APPROVED' && (
                      <button
                        onClick={() => payLoanEmi(loan.loan_id)}
                        className="rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white transition hover:bg-emerald-800"
                      >
                        Pay Monthly EMI (₹{loan.emi_amount.toLocaleString('en-IN')})
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Apply for Loan Form */}
            <div className="h-fit rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="mb-4 text-base font-semibold text-slate-900">Apply for New Loan</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="mb-1 block text-xs text-slate-500">
                    Disbursal & EMI Account
                  </label>
                  <select
                    value={loanAcc}
                    onChange={(e) => setLoanAcc(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  >
                    {customerAccounts.map((a) => (
                      <option key={a.account_id} value={a.account_id}>
                        {a.account_id} (₹{a.balance})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Principal Amount (₹)</label>
                  <input
                    type="number"
                    value={loanPrincipal}
                    onChange={(e) => setLoanPrincipal(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Rate (% p.a.)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={loanRate}
                      onChange={(e) => setLoanRate(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Tenure (Months)</label>
                    <input
                      type="number"
                      value={loanMonths}
                      onChange={(e) => setLoanMonths(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-500">
                    Optional Co-Borrower (LOAN_BORROWER M:N)
                  </label>
                  <select
                    value={coBorrower}
                    onChange={(e) => setCoBorrower(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  >
                    <option value="NONE">None (Single Borrower)</option>
                    {db.CUSTOMER.filter((c) => c.customer_id !== activeCustomerId).map((c) => (
                      <option key={c.customer_id} value={c.customer_id}>
                        {c.name} ({c.customer_id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-md border border-teal-200 bg-teal-50 p-3 text-xs">
                  <div className="font-semibold text-teal-700">FN_CALC_EMI Formula Preview:</div>
                  <div className="mt-0.5 text-lg font-bold text-slate-900">
                    ₹{previewEmi.toLocaleString('en-IN')} / month
                  </div>
                </div>

                <button
                  onClick={() =>
                    applyForLoan({
                      accountId: loanAcc,
                      principal: loanPrincipal,
                      rate: loanRate,
                      months: loanMonths,
                      coBorrowerId: coBorrower,
                    })
                  }
                  className="w-full rounded-md bg-teal-700 py-2.5 font-semibold text-white transition hover:bg-teal-800"
                >
                  Submit Loan Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FIXED DEPOSITS */}
        {customerSubTab === 'FD' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">My Fixed Deposits</h3>
              {myFds.map((fd) => {
                const maturityInterest = Math.round(
                  fd.principal * (fd.rate / 100) * (fd.months / 12)
                );
                return (
                  <div
                    key={fd.fd_id}
                    className="flex flex-col items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-700">{fd.fd_id}</span>
                        <span className="rounded bg-slate-50 px-2 py-0.5 text-xs text-slate-700">
                          Linked: {fd.account_id}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-semibold ${
                            fd.status === 'ACTIVE'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {fd.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xl font-bold text-slate-900">
                        ₹{fd.principal.toLocaleString('en-IN')}{' '}
                        <span className="text-sm font-normal text-slate-500">
                          @ {fd.rate}% for {fd.months} months
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Early Closure Payout: ₹{fd.principal.toLocaleString('en-IN')} (Principal
                        only) • Maturity Payout: ₹
                        {(fd.principal + maturityInterest).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {fd.status === 'ACTIVE' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => settleFixedDeposit(fd.fd_id, 'EARLY')}
                          className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-50"
                        >
                          Close Early (Principal Only)
                        </button>
                        <button
                          onClick={() => settleFixedDeposit(fd.fd_id, 'MATURE')}
                          className="rounded-md bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800"
                        >
                          Simulate Maturity (+₹{maturityInterest})
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="h-fit rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="mb-4 text-base font-semibold text-slate-900">Open Fixed Deposit</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Debit from Account</label>
                  <select
                    value={fdAcc}
                    onChange={(e) => setFdAcc(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  >
                    {customerAccounts.map((a) => (
                      <option key={a.account_id} value={a.account_id}>
                        {a.account_id} (₹{a.balance})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-500">Principal (₹)</label>
                  <input
                    type="number"
                    value={fdPrincipal}
                    onChange={(e) => setFdPrincipal(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Rate (% p.a.)</label>
                    <input
                      type="number"
                      step="0.25"
                      value={fdRate}
                      onChange={(e) => setFdRate(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Months</label>
                    <input
                      type="number"
                      value={fdMonths}
                      onChange={(e) => setFdMonths(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>
                <button
                  onClick={() =>
                    openFixedDeposit({
                      accountId: fdAcc,
                      principalStr: fdPrincipal,
                      rateStr: fdRate,
                      monthsStr: fdMonths,
                    })
                  }
                  className="w-full rounded-md bg-teal-700 py-2.5 font-semibold text-white transition hover:bg-teal-800"
                >
                  Open FD Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOMER AUDIT LOG */}
        {customerSubTab === 'AUDIT' && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">
                Immutable Balance Audit Trail (AUDIT_LOG Table)
              </h3>
              <p className="text-xs text-slate-500">
                Populated automatically by Oracle trigger TRG_ACCOUNT_AUDIT on every balance update.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs text-slate-500">
                  <tr>
                    <th className="p-3">LOG_ID</th>
                    <th className="p-3">ACCOUNT_ID</th>
                    <th className="p-3">OLD_BALANCE</th>
                    <th className="p-3">NEW_BALANCE</th>
                    <th className="p-3">DELTA</th>
                    <th className="p-3">CHANGED_ON</th>
                    <th className="p-3">TRIGGER_SOURCE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {myAuditLogs.map((log) => {
                    const diff = log.new_balance - log.old_balance;
                    return (
                      <tr key={log.log_id} className="hover:bg-slate-100">
                        <td className="p-3 font-mono text-xs text-teal-700">{log.log_id}</td>
                        <td className="p-3 font-mono text-xs text-slate-900">{log.account_id}</td>
                        <td className="p-3 text-slate-700">
                          ₹{log.old_balance.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 font-semibold text-slate-900">
                          ₹{log.new_balance.toLocaleString('en-IN')}
                        </td>
                        <td
                          className={`p-3 font-mono text-xs font-bold ${diff >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}
                        >
                          {diff >= 0
                            ? `+₹${diff.toLocaleString('en-IN')}`
                            : `-₹${Math.abs(diff).toLocaleString('en-IN')}`}
                        </td>
                        <td className="p-3 font-mono text-xs text-slate-500">{log.changed_on}</td>
                        <td className="p-3 text-xs text-slate-700">{log.trigger_source}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- BANK STAFF PORTAL ---
  const StaffPortal = () => {
    // New Customer State
    const [custName, setCustName] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [custAddress, setCustAddress] = useState('');
    const [custDob, setCustDob] = useState('2000-01-15');

    // New Account State
    const [primaryCust, setPrimaryCust] = useState(db.CUSTOMER[0]?.customer_id || '');
    const [jointCust, setJointCust] = useState('NONE');
    const [branchId, setBranchId] = useState('BR01');
    const [accType, setAccType] = useState('SAVINGS');
    const [initDeposit, setInitDeposit] = useState('5000');

    // New Card State
    const [cardAccId, setCardAccId] = useState(db.ACCOUNT[0]?.account_id || '');
    const [cardType, setCardType] = useState('DEBIT');
    const [cardNo, setCardNo] = useState(
      '4532-' +
        Math.floor(1000 + Math.random() * 9000) +
        '-' +
        Math.floor(1000 + Math.random() * 9000) +
        '-9911'
    );

    const handleRegisterCustomer = () => {
      if (!custName.trim() || !custEmail.trim()) {
        showToast(
          'error',
          'ORA-01400: Cannot Insert NULL',
          'Customer Name and Email are NOT NULL columns.'
        );
        return;
      }
      const duplicate = db.CUSTOMER.some(
        (c) => c.email.toLowerCase() === custEmail.trim().toLowerCase()
      );
      if (duplicate) {
        pushSqlLog(
          'ROLLBACK',
          'INSERT_CUSTOMER',
          `INSERT INTO CUSTOMER (email, ...) VALUES ('${custEmail}', ...);`,
          'ORA-00001: unique constraint (SYS.UK_CUSTOMER_EMAIL) violated'
        );
        showToast(
          'error',
          'ORA-00001: Unique Constraint Violated',
          `Email '${custEmail}' already exists in CUSTOMER table.`
        );
        return;
      }

      const newId = 'CUST' + (101 + db.CUSTOMER.length);
      const today = new Date().toISOString().split('T')[0];

      setDb((prev) => ({
        ...prev,
        CUSTOMER: [
          ...prev.CUSTOMER,
          {
            customer_id: newId,
            name: custName,
            email: custEmail,
            phone: custPhone || '9000000000',
            address: custAddress || 'Vellore',
            dob: custDob,
            created_date: today,
          },
        ],
      }));

      pushSqlLog(
        'COMMIT',
        'INSERT_CUSTOMER',
        `INSERT INTO CUSTOMER VALUES ('${newId}', '${custName}', '${custEmail}', ...);`,
        `Customer ${newId} registered.`
      );
      showToast(
        'success',
        'Customer Registered',
        `${custName} (${newId}) added to CUSTOMER table.`
      );
      setCustName('');
      setCustEmail('');
    };

    const handleOpenAccount = () => {
      const bal = Number(initDeposit);
      if (bal < 500) {
        showToast(
          'error',
          'ORA-20001: Minimum Opening Balance',
          'Initial deposit must be at least ₹500.'
        );
        return;
      }
      const accId = 'ACC' + (2001 + db.ACCOUNT.length);
      const today = new Date().toISOString().split('T')[0];
      const timestamp = nowTimestamp();

      const holders = [{ account_id: accId, customer_id: primaryCust, holder_role: 'PRIMARY' }];
      if (jointCust !== 'NONE' && jointCust !== primaryCust) {
        holders.push({ account_id: accId, customer_id: jointCust, holder_role: 'JOINT' });
      }

      setDb((prev) => ({
        ...prev,
        ACCOUNT: [
          ...prev.ACCOUNT,
          {
            account_id: accId,
            branch_id: branchId,
            account_type: accType,
            balance: bal,
            status: 'ACTIVE',
            open_date: today,
          },
        ],
        ACCOUNT_HOLDER: [...prev.ACCOUNT_HOLDER, ...holders],
        TRANSACTIONS: [
          {
            txn_id: 'TXN' + Math.floor(1000 + Math.random() * 9000),
            account_id: accId,
            txn_type: 'DEPOSIT',
            amount: bal,
            txn_date: timestamp,
            description: 'Account Opening Deposit',
          },
          ...prev.TRANSACTIONS,
        ],
        AUDIT_LOG: [
          {
            log_id: 'AUD' + Math.floor(1000 + Math.random() * 9000),
            account_id: accId,
            old_balance: 0,
            new_balance: bal,
            changed_on: timestamp,
            trigger_source: 'TRG_ACCOUNT_AUDIT (OPEN_ACCOUNT)',
          },
          ...prev.AUDIT_LOG,
        ],
      }));

      pushSqlLog(
        'COMMIT',
        'PRC_OPEN_ACCOUNT',
        `INSERT INTO ACCOUNT VALUES ('${accId}', '${branchId}', '${accType}', ${bal}, 'ACTIVE', SYSDATE);`,
        `Account ${accId} opened (${holders.length > 1 ? 'Joint Account' : 'Single Holder'}).`
      );
      showToast(
        'success',
        'Account Opened',
        `Account ${accId} created with ₹${bal.toLocaleString('en-IN')}.`
      );
    };

    const toggleAccountStatus = (accId, newStatus) => {
      setDb((prev) => ({
        ...prev,
        ACCOUNT: prev.ACCOUNT.map((a) =>
          a.account_id === accId ? { ...a, status: newStatus } : a
        ),
      }));
      pushSqlLog(
        'COMMIT',
        'UPDATE_ACCOUNT_STATUS',
        `UPDATE ACCOUNT SET status = '${newStatus}' WHERE account_id = '${accId}';`,
        `Account ${accId} status changed to ${newStatus}.`
      );
      showToast('success', 'Account Status Updated', `Account ${accId} is now ${newStatus}.`);
    };

    const handleIssueCard = () => {
      if (db.CARD.some((c) => c.card_no === cardNo.trim())) {
        pushSqlLog(
          'ROLLBACK',
          'INSERT_CARD',
          `INSERT INTO CARD ... card_no = '${cardNo}'`,
          'ORA-00001: unique constraint (UK_CARD_NO) violated'
        );
        showToast('error', 'ORA-00001: Duplicate Card Number', 'Card number must be UNIQUE.');
        return;
      }
      const cardId = 'CRD' + (701 + db.CARD.length);
      setDb((prev) => ({
        ...prev,
        CARD: [
          ...prev.CARD,
          {
            card_id: cardId,
            account_id: cardAccId,
            card_no: cardNo,
            card_type: cardType,
            expiry_date: '12/30',
            status: 'ACTIVE',
          },
        ],
      }));
      pushSqlLog(
        'COMMIT',
        'INSERT_CARD',
        `INSERT INTO CARD VALUES ('${cardId}', '${cardAccId}', '${cardNo}', '${cardType}', '12/30', 'ACTIVE');`,
        `Card ${cardId} issued.`
      );
      showToast('success', 'Card Issued', `${cardType} card ${cardId} linked to ${cardAccId}.`);
    };

    const toggleCardStatus = (cardId) => {
      setDb((prev) => ({
        ...prev,
        CARD: prev.CARD.map((c) =>
          c.card_id === cardId ? { ...c, status: c.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' } : c
        ),
      }));
      showToast('success', 'Card Status Toggled', `Updated status for card ${cardId}.`);
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'CUSTOMERS_ACCOUNTS', label: 'Register Customers & Open Accounts' },
            { id: 'CARDS', label: 'Issue & Block Cards' },
            { id: 'LOAN_APPROVALS', label: 'Loan Approvals & Disbursal' },
            { id: 'AUDIT', label: 'Global Audit Trail' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setStaffSubTab(t.id)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                staffSubTab === t.id
                  ? 'bg-teal-700 text-white'
                  : 'bg-white text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {staffSubTab === 'CUSTOMERS_ACCOUNTS' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Register Customer */}
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">
                    1. Register Customer (CUSTOMER Table)
                  </h3>
                  <button
                    onClick={() => setCustEmail('aarav.sharma@vit.ac.in')}
                    className="rounded border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-50"
                  >
                    Test Duplicate Email (ORA-00001)
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <input
                    placeholder="Full Name *"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  />
                  <input
                    placeholder="Email Address (UNIQUE) *"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  />
                  <input
                    placeholder="Phone Number"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  />
                  <input
                    type="date"
                    value={custDob}
                    onChange={(e) => setCustDob(e.target.value)}
                    className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                  />
                </div>
                <button
                  onClick={handleRegisterCustomer}
                  className="mt-4 w-full rounded-md bg-teal-700 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  Insert into CUSTOMER
                </button>
              </div>

              {/* Open Account with Joint Holder Support */}
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="mb-4 font-semibold text-slate-900">
                  2. Open Bank Account (Supports Joint Holders)
                </h3>
                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Primary Holder</label>
                    <select
                      value={primaryCust}
                      onChange={(e) => setPrimaryCust(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                    >
                      {db.CUSTOMER.map((c) => (
                        <option key={c.customer_id} value={c.customer_id}>
                          {c.name} ({c.customer_id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Joint Holder (ACCOUNT_HOLDER)
                    </label>
                    <select
                      value={jointCust}
                      onChange={(e) => setJointCust(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                    >
                      <option value="NONE">None (Single Account)</option>
                      {db.CUSTOMER.filter((c) => c.customer_id !== primaryCust).map((c) => (
                        <option key={c.customer_id} value={c.customer_id}>
                          {c.name} ({c.customer_id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Branch</label>
                    <select
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                    >
                      {db.BRANCH.map((b) => (
                        <option key={b.branch_id} value={b.branch_id}>
                          {b.branch_name} ({b.ifsc_code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">Initial Deposit (₹)</label>
                    <input
                      type="number"
                      value={initDeposit}
                      onChange={(e) => setInitDeposit(e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>
                <button
                  onClick={handleOpenAccount}
                  className="mt-4 w-full rounded-md bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Open Account & Link Holders
                </button>
              </div>
            </div>

            {/* All Accounts Management Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="border-b border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">
                  All Accounts — Freeze / Activate / Close Controls
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-xs text-slate-500">
                    <tr>
                      <th className="p-3">ACCOUNT_ID</th>
                      <th className="p-3">BRANCH</th>
                      <th className="p-3">HOLDERS (M:N)</th>
                      <th className="p-3">TYPE</th>
                      <th className="p-3">BALANCE</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3">STAFF ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {db.ACCOUNT.map((acc) => {
                      const holders = db.ACCOUNT_HOLDER.filter(
                        (h) => h.account_id === acc.account_id
                      ).map((h) => {
                        const c = db.CUSTOMER.find((cu) => cu.customer_id === h.customer_id);
                        return `${c?.name} (${h.holder_role})`;
                      });
                      return (
                        <tr key={acc.account_id}>
                          <td className="p-3 font-mono font-bold text-teal-700">
                            {acc.account_id}
                          </td>
                          <td className="p-3 text-xs text-slate-700">{acc.branch_id}</td>
                          <td className="p-3 text-xs text-slate-700">{holders.join(', ')}</td>
                          <td className="p-3 text-xs">{acc.account_type}</td>
                          <td className="p-3 font-semibold text-slate-900">
                            ₹{acc.balance.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3">
                            <span
                              className={`rounded px-2 py-0.5 text-xs font-semibold ${
                                acc.status === 'ACTIVE'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {acc.status}
                            </span>
                          </td>
                          <td className="flex gap-2 p-3">
                            {acc.status !== 'ACTIVE' && (
                              <button
                                onClick={() => toggleAccountStatus(acc.account_id, 'ACTIVE')}
                                className="rounded bg-emerald-700 px-2.5 py-1 text-xs text-white"
                              >
                                Activate
                              </button>
                            )}
                            {acc.status !== 'FROZEN' && (
                              <button
                                onClick={() => toggleAccountStatus(acc.account_id, 'FROZEN')}
                                className="rounded bg-amber-700 px-2.5 py-1 text-xs text-white"
                              >
                                Freeze
                              </button>
                            )}
                            {acc.status !== 'CLOSED' && (
                              <button
                                onClick={() => toggleAccountStatus(acc.account_id, 'CLOSED')}
                                className="rounded bg-rose-700 px-2.5 py-1 text-xs text-white"
                              >
                                Close
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {staffSubTab === 'CARDS' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="h-fit space-y-3 rounded-lg border border-slate-200 bg-white p-5 text-sm">
              <h3 className="text-base font-semibold text-slate-900">Issue New Card</h3>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Account</label>
                <select
                  value={cardAccId}
                  onChange={(e) => setCardAccId(e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                >
                  {db.ACCOUNT.map((a) => (
                    <option key={a.account_id} value={a.account_id}>
                      {a.account_id}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Card Type</label>
                <select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                >
                  <option value="DEBIT">DEBIT</option>
                  <option value="CREDIT">CREDIT</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">
                  16-Digit Card Number (UNIQUE)
                </label>
                <input
                  value={cardNo}
                  onChange={(e) => setCardNo(e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-slate-900"
                />
              </div>
              <button
                onClick={handleIssueCard}
                className="w-full rounded-md bg-teal-700 py-2.5 font-semibold text-white hover:bg-teal-800"
              >
                Issue Card
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 lg:col-span-2">
              <h3 className="mb-4 font-semibold text-slate-900">Issued Cards Directory</h3>
              <div className="space-y-3">
                {db.CARD.map((c) => (
                  <div
                    key={c.card_id}
                    className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-100 p-3"
                  >
                    <div>
                      <span className="mr-2 font-mono font-bold text-teal-700">{c.card_id}</span>
                      <span className="font-mono text-slate-900">{c.card_no}</span>
                      <span className="ml-3 text-xs text-slate-500">
                        ({c.card_type} • Linked: {c.account_id})
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-semibold ${c.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
                      >
                        {c.status}
                      </span>
                      <button
                        onClick={() => toggleCardStatus(c.card_id)}
                        className="rounded bg-slate-50 px-3 py-1.5 text-xs text-slate-900 hover:bg-slate-100"
                      >
                        {c.status === 'ACTIVE' ? 'Block Card' : 'Unblock Card'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {staffSubTab === 'LOAN_APPROVALS' && (
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="mb-2 font-semibold text-slate-900">
              Loan Queue (Approving automatically credits Principal to Disbursal Account)
            </h3>
            <div className="mt-4 space-y-3">
              {db.LOAN.map((loan) => {
                const borrowers = db.LOAN_BORROWER.filter((b) => b.loan_id === loan.loan_id).map(
                  (b) => {
                    const c = db.CUSTOMER.find((cu) => cu.customer_id === b.customer_id);
                    return `${c?.name} (${b.role})`;
                  }
                );
                return (
                  <div
                    key={loan.loan_id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-100 p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-700">{loan.loan_id}</span>
                        <span className="text-xs text-slate-500">
                          Disbursal Account: {loan.disbursed_account_id}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-semibold ${loan.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
                        >
                          {loan.status}
                        </span>
                      </div>
                      <p className="mt-1 font-bold text-slate-900">
                        Principal: ₹{loan.principal.toLocaleString('en-IN')} • {loan.interest_rate}%
                        • {loan.tenure_months}m (EMI: ₹{loan.emi_amount.toLocaleString('en-IN')})
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Borrowers: {borrowers.join(', ')}
                      </p>
                    </div>
                    {loan.status === 'PENDING' && (
                      <button
                        onClick={() => approveLoan(loan.loan_id)}
                        className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                      >
                        Approve & Disburse ₹{loan.principal.toLocaleString('en-IN')}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {staffSubTab === 'AUDIT' && (
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="mb-3 font-semibold text-slate-900">
              Complete System Audit Trail ({db.AUDIT_LOG.length} rows)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs text-slate-500">
                  <tr>
                    <th className="p-3">LOG_ID</th>
                    <th className="p-3">ACCOUNT_ID</th>
                    <th className="p-3">OLD_BALANCE</th>
                    <th className="p-3">NEW_BALANCE</th>
                    <th className="p-3">CHANGED_ON</th>
                    <th className="p-3">TRIGGER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {db.AUDIT_LOG.map((log) => (
                    <tr key={log.log_id}>
                      <td className="p-3 font-mono text-xs text-teal-700">{log.log_id}</td>
                      <td className="p-3 font-mono text-xs text-slate-900">{log.account_id}</td>
                      <td className="p-3 text-slate-500">
                        ₹{log.old_balance.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        ₹{log.new_balance.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 font-mono text-xs text-slate-500">{log.changed_on}</td>
                      <td className="p-3 text-xs text-slate-700">{log.trigger_source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- BRANCH MANAGER PORTAL (REPORTS & 3NF INSPECTOR) ---
  const ManagerPortal = () => {
    const branchReport = db.BRANCH.map((b) => {
      const accs = db.ACCOUNT.filter((a) => a.branch_id === b.branch_id);
      const totalBal = accs.reduce((sum, a) => sum + a.balance, 0);
      return { ...b, accountCount: accs.length, totalBalance: totalBal };
    });

    const topCustomers = db.CUSTOMER.map((c) => {
      const accIds = db.ACCOUNT_HOLDER.filter((ah) => ah.customer_id === c.customer_id).map(
        (ah) => ah.account_id
      );
      const totalBal = db.ACCOUNT.filter((a) => accIds.includes(a.account_id)).reduce(
        (s, a) => s + a.balance,
        0
      );
      return { ...c, accountCount: accIds.length, totalBalance: totalBal };
    }).sort((a, b) => b.totalBalance - a.totalBalance);

    return (
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setManagerSubTab('REPORTS')}
            className={`rounded-md px-4 py-2 text-sm font-medium ${managerSubTab === 'REPORTS' ? 'bg-teal-700 text-white' : 'bg-white text-slate-500'}`}
          >
            Management Analytical Reports
          </button>
          <button
            onClick={() => setManagerSubTab('SCHEMA')}
            className={`rounded-md px-4 py-2 text-sm font-medium ${managerSubTab === 'SCHEMA' ? 'bg-teal-700 text-white' : 'bg-white text-slate-500'}`}
          >
            3NF Relational Tables Inspector (11 Entities)
          </button>
        </div>

        {managerSubTab === 'REPORTS' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Report 1: Branch-wise Totals */}
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="mb-1 font-semibold text-slate-900">1. Branch-wise Totals Report</h3>
              <p className="mb-4 text-xs text-slate-500">
                GROUP BY branch_id with COUNT(account_id) and SUM(balance)
              </p>
              <div className="space-y-3">
                {branchReport.map((b) => (
                  <div
                    key={b.branch_id}
                    className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-100 p-3.5"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{b.branch_name}</p>
                      <p className="font-mono text-xs text-slate-500">
                        {b.branch_id} • IFSC: {b.ifsc_code} • {b.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-700">
                        ₹{b.totalBalance.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-slate-500">{b.accountCount} Accounts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report 2: Top Customers by Balance */}
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="mb-1 font-semibold text-slate-900">
                2. Top Customers by Combined Balance
              </h3>
              <p className="mb-4 text-xs text-slate-500">
                Aggregated across Primary and Joint accounts
              </p>
              <div className="space-y-3">
                {topCustomers.map((c, idx) => (
                  <div
                    key={c.customer_id}
                    className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-100 p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                        #{idx + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-500">
                          {c.email} ({c.accountCount} linked accounts)
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      ₹{c.totalBalance.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Report 3: Active / Overdue Loans & Instalments */}
            <div className="rounded-lg border border-slate-200 bg-white p-5 lg:col-span-2">
              <h3 className="mb-3 font-semibold text-slate-900">
                3. Loan Portfolio & Instalment Tracking (LOAN + LOAN_PAYMENT)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-xs text-slate-500">
                    <tr>
                      <th className="p-3">LOAN_ID</th>
                      <th className="p-3">BORROWERS</th>
                      <th className="p-3">PRINCIPAL</th>
                      <th className="p-3">MONTHLY EMI</th>
                      <th className="p-3">EMIs PAID</th>
                      <th className="p-3">REMAINING TENURE</th>
                      <th className="p-3">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {db.LOAN.map((l) => {
                      const paidCount = db.LOAN_PAYMENT.filter(
                        (p) => p.loan_id === l.loan_id
                      ).length;
                      const bNames = db.LOAN_BORROWER.filter((b) => b.loan_id === l.loan_id).map(
                        (b) => {
                          const c = db.CUSTOMER.find((cu) => cu.customer_id === b.customer_id);
                          return `${c?.name} (${b.role})`;
                        }
                      );
                      return (
                        <tr key={l.loan_id}>
                          <td className="p-3 font-mono font-bold text-teal-700">{l.loan_id}</td>
                          <td className="p-3 text-xs text-slate-700">{bNames.join(', ')}</td>
                          <td className="p-3 font-semibold text-slate-900">
                            ₹{l.principal.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3 text-teal-700">
                            ₹{l.emi_amount.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3 font-semibold text-emerald-700">{paidCount} paid</td>
                          <td className="p-3 text-slate-500">
                            {l.tenure_months - paidCount} months left
                          </td>
                          <td className="p-3">
                            <span className="rounded bg-slate-50 px-2 py-0.5 text-xs text-slate-800">
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {managerSubTab === 'SCHEMA' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(db).map(([tableName, rows]) => (
              <div key={tableName} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-teal-700">{tableName}</span>
                  <span className="rounded bg-slate-50 px-2 py-0.5 text-xs text-slate-700">
                    {rows.length} rows
                  </span>
                </div>
                <p className="mb-3 font-mono text-xs text-slate-500">
                  Columns: {rows[0] ? Object.keys(rows[0]).join(', ') : 'Empty'}
                </p>
                <div className="max-h-40 space-y-1 overflow-y-auto rounded border border-slate-200 bg-slate-100 p-2.5 font-mono text-xs text-slate-700">
                  {rows.slice(0, 4).map((r, i) => (
                    <div key={i} className="truncate">
                      {JSON.stringify(r)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ROLES = [
    { id: 'CUSTOMER', label: 'Customer portal', icon: Users },
    { id: 'STAFF', label: 'Bank staff', icon: UserCheck },
    { id: 'MANAGER', label: 'Branch manager', icon: TrendingUp },
  ];

  const resetDatabase = () => {
    setDb(INITIAL_DB);
    showToast('success', 'Database reset', 'Restored the initial 3NF seed data.');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 md:flex-row">
      <style>{GLOBAL_CSS}</style>

      {/* SIDEBAR */}
      <aside className="flex shrink-0 flex-col gap-4 bg-slate-900 px-4 py-4 text-slate-100 md:min-h-screen md:w-64 md:gap-8 md:px-5 md:py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-600 text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Banking Management System</h1>
            <p className="text-xs text-slate-400">BCSE302L · Oracle · 3NF</p>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto md:flex-col" aria-label="Portals">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const active = activeRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-teal-300' : 'text-slate-400'}`} />
                {role.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto hidden space-y-3 text-xs leading-relaxed text-slate-400 md:block">
          <p>
            Procedures, the minimum balance trigger and the audit trigger run live. Every statement
            appears in the console below.
          </p>
          <button
            onClick={resetDatabase}
            className="flex items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-slate-200 transition hover:bg-white/5"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reset demo data
          </button>
        </div>
      </aside>

      {/* WORKSPACE */}
      <div className="flex min-w-0 flex-1 flex-col">
        {notification && (
          <div className="sticky top-0 z-30 px-4 pt-4 md:px-8">
            <div
              role="status"
              className={`mx-auto flex max-w-6xl items-start justify-between gap-3 rounded-md border p-4 shadow-sm ${
                notification.type === 'error'
                  ? 'border-rose-200 bg-rose-50 text-rose-900'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-900'
              }`}
            >
              <div className="flex items-start gap-3">
                {notification.type === 'error' ? (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                )}
                <div>
                  <p className="text-sm font-semibold">{notification.title}</p>
                  <p className="mt-0.5 text-sm opacity-90">{notification.message}</p>
                </div>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-sm font-medium opacity-70 hover:opacity-100"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">
          {activeRole === 'CUSTOMER' && <CustomerPortal />}
          {activeRole === 'STAFF' && <StaffPortal />}
          {activeRole === 'MANAGER' && <ManagerPortal />}
        </main>

        {/* ORACLE CONSOLE */}
        <section className="border-t border-slate-800 bg-slate-900 text-slate-100">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-teal-300" />
                <span className="text-sm font-semibold">Oracle console</span>
                <span className="text-xs text-slate-400">{sqlLogs.length} statements executed</span>
              </div>
              <div className="flex items-center gap-4 md:hidden">
                <button onClick={resetDatabase} className="text-xs text-slate-300 hover:text-white">
                  Reset demo data
                </button>
              </div>
              <button
                onClick={() => setShowSqlDrawer(!showSqlDrawer)}
                className="text-xs font-semibold text-teal-300 hover:text-teal-200"
              >
                {showSqlDrawer ? 'Hide console' : 'Show console'}
              </button>
            </div>

            {showSqlDrawer && (
              <div className="max-h-56 space-y-2 overflow-y-auto pb-4 font-mono text-xs">
                {sqlLogs.map((log) => (
                  <div key={log.id} className="rounded-md border border-slate-700 bg-slate-950 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          log.status === 'COMMIT'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {log.status}
                      </span>
                      <span className="font-semibold text-teal-300">{log.proc}</span>
                      <span className="text-slate-500">{log.time}</span>
                    </div>
                    <p className="mt-1.5 whitespace-pre-wrap text-slate-200">{log.sql}</p>
                    <p className="mt-1 text-[11px] text-slate-400">↳ {log.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
