class Contract {
    constructor (id, factionSymbol, type, terms, accepted, fulfilled, expiration, deadlineToAccept) {
        this.id = id;
        this.factionSymbol = factionSymbol;
        this.type = type;
        this.terms = terms;
        this.accepted = accepted;
        this.fulfilled = fulfilled;
        this.expiration = expiration;
        this.deadlineToAccept = deadlineToAccept;
    }
}