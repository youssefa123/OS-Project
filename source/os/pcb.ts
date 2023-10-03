module TSOS {
    export class pcb { 
        
        
        private static currentPID = 0; //Current state that were in 


        public id: number;
        public PC: number = 0; // Program counter
        public memorySegment: number; //Memory segment to 
        
        public Acc: number = 0; // Accumulator
        public Xreg: number = 0; // X register
        public Yreg: number = 0; // Y register
        public Zflag: number = 0; // Z flag
        
        
        constructor(segment: number) {
            this.id = pcb.currentPID++; // assigninging the  next available PID
        }
    }
}