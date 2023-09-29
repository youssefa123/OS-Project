// Main memory for the system.
var TSOS;
(function (TSOS) {
    //memory array 
    class Memory {
        //initilaize memory 
        constructor() {
            this.mar = 0x0000;
            this.mdr = 0x00;
            this.memoryarray = new Uint8Array(Memory.memoryaddressspace);
            this.memoryarray.fill(0x00);
        }
        //Read 
        read(address) {
            this.mar = address;
            //setting the memory address register the mar adress
            this.mdr = this.memoryarray[this.mar];
            return this.mdr; //Return the data that's being read 
        }
        write({ address, value }) {
            this.mar = address;
            this.mdr = value; // Setting the Memory Data Register to the value to be written.
            this.memoryarray[this.mar] = this.mdr;
        }
    }
    Memory.memoryaddressspace = 65536; //65536 because thats how many individual memory locations there are. 
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map