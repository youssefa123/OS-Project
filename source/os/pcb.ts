module TSOS {
    export class pcb { 
        
        private static currentPID = 0; //Current state that were in 

        


        public id: number;
        public PC: number = 0; // Program counter
        public memorySegment: number; //Memory segment to 
        instructionRegister: number = 0;
        public Acc: number = 0; // Accumulator
        public Xreg: number = 0; // X register
        public Yreg: number = 0; // Y register
        public Zflag: number = 0; // Z flag
        
        
        constructor(segment: number) {
            this.memorySegment = segment; // initialize  the memory Segment

            //cpu variables initalized
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.instructionRegister = 0;

            //mem segment 



        }
    }
}