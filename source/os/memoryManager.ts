module TSOS {
    export class MemoryManager {

        
        private _memory: Memory;
        
        //Keeps track of programs and assign unique IDs
        private programIdentification: number = 0;

        // size of each memory segment
        private static SEGMENT_SIZE: number = 256;

        // 3 memory segments
        private static MAX_SEGMENTS: number = 3;

        // Array to track occupation status of each memory segment. True indicates occupied, and false indicates free.
        private segments: boolean[] = [false, false, false];

       
        constructor(memory: Memory) {
            this._memory = memory;
        }

         // Function to find and return the index of a free memory segment. 
         public getFreeSegment(): number | null {
            for (let i = 0; i < MemoryManager.MAX_SEGMENTS; i++) {
                if (!this.segments[i]) {
                    return i; // Return free segment index
                }
            }
            return null; // All segments are occupied
        }

            
        // New Function to load a program into memory, returns the program ID or null if no memory segment is available.
        public loadProgram(input: number[]): number | null {
            
            // Assign program ID
            const pid: number= this.programIdentification; 
            this.programIdentification++;

            // Get the index of a free memory segment
            const segmentIndex = this.getFreeSegment();
            if (segmentIndex === null) {
                return null;  // No free memory segment available
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
            const pcb = new PCB(pid, offset);  // Pass the starting address (offset) to PCB
            _PCBQueue.enqueue(pcb);

            return pid;
        }
        
        public clearMemory(): void {
            // Clear the memory segment and mark it as unoccupied
            for (let i = 0; i < 256; i++) {
                this._memory.setMemoryValue(i, 0);
            }
           
        }
    }
}
