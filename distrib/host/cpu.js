/* ------------
 CPU.ts

 Routines for the host CPU simulation, NOT for the OS itself.

 This code references page numbers in the text book:
 Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne. ISBN 978-0-470-12872-5
 ------------ */
var TSOS;
(function (TSOS) {
    let PipelineState;
    (function (PipelineState) {
        PipelineState[PipelineState["FETCH"] = 0] = "FETCH";
        PipelineState[PipelineState["DECODE"] = 1] = "DECODE";
        PipelineState[PipelineState["EXECUTE"] = 2] = "EXECUTE";
        PipelineState[PipelineState["WRITEBACK"] = 3] = "WRITEBACK";
    })(PipelineState || (PipelineState = {}));
    class Cpu {
        constructor(PC = 0, Acc = 0, Xreg = 0, Yreg = 0, Zflag = 0, clockcount = 0, isExecuting = false) {
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.clockcount = clockcount;
            this.isExecuting = isExecuting;
            this.currentPCB = null; //  current running PCB
        }
        init() {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.clockcount = 0;
            this.isExecuting = false;
            this.pipelineState = PipelineState.FETCH;
        }
        cycle() {
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
                    this.updateCurrentPCB();
            }
        }
        fetch() {
            this.currentInstruction = this.memoryAccessor.readByte(this.PC);
            this.PC++;
        }
        decode() {
            // for now it'll be one-byte opcodes without operands... FOR NOW 
            this.currentOpcode = this.currentInstruction;
        }
        execute() {
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
                    this.Zflag = (this.memoryAccessor.readByte(compareAddress) === this.Xreg) ? 1 : 0; //If the byte at the computed address is equal to the value in the X register, set Zflag to 1, otherwise set Zflag to 0
                    this.PC += 2; // Increment the program counter to skip the two bytes 
                    break;
                case 0xEE: // Increment the value of a byte
                    let incrementAddress = (this.memoryAccessor.readByte(this.PC) * 256) + this.memoryAccessor.readByte(this.PC + 1);
                    //Fetches the current value of the byte
                    let value = this.memoryAccessor.readByte(incrementAddress);
                    //Increment the fetched value by 1 and store it back to the same address in memory
                    this.memoryAccessor.writeByte(incrementAddress, value + 1);
                    //Increment the program counter to skip the two bytes 
                    this.PC += 2;
                    break;
                default:
                    _Kernel.krnTrace(`Not recognized opcode: ${this.currentOpcode}`);
                    this.isExecuting = false;
                    break;
            }
            // After executing any instruction we need to update the PCB of the running process
            this.updateCurrentPCB();
            if (this.currentPCB) {
                this.currentPCB.updateProcessInTable();
            }
        }
        // Update the current running PCB with the latest state of the CPU after executing an instruction
        updateCurrentPCB() {
            if (this.currentPCB) {
                this.currentPCB.PC = this.PC;
                this.currentPCB.Acc = this.Acc;
                this.currentPCB.Xreg = this.Xreg;
                this.currentPCB.Yreg = this.Yreg;
                this.currentPCB.Zflag = this.Zflag;
                this.currentPCB.updateProcessInTable();
            }
        }
        //Process control block process to execute
        executeProcess(pcb) {
            this.currentPCB = pcb;
            this.PC = pcb.PC;
            this.Acc = pcb.Acc;
            this.Xreg = pcb.Xreg;
            this.Yreg = pcb.Yreg;
            this.Zflag = pcb.Zflag;
            pcb.updateProcessInTable();
            this.isExecuting = true;
        }
    }
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=cpu.js.map