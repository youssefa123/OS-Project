var TSOS;
(function (TSOS) {
    class Memory {
        constructor() {
            this.base = 0;
            this.limit = 256; //Memory limit is 256 bytes 
        }
        init() {
            this.base = 0;
            this.limit = 256;
            // Initialize the storage array with the size of limit of 256 bytes
            this.storage = new Array(this.limit).fill('00'); // Filling with '00' as a default memory value
        }
        // Load data into the memory
        load(data) {
            // Logic to load data into the memory
            for (let i = 0; i < data.length && i < this.limit; i++) {
                this.storage[i] = data[i];
            }
        }
        updateMemoryDisplay() {
            const memoryTable = document.getElementById('memorytable');
            for (let i = 0; i < this.limit; i += 8) {
                for (let j = 0; j < 8; j++) {
                    memoryTable.rows[i / 8].cells[j + 1].innerText = this.storage[i + j];
                }
            }
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map