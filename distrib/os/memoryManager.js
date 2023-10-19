var TSOS;
(function (TSOS) {
    class memoryManager {
        constructor() {
            this.memoryAccessor = new TSOS.MemoryAccessor();
            this.pcbList = []; // Array to store active PCBs
        }
        loadIntoMemory(pid, data) {
            let base = 256 * pid;
            let limit = base + 256;
            let Prioty = 50;
            let IR = 0;
            let PC = base;
            let ACC = 0;
            let Xreg = 0;
            let Yreg = 0;
            let Zflag = 0;
            // Create a PCB for the new process and add it to the pcbList
            let newPCB = new TSOS.PCB(pid, base, limit, Prioty, IR, PC, ACC, Xreg, Yreg, Zflag);
            // Load the data into memory starting from the 'base' address
            console.log("MM", data);
            for (let i = 0; i < data.length; i++) {
                let d = parseInt(data[i], 16);
                this.memoryAccessor.setByte(base + i, d);
            }
            this.pcbList.push(newPCB);
            // Update the memory display
            this.updateMemoryDisplay();
        }
        getPCB(pid) {
            for (const pcbdata of this.pcbList) {
                if (pcbdata.pid == pid) {
                    return pcbdata;
                }
            }
            return null;
        }
        // Update the HTML table that displays the memory 
        updateMemoryDisplay() {
            // const memoryTable = <HTMLTableElement>document.getElementById("memorytable");
            // // Clear the existing rows in the memory table.
            // while (memoryTable.firstChild) {
            //     memoryTable.removeChild(memoryTable.firstChild);
            // }
            // // Iterate through the memory array 
            // for (let i = 0; i < 256; i += 2) {
            //     let row = memoryTable.insertRow();       
            //     let cell1 = row.insertCell(0);           
            //     let cell2 = row.insertCell(1);          
            //     // Convert the bytes to hexadecimal and set them in the cells.
            //     cell1.textContent = this.memoryAccessor.getByte(i).toString(16).toUpperCase().padStart(2, '0');
            //     cell2.textContent = this.memoryAccessor.getByte(i + 1).toString(16).toUpperCase().padStart(2, '0');
            // }
            const pcbtablebody = document.getElementById("pcbtablebody");
            pcbtablebody.innerHTML = "";
            /*
            <th>PID</th>
                  <th>Prioty</th>
                  <th>IR</th>
                  <th>PC</th>
                  <th>ACC</th>
                  <th>Xreg</th>
                  <th>Yreg</th>
                  <th>Zflag</th>
                  <th>Memory Location</th>
            */
            for (const pcbdata of this.pcbList) {
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
                pid.innerText = pcbdata.pid.toString();
                pcell.innerText = pcbdata.Prioty.toString();
                IRcell.innerText = pcbdata.IR.toString();
                PCcell.innerText = pcbdata.PC.toString();
                ACC.innerText = pcbdata.ACC.toString();
                Xreg.innerText = pcbdata.Xreg.toString();
                Yreg.innerText = pcbdata.Yreg.toString();
                Zflag.innerText = pcbdata.Zflag.toString();
                basecell.innerText = pcbdata.base.toString(); //Base is in decimal form needs to be hex. 
                pcbtablebody.appendChild(row);
                row.appendChild(pid);
                row.appendChild(pcell);
                row.appendChild(ACC);
                row.appendChild(IRcell);
                row.appendChild(PCcell);
                row.appendChild(Xreg);
                row.appendChild(Yreg);
                row.appendChild(Zflag);
                row.appendChild(basecell);
            }
        }
    }
    TSOS.memoryManager = memoryManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryManager.js.map