module TSOS {

    export class MemoryAccessor {

        constructor(private _memory: Memory) {} // Dependency Injection

        public writeByte(address: number, value: number): void {
            if (address < 0 || address >= 256) {
                // Invalid memory address
                throw new Error("Invalid memory address.");
            }

            this._memory.setMemoryValue(address, value);
        }

   }
}
