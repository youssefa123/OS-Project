module TSOS {
    export class memoryManager {
        private memoryAccessor: MemoryAccessor = new MemoryAccessor();
        public pcbList: PCB[] = []; // Array to store load PCBs

        public readyQueue: PCB[] = []; // Array to store running PCBs

        private lasteByteUsed: number = 0;
        private nextSegment:number = 0;
        
        public loadIntoMemory(pid:number, data: string[]): void {
            
            
            let base = this.lasteByteUsed; 
            let Prioty = 50;
            let IR = 0;
            let PC = 0;
            let ACC = 0;
            let Xreg = 0;
            let Yreg = 0;
            let Zflag = 0;


            // Load the data into memory starting from the 'base' address
            console.log("MM", data)
            for (let i = 0; i < data.length; i++) {
                let d = parseInt(data[i],16);

                this.memoryAccessor.writeByte(base + i, d);
            }

            let limit = base + data.length+256; 
            this.lasteByteUsed = limit;
            console.log("base", base, "limit: ", limit, "LBU", this.lasteByteUsed)
            // Create a PCB for the new process and add it to the pcbList
            let newPCB = new TSOS.PCB(pid, base, limit, Prioty, IR, PC, ACC, Xreg, Yreg, Zflag,this.nextSegment );
            this.nextSegment = this.nextSegment + 1;

            this.pcbList.push(newPCB)

            // Update the PCB display
            this.updatePCBDisplay();

        }

        public getPCB(pid: number) {
            for (const pcbdata of this.pcbList) {
                if (pcbdata.pid == pid ) {
                    return pcbdata
                }
            }


            return null;

        }

        //Clear function to help clear memeory, running process, and scheduler 
        public clear(){ 
            this.pcbList = [];  //Reset the process control block list to an empty array.
            _Memory.clear();  // Call the clear unction on the memory to reset it.
            _Scheduler.clear();
            this.nextSegment = 0;
            this.updatePCBDisplay();
        }

        public runAll(){
            _Scheduler.runGroup(this.pcbList);
        }


        // Update the HTML table that displays the memory 
        public updatePCBDisplay(): void {
            
            const pcbtablebody = document.getElementById("pcbtablebody");
            pcbtablebody.innerHTML = "";
        
           for (const pcbdata of this.pcbList){
            let row = document.createElement("tr");
            let pid = document.createElement("td");
            let pcell = document.createElement("td"); //Prioty cell for table 
            let IRcell = document.createElement("td");
            let PCcell = document.createElement("td");
            let ACC = document.createElement("td");
            let Xreg = document.createElement("td");
            let Yreg = document.createElement("td");
            let Zflag = document.createElement("td");
            let basecell = document.createElement("td"); //Memory location for now 
            let runningCell = document.createElement("td"); //Memory location for now 

            

            pid.innerText = pcbdata.pid.toString();
            pcell.innerText = pcbdata.Prioty.toString();


            IRcell.innerText = Utils.formatHex(pcbdata.IR,2,true);
            PCcell.innerText = Utils.formatHex(pcbdata.PC,2,true);
            ACC.innerText = Utils.formatHex(pcbdata.ACC,2,true);
            Xreg.innerText = Utils.formatHex(pcbdata.Xreg,2,true);
            Yreg.innerText = Utils.formatHex(pcbdata.Yreg,2,true);
            Zflag.innerText = Utils.formatHex(pcbdata.Zflag,2,true);
            basecell.innerText = Utils.formatHex(pcbdata.base,2,true);
            runningCell.innerText = pcbdata.running.toString(); //Base is in decimal form needs to be hex. 



            pcbtablebody.appendChild(row);
            row.appendChild(pid);
            row.appendChild(pcell);
            row.appendChild(IRcell);
            row.appendChild(PCcell);
            row.appendChild(ACC);
            row.appendChild(Xreg);
            row.appendChild(Yreg);
            row.appendChild(Zflag);
            row.appendChild(basecell);
            row.appendChild(runningCell);



           }
           
           _Scheduler.updateQueueDisplay()

        }
    }
}
