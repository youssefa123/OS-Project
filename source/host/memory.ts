// Main memory for the system.

module TSOS { 
    
    //memory array 
    export class Memory {
        
        //array to represent memory
        private data: Uint8Array;

        // Memory space that can be fully addressed using a 16-bit address bus.
        constructor(size: number = 0x10000) {
            this.data = new Uint8Array(size);
        }

        // Reads a byte from the specified address.
        // address: The memory address from which to read.
        // Returns: The byte value at the given address.
        read(address: number): number {
            return this.data[address];
        }

        // Writes a byte to the specified address.
        // address: The memory address to which to write.
        // value: The byte value to write.
        write(address: number, value: number): void {
            this.data[address] = value;
        }
    }

}

        
    

    







