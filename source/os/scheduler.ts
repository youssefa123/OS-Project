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

    }
}
