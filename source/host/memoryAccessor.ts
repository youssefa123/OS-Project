module TSOS {
    export class MemoryAccessor {
        // Main memory,  It's initialized with 256 zeros, the .fill fills every slot in this array with the value 0
        private memory: number[] = new Array(256).fill(0);

        // Then we need to retrieve a byte from a specific address in memory
        public getByte(address: number): number {
            
            // Aslo the address should be within the bounds of our memory.
            if (address < 0 || address >= this.memory.length) {
                console.error("Invalid memory address.");
                
                return 0; // Return 0 if the address is invalid 
            }
            return this.memory[address]; // Fetches the byte at the given address
        }

        // Then we need to set a byte at a specific address in memory.
        public setByte(address: number, value: number): void {
            
            if (address < 0 || address >= this.memory.length) {
                console.error("Invalid memory address.");
                return; // Exit if the address is invalid.
            }
            this.memory[address] = value; // Sets the byte at the given address.
        }
    }
}
