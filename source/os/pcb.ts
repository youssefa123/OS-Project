module TSOS {
    export class PCB {
    
        public id: number;
        public PC: number = 0; // Program counter
        public memorySegment: number; //Memory segment to 
        public instructionRegister: number = 0;
        public Acc: number = 0; // Accumulator
        public Xreg: number = 0; // X register
        public Yreg: number = 0; // Y register
        public Zflag: number = 0; // Z flag
        public processState: string = ''; //Fixed it to be a string 
        public priority: number; //Prioty


        
        constructor(pid: number, baseAddress: number, priority: number = 0) {
            this.id = pid;
            this.memorySegment = baseAddress; // set the memory segment's to base address, I have no clue why I made it 0 intially
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.instructionRegister = 0;
            this.priority = priority;
            

            //PCB added onto table 
            this.updateProcessInTable();

        }


        public updateProcessInTable(): void {
            const tableBody = document.getElementById("processTable").getElementsByTagName('tbody')[0];
            let targetRow: HTMLTableRowElement | undefined;

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

            targetRow.cells[7].textContent = this.priority.toString();
            targetRow.cells[9].textContent = "Memory"; // all processes are in memory for now.
            
        }
    }


}
