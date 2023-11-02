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
                pcell.innerText = count.toString();
                IRcell.innerText = TSOS.Utils.formatHex(pcbdata.IR, 2, true);
                PCcell.innerText = TSOS.Utils.formatHex(pcbdata.PC, 2, true);
                ACC.innerText = TSOS.Utils.formatHex(pcbdata.ACC, 2, true);
                Xreg.innerText = TSOS.Utils.formatHex(pcbdata.Xreg, 2, true);
                Yreg.innerText = TSOS.Utils.formatHex(pcbdata.Yreg, 2, true);
                Zflag.innerText = TSOS.Utils.formatHex(pcbdata.Zflag, 2, true);
                basecell.innerText = TSOS.Utils.formatHex(pcbdata.base, 2, true);
                runningCell.innerText = pcbdata.running.toString(); //Base is in decimal form needs to be hex. 
                queuetablebody.appendChild(row);
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
        }
    }
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=scheduler.js.map