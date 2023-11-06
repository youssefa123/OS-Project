var TSOS;
(function (TSOS) {
    class Scheduler {
        constructor() {
            this.readyQueue = []; // Array to store running PCBs
            this.quantum = 6;
            this.quantum = 6;
        }
        setQuantum(newQuant) {
            this.quantum = newQuant;
        }
        runProcess(pid) {
            let executingPCB = _MemoryManager.getPCB(pid);
            this.readyQueue.push(executingPCB);
            //_CPU.executeProcess(executingPCB);
        }
        runGroup(pcbList) {
            for (let pcb of pcbList) {
                this.readyQueue.push(pcb);
                _StdOut.putText(`Added Process ${pcb.pid} to ReadyQueue`);
                _StdOut.advanceLine();
            }
        }
        clear() {
            this.readyQueue = [];
        }
        // Update the HTML table that displays the memory 
        updateQueueDisplay() {
            const queuetablebody = document.getElementById("queuetablebody");
            queuetablebody.innerHTML = "";
            let count = 0;
            for (const pcbdata of this.readyQueue) {
                count++;
                let row = document.createElement("tr");
                let pid = document.createElement("td");
                pid.innerText = pcbdata.pid.toString();
                let locationCell = document.createElement("td");
                locationCell.innerText = pcbdata.location;
                let segmentCell = document.createElement("td");
                segmentCell.innerText = TSOS.Utils.formatHex(pcbdata.segment, 2, true);
                let pcell = document.createElement("td"); //Prioty cell for table 
                pcell.innerText = count.toString();
                let basecell = document.createElement("td"); //Memory location for now 
                basecell.innerText = TSOS.Utils.formatHex(pcbdata.base, 2, true);
                let limitcell = document.createElement("td"); //Memory location for now 
                limitcell.innerText = TSOS.Utils.formatHex(pcbdata.limit, 2, true);
                let runningCell = document.createElement("td"); //Memory location for now 
                let quantumCell = document.createElement("td");
                quantumCell.innerText = TSOS.Utils.formatHex(_Scheduler.quantum, 2, true);
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
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=scheduler.js.map