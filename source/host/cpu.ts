/* ------------
     CPU.ts

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

     module TSOS {

        export class Cpu {
    
            private instructionRegister: number = 0; // To store the  opcode
            
            // Memory instance to the CPU class
            private _Memory: Memory = new Memory();
    
            constructor(public PC: number = 0,
                        public Acc: number = 0,
                        public Xreg: number = 0,
                        public Yreg: number = 0,
                        public Zflag: number = 0,
                        public clockcount: number = 0,
                        public isExecuting: boolean = false) {
            }
    
            
    
            private fetch(): void {
                
                this.instructionRegister = this._Memory.read(this.PC);
                this.PC++;  // Increment the program counter
            }
    
            private decode(): void {

                console.log("Decoded opcode:", this.instructionRegister);
            }
            
            // ... Todo
    
        }
    }
    