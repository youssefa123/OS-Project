var TSOS;
(function (TSOS) {
    class PCB {
        constructor(pid, base, limit, Prioty, IR, PC, ACC, Xreg, Yreg, Zflag) {
            this.pid = pid;
            this.base = base;
            this.limit = limit;
            this.Prioty = Prioty;
            this.IR = IR;
            this.PC = PC;
            this.ACC = ACC;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
        }
    }
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map