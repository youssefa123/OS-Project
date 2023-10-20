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

        public currentPCB: PCB | null = null; //  current running PCB

        private currentInstruction: number;
        private currentOpcode: number;

        

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
                this.updateCurrentPCB();
            }
        }
        
        private fetch(): void { //Fetch the instruction from memory using the current PC and the memoryAccessor
            console.log('fetching at ', this.PC);
            
            this.currentInstruction = _MemoryAccessor.readByte(this.PC);
            console.log(this.currentInstruction);

            this.PC++;
        }


        private decode(): void {
            console.log('decode');

            // for now it'll be one-byte opcodes without operands... FOR NOW 
            this.currentOpcode = _MemoryAccessor.readByte(this.PC);;
            console.log(this.currentOpcode);
        }
        
        private execute(): void {
            console.log('execute');
            let address;
            switch (this.currentInstruction) {
                case 0xA9: // (Load Accumulator with a constant)
                    this.Acc = _MemoryAccessor.readByte(this.PC);
                    this.PC++;
                    break;
                case 0x8D: // (Store Accumulator in memory)
                    address =  (_MemoryAccessor.readByte(this.PC) ) + (_MemoryAccessor.readByte(this.PC + 1)* 256);
                    _MemoryAccessor.writeByte(address, this.Acc);
                    this.PC += 2;
                    break;
                case 0xAD: // (Load Accumulator from memory)
                    address = (_MemoryAccessor.readByte(this.PC) ) + (_MemoryAccessor.readByte(this.PC + 1)* 256);
                    this.Acc = _MemoryAccessor.readByte(address);
                    this.PC += 2;
                    break;
                case 0x6D: // Add with carry
                    let sumAddress = (_MemoryAccessor.readByte(this.PC) ) + (_MemoryAccessor.readByte(this.PC + 1)* 256);
                    this.Acc += _MemoryAccessor.readByte(sumAddress);
                    this.PC += 2;
                    break;
                case 0xA2: // Load the X register with a constant
                    this.Xreg = _MemoryAccessor.readByte(this.PC);
                    this.PC++;
                    break;
                case 0xAE: // Load the X register from memory
                    let xAddress =  (_MemoryAccessor.readByte(this.PC) ) + (_MemoryAccessor.readByte(this.PC + 1)* 256);
                    this.Xreg = _MemoryAccessor.readByte(xAddress);
                    this.PC += 2;
                    break;
                
                case 0xA0: // Load the Y register with a constant
                    this.Yreg = _MemoryAccessor.readByte(this.PC);
                    this.PC++;
                    break;
                
                case 0xAC: // Load the Y register from memory
                    let yAddress =  (_MemoryAccessor.readByte(this.PC) ) + (_MemoryAccessor.readByte(this.PC + 1)* 256);
                    this.Yreg = _MemoryAccessor.readByte(yAddress);
                    this.PC += 2;
                    break;

                case 0xEA: // No Operation
                    break;

                case 0x00: 
                    this.isExecuting = false;
                    break;
        
                case 0xEC: // Compare byte in memory to X reg
                    let compareAddress =  (_MemoryAccessor.readByte(this.PC) ) + (_MemoryAccessor.readByte(this.PC + 1)* 256);
                    this.Zflag = (_MemoryAccessor.readByte(compareAddress) === this.Xreg) ? 1 : 0; //If the byte at the computed address is equal to the value in the X register, set Zflag to 1, otherwise set Zflag to 0
                    
                    this.PC += 2; // Increment the program counter to skip the two bytes 
                    break;
        
                case 0xEE: // Increment the value of a byte

                    
                    let incrementAddress =  (_MemoryAccessor.readByte(this.PC) ) + (_MemoryAccessor.readByte(this.PC + 1)* 256);
                    
                    //Fetches the current value of the byte
                    let value = _MemoryAccessor.readByte(incrementAddress);
                    
                    //Increment the fetched value by 1 and store it back to the same address in memory
                    _MemoryAccessor.writeByte(incrementAddress, value + 1);

                    //Increment the program counter to skip the two bytes 
                    this.PC += 2;
                    break;
                case 0xD0:
                    if( this.Zflag == 0){
                        let jump = _MemoryAccessor.readByte(this.PC) 
                        this.PC = this.PC + 1;

                        //fowards or backwards
                        if (jump < 0x80){
                            this.PC = this.PC + jump
                        }
                        else
                        {   
                            //represent as a negative number
                            jump = 0x100 - jump;
                            this.PC = this.PC - jump;                       
                        }
                    }
                    else{
                        this.PC += 1;
                    }

                    break
                case 0xFF:
                    if (this.Xreg == 1){
                        _StdOut.putText(Utils.formatHex(this.Yreg,2,false));
                    }
                    else if (this.Xreg == 2){
                        let yAddress = this.Yreg;
                        //read current y register if not 0, then print out with ascii conversion. If it is 0 then stop.

                        while(_MemoryAccessor.readByte(yAddress) != 0){

                           // _StdOut.putText(this.numberToAscii(_MemoryAccessor.readByte(yAddress)));  
                            yAddress += 1;
                        }
                    }

                    break;
                default:
                    console.log(`Not recognized instruction: ${this.currentOpcode}`);
                    _Kernel.krnTrace(`Not recognized instruction: ${this.currentOpcode}`);
                    this.isExecuting = false;
                    break;
            } 
            // After executing any instruction we need to update the PCB of the running process
            this.updateCurrentPCB();
            if (this.currentPCB) {
                _MemoryManager.updateMemoryDisplay()
            }
            
        }


        private updateCurrentCPU(): void {
            document.getElementById("cpuPC")!.innerText = this.PC.toString();
            document.getElementById("cpuIR")!.innerText = Utils.formatHex(this.currentInstruction, 2, false); // Assuming you want to display the IR in hex
            document.getElementById("cpuACC")!.innerText = this.Acc.toString();
            document.getElementById("cpuX")!.innerText = this.Xreg.toString();
            document.getElementById("cpuY")!.innerText = this.Yreg.toString();
            document.getElementById("cpuZ")!.innerText = this.Zflag.toString();
         }
         

        // Update the current running PCB with the latest state of the CPU after executing an instruction
        private updateCurrentPCB(): void {
            if (this.currentPCB) {
                console.log(this.currentPCB);
                this.currentPCB.PC = this.PC;
                this.currentPCB.IR = this.currentInstruction;
                this.currentPCB.ACC = this.Acc;
                this.currentPCB.Xreg = this.Xreg;
                this.currentPCB.Yreg = this.Yreg;
                this.currentPCB.Zflag = this.Zflag;
                this.currentPCB.running = this.isExecuting;
                _MemoryManager.updateMemoryDisplay();
                this.updateCurrentCPU();

            }
        }

        //Process control block process to execute
        public executeProcess(pcb: PCB): void {
             this.currentPCB = pcb;
            this.PC = pcb.PC;
            this.Acc = pcb.ACC;
            this.Xreg = pcb.Xreg;
            this.Yreg = pcb.Yreg;
            this.Zflag = pcb.Zflag;
            this.currentInstruction = pcb.IR;
            pcb.running = true;
            _MemoryManager.updateMemoryDisplay()
            this.isExecuting = true;
        }



    }}