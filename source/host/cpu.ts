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
                case 0x6D: // Add with carry
                    let sumAddress = (this.memoryAccessor.readByte(this.PC) * 256) + this.memoryAccessor.readByte(this.PC + 1);
                    this.Acc += this.memoryAccessor.readByte(sumAddress);
                    this.PC += 2;
                    break;
                case 0xA2: // Load the X register with a constant
                    this.Xreg = this.memoryAccessor.readByte(this.PC);
                    this.PC++;
                    break;

                case 0xAE: // Load the X register from memory
                    let xAddress = (this.memoryAccessor.readByte(this.PC) * 256) + this.memoryAccessor.readByte(this.PC + 1);
                    this.Xreg = this.memoryAccessor.readByte(xAddress);
                    this.PC += 2;
                    break;
                
                case 0xA0: // Load the Y register with a constant
                    this.Yreg = this.memoryAccessor.readByte(this.PC);
                    this.PC++;
                    break;
                
                case 0xAC: // Load the Y register from memory
                    let yAddress = (this.memoryAccessor.readByte(this.PC) * 256) + this.memoryAccessor.readByte(this.PC + 1);
                    this.Yreg = this.memoryAccessor.readByte(yAddress);
                    this.PC += 2;
                    break;

                case 0xEA: // No Operation
                    break;

                    case 0x00: 
                    this.isExecuting = false;
                    break;
        
                case 0xEC: // Compare byte in memory to X reg
                    let compareAddress = (this.memoryAccessor.readByte(this.PC) * 256) + this.memoryAccessor.readByte(this.PC + 1);
                    this.Zflag = (this.memoryAccessor.readByte(compareAddress) === this.Xreg) ? 1 : 0;
                    this.PC += 2;
                    break;
        
                case 0xEE: // Increment the value of a byte
                    let incrementAddress = (this.memoryAccessor.readByte(this.PC) * 256) + this.memoryAccessor.readByte(this.PC + 1);
                    let value = this.memoryAccessor.readByte(incrementAddress);
                    this.memoryAccessor.writeByte(incrementAddress, value + 1);
                    this.PC += 2;
                    break;
        
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