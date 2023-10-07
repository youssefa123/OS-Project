/* ------------
 CPU.ts

 Routines for the host CPU simulation, NOT for the OS itself.

 This code references page numbers in the text book:
 Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne. ISBN 978-0-470-12872-5
 ------------ */

 module TSOS {

    enum PipelineState {
        FETCH,
        DECODE,
        EXECUTE,
        WRITEBACK
    }

    export class Cpu {
        public pipelineState: PipelineState;

        public currentPCB: pcb | null = null; //  current running PCB

        private currentInstruction: number;
        private currentOpcode: number;
        private memoryAccessor: MemoryAccessor; // To interface with memory

        constructor(
            public PC: number = 0,
            public Acc: number = 0,
            public Xreg: number = 0,
            public Yreg: number = 0,
            public Zflag: number = 0,
            public clockcount: number = 0,
            public isExecuting: boolean = false
        ) {
            
        }
        
            public init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.clockcount = 0;
            this.isExecuting = false;
            this.pipelineState = PipelineState.FETCH;
        }

        public cycle(): void { //run a program in the CPU file.
            _Kernel.krnTrace('CPU cycle');
            switch (this.pipelineState) {
                case PipelineState.FETCH:
                    this.fetch();
                    this.pipelineState = PipelineState.DECODE;
                    break;
                case PipelineState.DECODE:
                    this.decode();
                    this.pipelineState = PipelineState.EXECUTE;
                    break;
                case PipelineState.EXECUTE:
                    this.execute();
                    this.pipelineState = PipelineState.FETCH;
                    break;
                default:
                    this.pipelineState = PipelineState.FETCH;
                    break;
            }
        }
        
        private fetch(): void { //Fetch the instruction from memory using the current PC and the memoryAccessor
            
            this.currentInstruction = this.memoryAccessor.readByte(this.PC);
            this.PC++;
        }


        private decode(): void {
            // for now it'll be one-byte opcodes without operands... FOR NOW 
            this.currentOpcode = this.currentInstruction;
        }
        
        private execute(): void {
            switch (this.currentOpcode) {
                case 0xA9: // (Load Accumulator with a constant)
                    this.Acc = this.memoryAccessor.readByte(this.PC);
                    this.PC++;
                    break;
                case 0x8D: // (Store Accumulator in memory)
                    let address = (this.memoryAccessor.readByte(this.PC) * 256) + this.memoryAccessor.readByte(this.PC + 1);
                    this.memoryAccessor.writeByte(address, this.Acc);
                    this.PC += 2;
                    break;
                // ... TODO more cases
                default:
                    _Kernel.krnTrace(`Not recognized opcode: ${this.currentOpcode}`);
                    this.isExecuting = false;
                    break;
            }         
        }

        // Update the current running PCB with the latest state of the CPU after executing an instruction
        private updateCurrentPCB(): void {
            if (this.currentPCB) {
                this.currentPCB.PC = this.PC;
                this.currentPCB.Acc = this.Acc;
                this.currentPCB.Xreg = this.Xreg;
                this.currentPCB.Yreg = this.Yreg;
                this.currentPCB.Zflag = this.Zflag;
            }
        }

        //Process control block process to execute
        public executeProcess(pcb: pcb): void {
            this.PC = pcb.PC;
            this.Acc = pcb.Acc;
            this.Xreg = pcb.Xreg;
            this.Yreg = pcb.Yreg;
            this.Zflag = pcb.Zflag;
            this.isExecuting = true;
        }
    }
}