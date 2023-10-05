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
            //cpu variables initalized
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.instructionRegister = 0;
        }
        static addProcessToTable(pcbInstance) {
            const tableBody = document.getElementById("processTable").getElementsByTagName('tbody')[0];
            let row = tableBody.insertRow();
            row.id = `pid-${pcbInstance.id}`;
            let pidCell = row.insertCell(0);
            pidCell.textContent = pcbInstance.id.toString();
            let pcCell = row.insertCell(1);
            pcCell.textContent = pcbInstance.PC.toString();
            let locationCell = row.insertCell(9);
            locationCell.textContent = "Memory"; // Update based on PCB location
        }
    }
    pcb.currentPID = 0; //Current state that were in 
    TSOS.pcb = pcb;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map