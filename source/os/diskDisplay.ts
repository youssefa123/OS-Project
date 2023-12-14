module TSOS {
    export class DiskDisplay {


        constructor(){
        }


        // Update the HTML table that displays the memory 
        public updateDiskDisplay(): void {
            
        const queuetablebody = document.getElementById("disktablebody");
        queuetablebody.innerHTML = ""; ///Clear the existing display
        
        for (var t = 0; t < _krnDiskSystemDeviceDriver.myTracks; t++){
            for (var s = 0; s < 8; s++){
                for (var b = 0; b < 8; b++){
                    var blockName = `${t}:${s}:${b}`
                    //console.log("Rendering", blockName)
                    var blockString = sessionStorage.getItem(blockName);
                    var blockData = JSON.parse(blockString);

                    let row = document.createElement("tr");
                    let name = document.createElement("td");
                    name.innerText = blockName;
        
        
                    let inUseCell = document.createElement("td"); 
                    inUseCell.innerText = blockData[60];
        
                    let nextCell = document.createElement("td"); 
                    nextCell.innerText = `${blockData[61]}:${blockData[62]}:${blockData[63]}`
        
                    let dataCell = document.createElement("td");  
                    dataCell.innerText = "";
                    for (let byte of blockData){
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

        

    }
}
