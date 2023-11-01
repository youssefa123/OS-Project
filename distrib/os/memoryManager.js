var TSOS;
(function (TSOS) {
    class memoryManager {
        constructor() {
            this.memoryAccessor = new TSOS.MemoryAccessor();
            this.pcbList = []; // Array to store active PCBs
            this.lasteByteUsed = 0;
        }
        loadIntoMemory(pid, data) {
            let base = this.lasteByteUsed;
            let Prioty = 50;
            let IR = 0;
            let PC = base;
            let ACC = 0;
            let Xreg = 0;
            let Yreg = 0;
            let Zflag = 0;
            // Load the data into memory starting from the 'base' address
            console.log("MM", data);
            for (let i = 0; i < data.length; i++) {
                let d = parseInt(data[i], 16);
                this.memoryAccessor.writeByte(base + i, d);
            }
            let limit = base + data.length;
            this.lasteByteUsed = limit;
            // Create a PCB for the new process and add it to the pcbList
            let newPCB = new TSOS.PCB(pid, base, limit, Prioty, IR, PC, ACC, Xreg, Yreg, Zflag);
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
                let runningCell = document.createElement("td"); //Memory location for now 
                pid.innerText = pcbdata.pid.toString();
                pcell.innerText = pcbdata.Prioty.toString();
                IRcell.innerText = TSOS.Utils.formatHex(pcbdata.IR, 2, true);
                PCcell.innerText = TSOS.Utils.formatHex(pcbdata.PC, 2, true);
                ACC.innerText = TSOS.Utils.formatHex(pcbdata.ACC, 2, true);
                Xreg.innerText = TSOS.Utils.formatHex(pcbdata.Xreg, 2, true);
                Yreg.innerText = TSOS.Utils.formatHex(pcbdata.Yreg, 2, true);
                Zflag.innerText = TSOS.Utils.formatHex(pcbdata.Zflag, 2, true);
                basecell.innerText = pcbdata.base.toString(); //Base is in decimal form needs to be hex. 
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
        }
    }
    TSOS.memoryManager = memoryManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryManager.js.map