var TSOS;
(function (TSOS) {
    class pcb {
        constructor(segment) {
            this.PC = 0; // Program counter
            this.instructionRegister = 0;
            this.Acc = 0; // Accumulator
            this.Xreg = 0; // X register
            this.Yreg = 0; // Y register
            this.Zflag = 0; // Z flag
            this.id = pcb.currentPID++; // assigninging the  next available PID
            //cpu variables initalized
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.instructionRegister = 0;
            //mem segment 
        }
    }
    pcb.currentPID = 0; //Current state that were in 
    TSOS.pcb = pcb;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map