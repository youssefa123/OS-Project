// Main memory for the system.
var TSOS;
(function (TSOS) {
    class Memory {
        constructor() {
            this.memoryArray = Array(256).fill(0); //Main Memory with 256 bytes starts with 0. 
        }
        static getInstance() {
            if (!Memory.instance) { // If it doesn't create a new instance.
                Memory.instance = new Memory();
            }
            return Memory.instance; //return the other
        }
        // Initializes the memory in html by adding a table with the memory adressessssss......
        init() {
            // main part of our table where the memory rows will 
            const tableBody = document.getElementById("memorytable").getElementsByTagName('tbody')[0];
            // starting point for our memory addresses. We'll display this and increase
            let address = 0;
            // 32 rows in this table becuase every project in the HOF has 32 rows
            for (let i = 0; i < 32; i++) {
                // new row in our table for memory data
                let row = tableBody.insertRow(i);
                // address header with  8 cells after the address, each containing the value "00"
                let headerCell = row.insertCell(0);
                // Also the address in hexadecimal form
                headerCell.innerHTML = "0x" + address.toString(16).toUpperCase().padStart(3, '0');
                // Loop 8 times to create 8 data cells in each row.
                for (let j = 1; j <= 8; j++) {
                    // Insert a new cell for data.
                    let dataCell = row.insertCell(j);
                    // the default value for each memory cell to is "00".
                    dataCell.innerHTML = "00";
                }
                // Increasing the memory address by 8 for the next row.
                address += 8;
            }
        }
        setMemoryValue(index, value) {
            this.memoryArray[index] = value;
            const tableBody = document.getElementById("memorytable").getElementsByTagName('tbody')[0];
            const rowIndex = Math.floor(index / 8);
            const cellIndex = (index % 8) + 1; // +1 because 0th cell is for address
            tableBody.rows[rowIndex].cells[cellIndex].innerHTML = value.toString(16).toUpperCase().padStart(2, '0');
        }
        getMemoryValue(index) {
            return this.memoryArray[index];
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map