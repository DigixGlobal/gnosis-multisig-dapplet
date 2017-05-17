# MultiSig Wallet Dapplet

```
- Deploy New
- Config Existing
x Create Transaction `submitTransaction`
~ List View `getTransactionIds` & `transactions.call()`
  - Filter by Confirmed / Unconfirmed
~ Detail View
  ~ List Transaction Detail
  ~ List Confirmations `getConfirmations.call(transactionId)`
  ~ Confirm Transaction `confirmTransaction`
  ~ Revoke Confirmation `revokeConfirmation`
  ~ Re-Execute Transaction `executeTransaction`
~ Admin
  ~ Add User `replaceOwner`, `removeOwner`, `addOwner`
  - Requirement `changeRequirement`
```
