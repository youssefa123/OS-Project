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

        constructor(
            public PC: number = 0,
            public Acc: number = 0,
            public Xreg: number = 0,
            public Yreg: number = 0,
            public Zflag: number = 0,
            public clockcount: number = 0,
            public isExecuting: boolean = false
        ) {}

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

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');

        }
    }
}