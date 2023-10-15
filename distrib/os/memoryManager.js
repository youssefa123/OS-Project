var TSOS;
(function (TSOS) {
    class memoryManager {
        constructor() {
            // Instantiate the MemoryAccessor so it can access our memory array.
            this.memoryAccessor = new TSOS.MemoryAccessor();
        }
        // Load data into memory and now return the PID number 
        loadIntoMemory(data) {
            for (let i = 0; i < data.length; i++) {
                this.memoryAccessor.setByte(i, data[i]);
            }
            // Get a new PID and increment for the next process
            let pid = memoryManager.nextPid++;
            // Show the changes in the visual memory display.
            this.updateMemoryDisplay();
            return pid; // Return the associated PID for the loaded data.
        }
        // Update the HTML table that displays the contents of memory.
        updateMemoryDisplay() {
            const memoryTable = document.getElementById("memorytable");
            // Clear the existing rows in the memory table.
            while (memoryTable.firstChild) {
                memoryTable.removeChild(memoryTable.firstChild);
            }
            // Iterate through our memory array and update the table to reflect the contents.
            for (let i = 0; i < 256; i += 2) {
                let row = memoryTable.insertRow(); // Create a new row.
                let cell1 = row.insertCell(0); // Create the first cell.
                let cell2 = row.insertCell(1); // Create the second cell.
                // Convert the bytes to hexadecimal and set them in the cells.
                cell1.textContent = this.memoryAccessor.getByte(i).toString(16).toUpperCase().padStart(2, '0');
                cell2.textContent = this.memoryAccessor.getByte(i + 1).toString(16).toUpperCase().padStart(2, '0');
            }
        }
    }
    memoryManager.nextPid = 0; // Start the PID from 0.
    TSOS.memoryManager = memoryManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryManager.js.map