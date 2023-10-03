module TSOS {
    export class pcb { 

        public PID: number;  //PID 
        public PC: number = 0; //program counter 
        public Acc: number = 0; //Accumulator 
        public Xreg: number = 0;
        public Yreg: number = 0;
        public Zflag: number = 0;

        constructor(PID: number) {
            this.PID = PID;
        }

    }
}