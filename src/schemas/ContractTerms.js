class Payment {
    constructor (onAccepted, onFulfilled) {
        this.onAccepted = onAccepted;
        this.onFulfilled = onFulfilled;
    }
}

class ContractTerms {
    constructor(deadline, payment, deliver) {
        this.deadline = deadline;
        this.payment = payment;
        this.deliver = deliver;
    }
}