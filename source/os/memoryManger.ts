module TSOS {
    export class MemoryManger {
        
        constructor(private memory: Memory) {}

        //Load a program onto memory:
        public loadProgram(input: string): number | null {
            const bytes = input.match(/.{1,2}/g);
            
            if (bytes && bytes.length <= 256) {
                for (let i = 0; i < bytes.length; i++) {
                    const byte = parseInt(bytes[i], 16);
                    this.memory.setMemoryValue(i, byte);
                }
                return _pidCounter++;  // Return the PID and then increment it
            } else {
                return null;  // Return null if the program couldn't be loaded
            }
        }

        // Read a byte from memory
        public readByte(index: number): number {
            return this.memory.getMemoryValue(index);
        }

        // Write a byte to memory
        public writeByte(index: number, value: number): void {
            this.memory.setMemoryValue(index, value);
        }
    }
}
            
    

