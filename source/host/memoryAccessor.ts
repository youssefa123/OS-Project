module TSOS {

    export class MemoryAccessor {

        constructor(private _memory: Memory) {} // Dependency Injection

        public writeByte(address: number, value: number): void { //Check to see if the adress is in the range of memory
            if (address < 0 || address >= 256) {
                // If not then error
                throw new Error("Invalid memory address.");
            }

            this._memory.setMemoryValue(address, value);  // Use the getMemoryValue method of the Memory instance to read the value
        }
        

        public readByte(address: number): number {
            if (address < 0 || address >= 256) {
                // Invalid memory address
                throw new Error("Invalid memory address.");
            }

            return this._memory.getMemoryValue(address); //Uses the getMemoryValue to write the value 
        }

        public load(program: number[]): void {
            if (program.length > 256) {
                throw new Error("Program exceeds memory capacity.");
            }

            for (let i = 0; i < program.length; i++) { //Loops through each byte in the program.
                this.writeByte(i, program[i]);
            }
        }

    }
}
