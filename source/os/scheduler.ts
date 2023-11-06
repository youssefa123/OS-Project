module TSOS {
    export class Scheduler {

        public readyQueue: PCB[] = []; // Array to store running PCBs
        
        public quantum:number = 6;

        constructor(){
            this.quantum = 6;
        }

        public setQuantum(newQuant: number){
            this.quantum = newQuant;
        }

        public runProcess(pid: number){
            
            let executingPCB = _MemoryManager.getPCB(pid);
            this.readyQueue.push(executingPCB);
            //_CPU.executeProcess(executingPCB);
        }

        public runGroup(pcbList: PCB[]){
            for (let pcb of pcbList){
                this.readyQueue.push(pcb);
                _StdOut.putText(`Added Process ${pcb.pid} to ReadyQueue`);
                _StdOut.advanceLine();

            }
        }
        
        public clear(){
            this.readyQueue = [];
        }

        // Update the HTML table that displays the memory 
        public updateQueueDisplay(): void {
            
            const queuetablebody = document.getElementById("queuetablebody");
            queuetablebody.innerHTML = ""; 

            let count = 0;
        
           for (const pcbdata of this.readyQueue){
            count++;
            let row = document.createElement("tr");
            let pid = document.createElement("td");
            pid.innerText = pcbdata.pid.toString();

            let locationCell = document.createElement("td");
            locationCell.innerText = pcbdata.location;

            let segmentCell = document.createElement("td");
            segmentCell.innerText = Utils.formatHex(pcbdata.segment,2,true);

            let pcell = document.createElement("td"); //Prioty cell for table 
            pcell.innerText = count.toString();

            let basecell = document.createElement("td"); //Memory location for now 
            basecell.innerText = Utils.formatHex(pcbdata.base,2,true);

            let limitcell = document.createElement("td"); //Memory location for now 
            limitcell.innerText = Utils.formatHex(pcbdata.limit,2,true);
            let runningCell = document.createElement("td"); //Memory location for now 
            let quantumCell = document.createElement("td");  
            quantumCell.innerText = Utils.formatHex(_Scheduler.quantum,2,true);
            



            runningCell.innerText = pcbdata.running.toString(); //Base is in decimal form needs to be hex. 



            queuetablebody.appendChild(row);
            row.appendChild(pid);
            row.appendChild(pcell);
            row.appendChild(locationCell);
            row.appendChild(segmentCell);

            row.appendChild(basecell);
            row.appendChild(limitcell);

            row.appendChild(runningCell);
            row.appendChild(quantumCell);



           }


        }

    }
}
