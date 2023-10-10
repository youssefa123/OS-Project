module TSOS {
    export class MemoryManager {

        // forgot to reference to the Memory object
        private _memory: Memory;
        private programIdentication: number = 0;        

        // Assuming we only have 1 segment for now, which is the entire memory.
        public isSegmentOccupied: boolean = false;
        constructor(memory: Memory) {
            this._memory = memory;
        }

        public loadProgram(input: string): Number {
            const bytes = input.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16));

            const pid: number= this.programIdentication; 
            this.programIdentication ++;

            const pcb = new PCB(pid);

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

        public clearMemory(): void {
            // Clear the memory segment and mark it as unoccupied
            for (let i = 0; i < 256; i++) {
                this._memory.setMemoryValue(i, 0);
            }
            this.isSegmentOccupied = false;
        }
    }
}
