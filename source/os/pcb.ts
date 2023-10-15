module TSOS {
    export class PCB {
      
    public pid: number;
    public base: number;  // Base address
    public limit: number; // Limit for this process
    
    constructor(pid: number, base: number, limit: number) {
        this.pid = pid;
        this.base = base;
        this.limit = limit;
    }

    }
}