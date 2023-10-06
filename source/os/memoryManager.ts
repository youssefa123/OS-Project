module TSOS {
    export class MemoryManager {

        // forgot to reference to the Memory object
        private _memory: Memory;


        

        // Assuming we only have 1 segment for now, which is the entire memory.
        public isSegmentOccupied: boolean = false;

        constructor(memory: Memory) {
            this._memory = memory;
        }

        public loadProgram(input: string): boolean {
            const bytes = input.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16));

            // Validate the bytes
            if (!bytes || bytes.length > 256) {
                return false;  // Invalid input or too big for memory
            }

            // If the segment is not occupied or occupied load the new program
            if (!this.isSegmentOccupied) {
                for (let i = 0; i < bytes.length; i++) {
                    this._memory.setMemoryValue(i, bytes[i]);
                }
                this.isSegmentOccupied = true;
                return true;
            }

            // If the segment is occupied by an active program, return false
            return false;
        }

        public clearMemory(): void {
            // Clear the memory segment and mark it as unoccupied
            for (let i = 0; i < 256; i++) {
                this._memory.setMemoryValue(i, 0);
            }
            this.isSegmentOccupied = false;
        }
    }
}
