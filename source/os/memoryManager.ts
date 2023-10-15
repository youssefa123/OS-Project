module TSOS {
    export class memoryManager {
        // Instantiate the MemoryAccessor to access to our memory array.
        private memoryAccessor: MemoryAccessor = new MemoryAccessor();

        // Load data into memory.
        public loadIntoMemory(data: number[]): void {
            // Iterate over each byte in the data and set it in memory.
            for (let i = 0; i < data.length; i++) {
                this.memoryAccessor.setByte(i, data[i]);
            }
            // Make sure these changes diplay in the visual memory display
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
