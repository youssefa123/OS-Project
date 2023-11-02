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
    }
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=scheduler.js.map