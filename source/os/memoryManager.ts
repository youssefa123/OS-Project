module TSOS {
    export class memoryManager {
        private memoryAccessor: MemoryAccessor = new MemoryAccessor();
        private pidCounter: number = 0; // New PID counter
        private pcbList: PCB[] = []; // Array to store active PCBs

        public loadIntoMemory(data: number[]): void {
            // Assign a PID
            let newPID = this.pidCounter++;

            // Determine base and limit for the new process based on its PID
            let base = newPID * 256;
            let limit = (newPID + 1) * 256;

            // Create a PCB for the new process and add it to the pcbList
            let newPCB = new TSOS.PCB(newPID, base, limit);
            this.pcbList.push(newPCB);

            // Load the data into memory starting from the 'base' address
            for (let i = 0; i < data.length; i++) {
                this.memoryAccessor.setByte(base + i, data[i]);
            }

            // Update the memory display
            this.updateMemoryDisplay();

            
    
        }

        // Update the HTML table that displays the memory 
        private updateMemoryDisplay(): void {
            const memoryTable = <HTMLTableElement>document.getElementById("memorytable");

            // Clear the existing rows in the memory table.
            while (memoryTable.firstChild) {
                memoryTable.removeChild(memoryTable.firstChild);
            }

            // Iterate through the memory array 
            for (let i = 0; i < 256; i += 2) {
                let row = memoryTable.insertRow();       
                let cell1 = row.insertCell(0);           
                let cell2 = row.insertCell(1);          
                
                // Convert the bytes to hexadecimal and set them in the cells.
                cell1.textContent = this.memoryAccessor.getByte(i).toString(16).toUpperCase().padStart(2, '0');
                cell2.textContent = this.memoryAccessor.getByte(i + 1).toString(16).toUpperCase().padStart(2, '0');
            }
        }
    }
}
