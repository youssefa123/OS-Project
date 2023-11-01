module TSOS {
    export class PCB {
      
    public pid: number;
    public base: number;  // Base address
    public limit: number; // Limit for this process
    public Prioty: number;
    public IR: number;
    public PC: number;
    public ACC: number;
    public Xreg: number;
    public Yreg: number;
    public Zflag: number;  
    public running: boolean;
    

    
    constructor(pid: number, base: number, limit: number, Prioty: number, IR: number, PC: number, ACC: number, Xreg: number, Yreg: number, Zflag: number) {
        this.pid = pid;
        this.base = base;
        this.limit = limit;
        this.Prioty = Prioty;
        this.IR = IR;
        this.PC = PC;
        this.ACC = ACC;
        this.Xreg = Xreg;
        this.Yreg = Yreg;
        this.Zflag = Zflag;
        this.running = false;
    }


    }
}