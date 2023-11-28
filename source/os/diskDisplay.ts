module TSOS {
    export class DiskDisplay {


        constructor(){
        }


        // Update the HTML table that displays the memory 
        public updateDiskDisplay(): void {
            
        const queuetablebody = document.getElementById("disktablebody");
        queuetablebody.innerHTML = ""; ///Clear the existing display

        for (const blockData of _krnDiskSystemDeviceDriver.blocks){
            let row = document.createElement("tr");
            let name = document.createElement("td");
            name.innerText = blockData.name;


            let inUseCell = document.createElement("td"); 
            inUseCell.innerText = blockData.inUse;

            let nextCell = document.createElement("td"); 
            nextCell.innerText = blockData.nextName;

            let dataCell = document.createElement("td");  
            dataCell.innerText = "";
            for (let byte of blockData.data){
                var byteString = Utils.formatHex(byte,2,false);
                dataCell.innerText = dataCell.innerText + byteString;

            }

            

            // appending all cells to the row then the row to the table body
            queuetablebody.appendChild(row);
            row.appendChild(name);
            row.appendChild(inUseCell);
            row.appendChild(nextCell);
            row.appendChild(dataCell);


           }


        }

    }
}
