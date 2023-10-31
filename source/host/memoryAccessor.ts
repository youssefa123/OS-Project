module TSOS {
    export class MemoryAccessor {
        
        // Then we need to retrieve a byte from a specific address in memory
        public readByte(address: number, currentPCB?:PCB): number {
            if (currentPCB){
                address = address + currentPCB.base;
            }
            // Aslo the address should be within the bounds of our memory.
            if (address < 0 || address >= _Memory.limit || (currentPCB && address > 255 + currentPCB.base)) {

                console.error("Invalid memory address.", address);
                
                return 0; // Return 0 if the address is invalid 
            }
            return _Memory.storage[address]; // Fetches the byte at the given address
        }

        // Then we need to set a byte at a specific address in memory.
        public writeByte(address: number, value: number, currentPCB?:PCB): void {
            if (currentPCB){
                address = address + currentPCB.base;
            }

            console.log("Setting byte: ", Utils.formatHex(value,2,true), "at",Utils.formatHex(address,2,true))
            if (address < 0 || address >= _Memory.limit || (currentPCB && address > 255 + currentPCB.base)) {
                console.error("Invalid memory address.",address);
                return; // Exit if the address is invalid.
            }
            _Memory.storage[address] = value; // Sets the byte at the given address.
            console.log('Target address is now', Utils.formatHex(_Memory.storage[address],2,true))
        }
    }
}
