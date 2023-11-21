module TSOS {
    export class Scheduler {

        public readyQueue: PCB[] = []; // Array to store running PCBs
        
        public quantum:number = 6; //Quantum TIME 

        constructor(){
            this.quantum = 6; //initializes Quantum time 
        }


        // This will set a new quantum value for the scheduler
        public setQuantum(newQuant: number){
            this.quantum = newQuant; // Update the quantum value with the new value
        }

        // Adds a process to the ready queue based on its PID
        public runProcess(pid: number){
            let executingPCB = _MemoryManager.getPCB(pid); //// Grabs the PCB from memory manager
            this.readyQueue.push(executingPCB); // Add the retrieved PCB to the ready queue
        }

        public runGroup(pcbList: PCB[]){
            for (let pcb of pcbList){ //Iterate over each PCB in the list
                this.readyQueue.push(pcb); // Add the current PCB to the ready queue
                _StdOut.putText(`Added Process ${pcb.pid} to ReadyQueue`); // LET the user that the process has been queued.
                _StdOut.advanceLine();

            }
        }
        
        public clear(){
            this.readyQueue = [];  // Reset the ready queue to an empty array
        }

        // Update the HTML table that displays the memory 
        public updateQueueDisplay(): void {
            
            const queuetablebody = document.getElementById("queuetablebody");
            queuetablebody.innerHTML = ""; ///Clear the existing display

            let count = 0; //For display 
        
           for (const pcbdata of this.readyQueue){
            count++;
            let row = document.createElement("tr");
            let pid = document.createElement("td");
            pid.innerText = pcbdata.pid.toString();

            let locationCell = document.createElement("td");
            locationCell.innerText = pcbdata.location;

            let segmentCell = document.createElement("td");
            segmentCell.innerText = Utils.formatHex(pcbdata.segment,2,true);

            let pcell = document.createElement("td"); 
            pcell.innerText = count.toString();

            let basecell = document.createElement("td"); 
            basecell.innerText = Utils.formatHex(pcbdata.base,2,true);

            let limitcell = document.createElement("td");  
            limitcell.innerText = Utils.formatHex(pcbdata.limit,2,true);
            let runningCell = document.createElement("td"); 
            let quantumCell = document.createElement("td");  
            quantumCell.innerText = Utils.formatHex(_Scheduler.quantum,2,true);
            



            runningCell.innerText = pcbdata.running.toString(); //Base is in decimal form needs to be hex. 


            // appending all cells to the row then the row to the table body
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
