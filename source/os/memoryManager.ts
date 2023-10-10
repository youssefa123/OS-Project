module TSOS {
    export class MemoryManager {

        // forgot to reference to the Memory object
        private _memory: Memory;
        private programIdentication: number = 0;        
        constructor(memory: Memory) {
            this._memory = memory;
        }

        // Descartes helped me with the load 
        //loadProgram method accepts an input of type number
        //The first method processes the input string to split it every 2 characters and then map it to its integer representation in base 16 (hexadecimal)
        public loadProgram(input: number[]): Number {
            const pid: number= this.programIdentication; 
            this.programIdentication ++;

            const pcb = new PCB(pid);

            // If the segment is not occupied or occupied load the new program
        
            if (!pcb) {
                return null;
                
            }
            // If the segment is occupied by an active program, return false
            for (let i = 0; i < input.length; i++) {
                this._memory.setMemoryValue(i, input[i]);
            }
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
