// Main memory for the system.
var TSOS;
(function (TSOS) {
    //memory array 
    class Memory {
        // Memory space that can be fully addressed using a 16-bit address bus.
        constructor(size = 0x10000) {
            this.data = new Uint8Array(size);
        }
        // Reads a byte from the specified address.
        // address: The memory address from which to read.
        // Returns: The byte value at the given address.
        read(address) {
            return this.data[address];
        }
        // Writes a byte to the specified address.
        // address: The memory address to which to write.
        // value: The byte value to write.
        write(address, value) {
            this.data[address] = value;
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map