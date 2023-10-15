module TSOS {
    export class memoryManager {
        // Instantiate the MemoryAccessor so it can access to our memory array.
        private memoryAccessor: MemoryAccessor = new MemoryAccessor();

        // Load data into memory.
        public loadIntoMemory(data: number[]): void {
            // Iterate over each byte in the data and set it in memory.
            for (let i = 0; i < data.length; i++) {
                this.memoryAccessor.setByte(i, data[i]);
            }
            // Show the the changes in the visual memory display.
            this.updateMemoryDisplay();
        }

        // Update the HTML table that displays the contents of memory.
        private updateMemoryDisplay(): void {
            const memoryTable = document.getElementById("memorytable");

            // Clear the existing rows in the memory table.
            while (memoryTable.firstChild) {
                memoryTable.removeChild(memoryTable.firstChild);
            }

            // Iterate through our memory array and update the table to reflect the contents.
            for (let i = 0; i < 256; i += 2) {
                let row = memoryTable.insertRow();       // Create a new row.
                let cell1 = row.insertCell(0);           // Create the first cell.
                let cell2 = row.insertCell(1);           // Create the second cell.
                // Convert the bytes to hexadecimal and set them in the cells.
                cell1.textContent = this.memoryAccessor.getByte(i).toString(16).toUpperCase().padStart(2, '0');
                cell2.textContent = this.memoryAccessor.getByte(i + 1).toString(16).toUpperCase().padStart(2, '0');
            }
        }
    }
}
