var TSOS;
(function (TSOS) {
    class MemoryManager {
        constructor(memory) {
            this.memory = memory;
        }
        //Load a program onto memory:
        loadProgram(input) {
            const bytes = input.match(/.{1,2}/g);
            if (bytes && bytes.length <= 256) {
                for (let i = 0; i < bytes.length; i++) {
                    const byte = parseInt(bytes[i], 16);
                    this.memory.setMemoryValue(i, byte);
                }
                return _pidCounter++; // Return the PID and then increment it
            }
            else {
                return null; // Return null if the program couldn't be loaded
            }
        }
        // Read a byte from memory
        readByte(index) {
            return this.memory.getMemoryValue(index);
        }
        // Write a byte to memory
        writeByte(index, value) {
            this.memory.setMemoryValue(index, value);
        }
    }
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryManager.js.map