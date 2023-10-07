module TSOS {
    export class pcb { 
        
        private static currentPID = 0; //Current state that were in 

        


        public id: number;
        public PC: number = 0; // Program counter
        public memorySegment: number; //Memory segment to 
        instructionRegister: number = 0;
        public Acc: number = 0; // Accumulator
        public Xreg: number = 0; // X register
        public Yreg: number = 0; // Y register
        public Zflag: number = 0; // Z flag
        public state: ProcessState; 
        
        
        constructor(segment: number) {
            this.id = pcb.currentPID++; // initialize  the memory Segment
            this.memorySegment = segment; // Assign the memory segment
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.instructionRegister = 0;
            this.state = ProcessState.READY;

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

            
        }
    }


     // Added a Enum for process states
     export enum ProcessState {
        READY = "ready",
        RUNNING = "running",
        WAITING = "waiting",
        TERMINATED = "terminated"
    }
}

    
