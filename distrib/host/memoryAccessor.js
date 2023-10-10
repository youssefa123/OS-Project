var TSOS;
(function (TSOS) {
    class MemoryAccessor {
        constructor(_memory) {
            this._memory = _memory;
        } // Dependency Injection
        writeByte(address, value) {
            if (address < 0 || address >= 256) {
                // If not then error
                throw new Error("Invalid memory address.");
            }
            this._memory.setMemoryValue(address, value); // Use the getMemoryValue method of the Memory instance to read the value
        }
        readByte(address) {
            if (address < 0 || address >= 512) { // Added more memory for testing 
                // Invalid memory address
                throw new Error("Invalid memory address.");
            }
            return this._memory.getMemoryValue(address); //Uses the getMemoryValue to write the value 
        }
        load(program) {
            if (program.length > 256) {
                throw new Error("Program exceeds memory capacity.");
            }
            for (let i = 0; i < program.length; i++) { //Loops through each byte in the program.
                this.writeByte(i, program[i]);
            }
        }
    }
    TSOS.MemoryAccessor = MemoryAccessor;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryAccessor.js.map