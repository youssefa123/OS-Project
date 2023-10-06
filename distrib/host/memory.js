var TSOS;
(function (TSOS) {
    class Memory {
        constructor() {
            this._ram = new Uint8Array(256); // Initializes memory with a size of 256 bytes
        }
        // Displaying the memory as a table in the UI.
        init() {
            // Grabbing the memory table from the UI.
            const tableBody = document.getElementById("memorytable").getElementsByTagName('tbody')[0];
            // sSetting the starting point for memory addresses
            let address = 0;
            // Making table rows one for each block of memory.
            for (let i = 0; i < 32; i++) {
                // Create a new row to represent a block of memory
                let row = tableBody.insertRow(i);
                // address header with  8 cells after the address, each containing the value "00"
                let headerCell = row.insertCell(0);
                headerCell.innerHTML = "0x" + address.toString(16).toUpperCase().padStart(3, '0');
                // Filling up the row with memory value "00". 
                for (let j = 1; j <= 8; j++) {
                    let dataCell = row.insertCell(j);
                    dataCell.innerHTML = "00";
                }
                // Increasing the memory address by 8 for the next row.
                address += 8;
            }
        }
        // setting a specific value in memory 
        setMemoryValue(index, value) {
            this._ram[index] = value;
            const tableBody = document.getElementById("memorytable").getElementsByTagName('tbody')[0];
            const rowIndex = Math.floor(index / 8);
            const cellIndex = (index % 8) + 1; // +1 because 0th cell is for address
            tableBody.rows[rowIndex].cells[cellIndex].innerHTML = value.toString(16).toUpperCase().padStart(2, '0');
            //Error check 
            if (index < 0 || index >= this._ram.length) {
                console.error(`Memory index ${index} out of bounds.`);
                return;
            }
            this._ram[index] = value;
        }
        // Then we need to retrieving a specific value from memor
        getMemoryValue(index) {
            return this._ram[index];
        }
        //Update the data table to show the current state of memory.
        refreshDataTable() {
            // Select the data table from the document using its ID
            const dataTable = document.getElementById("memorytable").getElementsByTagName('tbody')[0];
            // Loop through each row of the table
            for (let rowIndex = 0; rowIndex < dataTable.rows.length; rowIndex++) {
                // Get the current row
                let currentRow = dataTable.rows[rowIndex];
                // The actual data resides in cells from index 1 to 8
                for (let cellIndex = 1; cellIndex <= 8; cellIndex++) {
                    // Update cell's content using utility method
                    currentRow.children[cellIndex].innerHTML = TSOS.Utils.formatHex(this._ram[rowIndex * 8 + cellIndex - 1], 2, false);
                }
            }
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map