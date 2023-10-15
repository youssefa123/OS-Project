module TSOS {

    export class Memory {
        public base: number = 0;
        public limit: number = 256 //Memory limit is 256 bytes 

        public init(): void {
            this.base = 0;
            this.limit = 256;
        }
        
    }}