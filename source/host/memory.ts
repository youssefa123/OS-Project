// Main memory for the system.

module TSOS { 
    
    //memory array 
    export class Memory {
        
        //array to represent main memory
        private memoryarray: Uint8Array;

       
        private mar: number = 0x0000;
        private mdr: number = 0x00;  


        private static memoryaddressspace = 65536;  //65536 because thats how many individual memory locations there are. 

        //initilaize memory 
        constructor() {
            this.memoryarray = new Uint8Array(Memory.memoryaddressspace);
            this.memoryarray.fill(0x00);
        }
        
        //Read 

        public read(address: number): number {
            this.mar = address;
            //setting the memory address register the mar adress
            this.mdr = this.memoryarray[this.mar];
           
            return this.mdr;   //Return the data that's being read 
        }

        public write({ address, value }: { address: number; value: number; }): void {
            this.mar = address;               
            this.mdr = value;                 // Setting the Memory Data Register to the value to be written.
            this.memoryarray[this.mar] = this.mdr; 
        }

    }
}
        
    

    







