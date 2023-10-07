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
                // ... TODO more cases
                default:
                    _Kernel.krnTrace(`Not recognized opcode: ${this.currentOpcode}`);
                    this.isExecuting = false;
                    break;
            }
        }
        //Process control block process to execute
        executeProcess(pcb) {
            this.PC = pcb.PC;
            this.Acc = pcb.Acc;
            this.Xreg = pcb.Xreg;
            this.Yreg = pcb.Yreg;
            this.Zflag = pcb.Zflag;
            this.isExecuting = true;
        }
    }
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=cpu.js.map