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
            this.id = pcb.currentPID++; // initialize  the memory Segment
            this.memorySegment = segment; // Assign the memory segment
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.instructionRegister = 0;
            this.state = ProcessState.READY;
        }
        updateProcessInTable() {
            const tableBody = document.getElementById("processTable").getElementsByTagName('tbody')[0];
            let targetRow;
            // Look for the row with the PCB's PID, and loop through the table rows to find the row 
            for (let i = 0; i < tableBody.rows.length; i++) {
                const row = tableBody.rows[i];
                if (row.cells[0].textContent === this.id.toString()) {
                    targetRow = row;
                    break;
                }
            }
        }
    }
    pcb.currentPID = 0; //Current state that were in 
    TSOS.pcb = pcb;
    // Added a Enum for process states
    let ProcessState;
    (function (ProcessState) {
        ProcessState["READY"] = "ready";
        ProcessState["RUNNING"] = "running";
        ProcessState["WAITING"] = "waiting";
        ProcessState["TERMINATED"] = "terminated";
    })(ProcessState = TSOS.ProcessState || (TSOS.ProcessState = {}));
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map