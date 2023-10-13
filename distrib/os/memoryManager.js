var TSOS;
(function (TSOS) {
    class MemoryManager {
        constructor(memory) {
            //Keeps track of programs and assign unique IDs
            this.programIdentification = 0;
            // Array to track occupation status of each memory segment. True indicates occupied, and false indicates free.
            this.segments = [false, false, false];
            this._memory = memory;
        }
        // Function to find and return the index of a free memory segment. 
        getFreeSegment() {
            for (let i = 0; i < MemoryManager.MAX_SEGMENTS; i++) {
                if (!this.segments[i]) {
                    return i; // Return free segment index
                }
            }
            return null; // All segments are occupied
        }
        // New Function to load a program into memory, returns the program ID or null if no memory segment is available.
        loadProgram(input) {
            // Assign program ID
            const pid = this.programIdentification;
            this.programIdentification++;
            // Get the index of a free memory segment
            const segmentIndex = this.getFreeSegment();
            if (segmentIndex === null) {
                return null; // No free memory segment available
            }
            // Mark the selected segment as occupied
            this.segments[segmentIndex] = true;
            // Calculate starting address for this segment in memory
            const offset = segmentIndex * MemoryManager.SEGMENT_SIZE;
            // Write the input program into the designated memory segment
            for (let i = 0; i < input.length; i++) {
                this._memory.setMemoryValue(offset + i, input[i]);
            }
            // Create a new PCB for this program and enqueue it
            const pcb = new TSOS.PCB(pid, offset); // Pass the starting address (offset) to PCB
            _PCBQueue.enqueue(pcb);
            return pid;
        }
        // Function to clear a specified memory segment and mark it as free
        clearSegment(segmentIndex) {
            const offset = segmentIndex * MemoryManager.SEGMENT_SIZE;
            for (let i = 0; i < MemoryManager.SEGMENT_SIZE; i++) {
                this._memory.setMemoryValue(offset + i, 0);
            }
            this.segments[segmentIndex] = false; // Mark segment as free
        }
        clearMemory() {
            // Clear all memory segments
            for (let segmentIndex = 0; segmentIndex < MemoryManager.MAX_SEGMENTS; segmentIndex++) {
                this.clearSegment(segmentIndex);
            }
        }
    }
    // size of each memory segment
    MemoryManager.SEGMENT_SIZE = 256;
    // 3 memory segments
    MemoryManager.MAX_SEGMENTS = 3;
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryManager.js.map