var TSOS;
(function (TSOS) {
    class MemoryManager {
        constructor(memory) {
            this.programIdentication = 0;
            // Assuming we only have 1 segment for now, which is the entire memory.
            this.isSegmentOccupied = false;
            this._memory = memory;
        }
        loadProgram(input) {
            var _a;
            const bytes = (_a = input.match(/.{1,2}/g)) === null || _a === void 0 ? void 0 : _a.map(byte => parseInt(byte, 16));
            const pid = this.programIdentication;
            this.programIdentication++;
            const pcb = new TSOS.PCB(pid);
            // If the segment is not occupied or occupied load the new program
            if (!this.isSegmentOccupied) {
                for (let i = 0; i < bytes.length; i++) {
                    this._memory.setMemoryValue(i, bytes[i]);
                }
                this.isSegmentOccupied = true;
                _PCBQueue.enqueue(pcb);
                return pid;
            }
            // If the segment is occupied by an active program, return false
            return null;
        }
        clearMemory() {
            // Clear the memory segment and mark it as unoccupied
            for (let i = 0; i < 256; i++) {
                this._memory.setMemoryValue(i, 0);
            }
            this.isSegmentOccupied = false;
        }
    }
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryManager.js.map