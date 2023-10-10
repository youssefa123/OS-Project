var TSOS;
(function (TSOS) {
    class PCB {
        constructor(pid, priority = 0) {
            this.PC = 0; // Program counter
            this.instructionRegister = 0;
            this.Acc = 0; // Accumulator
            this.Xreg = 0; // X register
            this.Yreg = 0; // Y register
            this.Zflag = 0; // Z flag
            this.id = pid;
            this.memorySegment = 0; //Assign the memory segment
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.instructionRegister = 0;
            this.priority = priority;
            this.state = ProcessState.RESIDENT;
            //PCB added onto table 
            this.updateProcessInTable();
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
            // If the row doesn't exist, create one
            if (!targetRow) {
                targetRow = tableBody.insertRow();
                for (let i = 0; i < 10; i++) {
                    targetRow.insertCell(i);
                }
            }
            // Update the row cells with PCB's details.
            targetRow.cells[0].textContent = this.id.toString();
            targetRow.cells[1].textContent = this.PC.toString();
            targetRow.cells[2].textContent = this.instructionRegister.toString();
            targetRow.cells[3].textContent = this.Acc.toString();
            targetRow.cells[4].textContent = this.Xreg.toString();
            targetRow.cells[5].textContent = this.Yreg.toString();
            targetRow.cells[6].textContent = this.Zflag.toString();
            targetRow.cells[8].textContent = this.state.toString();
            targetRow.cells[7].textContent = this.priority.toString();
            targetRow.cells[9].textContent = "Memory"; // all processes are in memory for now.
        }
    }
    TSOS.PCB = PCB;
    // Added a Enum for process states
    let ProcessState;
    (function (ProcessState) {
        ProcessState["RESIDENT"] = "Resident";
        ProcessState["RUNNING"] = "running";
        ProcessState["WAITING"] = "waiting";
        ProcessState["TERMINATED"] = "terminated";
    })(ProcessState = TSOS.ProcessState || (TSOS.ProcessState = {}));
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map