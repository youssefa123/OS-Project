var TSOS;
(function (TSOS) {
    class MemoryAccessor {
        constructor() {
            // Main memory,  It's initialized with 256 zeros, the .fill fills every slot in this array with the value 0
            this.memory = new Array(256).fill(0);
        }
        // Then we need to retrieve a byte from a specific address in memory
        getByte(address) {
            // Aslo the address should be within the bounds of our memory.
            if (address < 0 || address >= this.memory.length) {
                console.error("Invalid memory address.");
                return 0; // Return 0 if the address is invalid 
            }
            return this.memory[address]; // Fetches the byte at the given address
        }
        // Then we need to set a byte at a specific address in memory.
        setByte(address, value) {
            if (address < 0 || address >= this.memory.length) {
                console.error("Invalid memory address.");
                return; // Exit if the address is invalid.
            }
            this.memory[address] = value; // Sets the byte at the given address.
        }
    }
    TSOS.MemoryAccessor = MemoryAccessor;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryAccessor.js.map