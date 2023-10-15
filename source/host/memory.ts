module TSOS {

    export class Memory {
        public base: number = 0;
        public limit: number = 256 //Memory limit is 256 bytes 
        public storage: Array<string>; // Storage for the memory contents

        public init(): void {
            this.base = 0;
            this.limit = 256;
             // Initialize the storage array with the size of limit of 256 bytes
            this.storage = new Array<string>(this.limit).fill('00'); // Filling with '00' as a default memory value
        }
        
    }}