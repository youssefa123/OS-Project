module TSOS {

    export class Memory {
        public base: number = 0;
        public limit: number = 256 //Memory limit is 256 bytes 
        public storage: Array<string>; // Storage for the memory contents
        data: any;

        public init(): void {
            this.base = 0;
            this.limit = 256;
             // Initialize the storage array with the size of limit of 256 bytes
            this.storage = new Array<string>(this.limit).fill('00'); // Filling with '00' as a default memory value
        }

        // Load data into the memory
        public load(data: Array<string>): void {
            // Logic to load data into the memory
            for (let i = 0; i < data.length && i < this.limit; i++) {
                this.storage[i] = data[i];
            }
        }

        public updateMemoryDisplay(): void {
            const memoryTable = <HTMLTableElement>document.getElementById('memorytable');
            for (let i = 0; i < this.limit; i++) {
                memoryTable.rows[i].cells[1].innerText = this.storage[i];
            }
        }
    }

}
        
        
   


