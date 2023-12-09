/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

module TSOS {
    export class Shell {
        // Properties
        public promptStr = ">";
        public commandList = [];
        public curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        public apologies = "[sorry]";
        public programID: Number = 0;
        private pidCounter: number = 0;
        

        constructor() {
        }

        public init() {
            var sc: ShellCommand;
            //
            // Load the command list.

            // ver
            sc = new ShellCommand(this.shellVer,
                                  "ver",
                                  "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;

            //Date and Time 
            sc = new ShellCommand(this.shellDate,
                                  "date",
                                  "- Displays the current date and time.");
            this.commandList[this.commandList.length] = sc;

            // Where AM I ? 
            sc = new ShellCommand(this.shellWhereAmI,
                "whereami",
                "- Displays your current location (use your imagination.");
            this.commandList[this.commandList.length] = sc;

            //Therapy Function 
            sc = new ShellCommand(this.shellTherapy,
                "therapy",
                "- Displays advice on what me as a Therapist will tell you.");
            this.commandList[this.commandList.length] = sc;

            // help
            sc = new ShellCommand(this.shellHelp,
                                  "help",
                                  "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;

            // shutdown
            sc = new ShellCommand(this.shellShutdown,
                                  "shutdown",
                                  "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;

            // cls
            sc = new ShellCommand(this.shellCls,
                                  "cls",
                                  "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;

            // freeze
            sc = new ShellCommand(this.bsod,
                "bsod",
                "-Break the OS");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellLoad,
                "load",
                "- Verifies user code and will load it.");
            this.commandList[this.commandList.length] = sc;


            sc = new ShellCommand(this.shellRun,
                "run",
                "<PID> run a program already in memory.");
            this.commandList[this.commandList.length] = sc;
        

            // man <topic>
            sc = new ShellCommand(this.shellMan,
                                  "man",
                                  "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;

            // trace <on | off>
            sc = new ShellCommand(this.shellTrace,
                                  "trace",
                                  "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;

            // rot13 <string>
            sc = new ShellCommand(this.shellRot13,
                                  "rot13",
                                  "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;

            // prompt <string>
            sc = new ShellCommand(this.shellPrompt,
                                  "prompt",
                                  "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.clearMem,
                                    "clearmem",
                                    "- Clear all memory partitions.");
            this.commandList[this.commandList.length] = sc;

             // runall
            sc = new ShellCommand(this.shellRunAll,
                                    "runall",
                                    "- Execute all programs at once.");
            this.commandList[this.commandList.length] = sc;


            // ps
            sc = new ShellCommand(this.shellps,
                                    "ps",
                                    "- Display the PID and state of all processes.");
            this.commandList[this.commandList.length] = sc;


            // kill <pid>
            sc = new ShellCommand(this.shellkillPID,
                                    "kill",
                                    "<pid> - Kill one process.");
            this.commandList[this.commandList.length] = sc;

            // killall
            sc = new ShellCommand(this.shellkillall,
                                    "killall",
                                    "- Kill all processes.");
            this.commandList[this.commandList.length] = sc;


             // quantum <int>
             sc = new ShellCommand(this.shellQuantum,
                                    "quantum",
                                    "<int> - Let the user set the Round Robin quantum measured in cpu cycles.");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellformat,    
                                    "format",
                                    "-Formats The Disk ");
            this.commandList[this.commandList.length] = sc;


            sc = new ShellCommand(this.shellcreate,
                                    "create",
                                    "- Creates File .");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellread,
                                    "read",
                                    "- Reads whats inside a file .");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellwrite,
                                    "write",
                                    "- Writes stuff in the file ");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shelldelete,
                                    "delete",
                                    "-Removes filename from storage");
            this.commandList[this.commandList.length] = sc; 
            
            sc = new ShellCommand(this.shellcopy,
                                    "copy",
                                    "-Copys exisiting file name");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellls,
                                    "ls",
                                    "-list the files currently stored on the disk");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellrename,
                                    "rename",
                                    "-rename current file name")
              
            

            // Display the initial prompt.
            this.putPrompt();
        }

        public putPrompt() {
            _StdOut.putText(this.promptStr);
        }

        public handleInput(buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match. 
            // TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index: number = 0;
            var found: boolean = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                } else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);  // Note that args is always supplied, though it might be empty.
            } else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + Utils.rot13(cmd) + "]") >= 0) {     // Check for curses.
                    this.execute(this.shellCurse);
                } else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {        // Check for apologies.
                    this.execute(this.shellApology);
                } else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }

        // Note: args is an optional parameter, ergo the ? which allows TypeScript to understand that.
        public execute(fn, args?) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            
            this.putPrompt();
        }

        public parseInput(buffer: string): UserCommand {
            var retVal = new UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript. See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;

            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }

        //
        // Shell Command Functions. Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        public shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            } else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }

        
        //calling the memory manager's clear function to wipe the memory,
        public clearMem() { 
            _MemoryManager.clear();
            _StdOut.putText("Cleared memory.");
        }

        public shellkillall (args: string[]): void {

            //Check to see if we have access to the processes
            if (_MemoryManager && _MemoryManager.pcbList) {

                //Loop through the pcb list 
                for (let process of _MemoryManager.pcbList) {
                    process.running = false;
                
                }

                //Loop through the readyQueue and terminate running processes
                for (let process of _MemoryManager.readyQueue) {
                    process.running = false;
                
                }
                // Clear the pcb list and readyQueue
                _MemoryManager.readyQueue = [];
                _MemoryManager.pcbList = [];
                _MemoryManager.updatePCBDisplay();
                _MemoryManager.clear(); //Testing to see if this fixes killall
                _StdOut.putText("All processes are terminated.");
                _StdOut.advanceLine();

            } else {
                _StdOut.putText("Error: Memory Manager or PCB List is not available.");
                _StdOut.advanceLine();
            }
        }



        public shellCurse() {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }

        public shellApology() {
           if (_SarcasticMode) {
              _StdOut.putText("I think we can put our differences behind us.");
              _StdOut.advanceLine();
              _StdOut.putText("For science . . . You monster.");
              _SarcasticMode = false;
           } else {
              _StdOut.putText("For what?");
           }
        }

        // Although args is unused in some of these functions, it is always provided in the 
        // actual parameter list when this function is called, so I feel like we need it.
        

        //My very boring information
        public shellVer(args: string[]) {
            const APP_NAME = "Youssef's OS";
            const APP_VERSION = "0.01";
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }

        public shellDate(args: string[]) {
            const currentDate = new Date(); //calling the Date constructor without any arguments, so it automatically captures the current date and time.
            const CDate = currentDate.toDateString();
            const CurrentTime = currentDate.toLocaleTimeString();
        
            console.log("Current date:", CDate);
            console.log("Current time:", CurrentTime);
        
            _StdOut.putText("The date is: " + CDate + " The time is: " + CurrentTime);
        }

        
        public shellkillPID(args: string[]): void {
            if (args.length == 0) {
                _StdOut.putText("Please provide a PID to terminate.");
                return;
            }
        
            let killpid = parseInt(args[0]);
            let indexRemove = -1;
            
            // Find the PCB 
            for(let i = 0; i < _MemoryManager.pcbList.length; i++) {
                if (_MemoryManager.pcbList[i].pid == killpid) {
                    indexRemove = i;
                    break;
                }
            }
        
            // kill the process in the readyQueue 
            for (let process of _MemoryManager.readyQueue) {
                if (process.pid == killpid) {
                    process.running = false;
                }
            }
        
            if (indexRemove !== -1) {
                // Remove PCB from the list
                _MemoryManager.pcbList.splice(indexRemove, 1);
                _MemoryManager.updatePCBDisplay();
                _StdOut.putText(`Process with PID ${killpid} has been terminated.`);
            } else {
                _StdOut.putText(`No process found with PID ${killpid}.`);
            }
        }
        
        
        
        public shellLoad() {
            // Regular Expression to match hexadecimal digits and spaces
            const hexDigitAndSpaceRegex = /^([0-9a-fA-F]{2}\s)*[0-9a-fA-F]{2}$/;
        
            // Get the user input and cleaned up extra spaces with the .trim()
            let userinput = (<HTMLInputElement>(document.getElementById("taProgramInput"))).value.trim();
        
            /// Split user input into individual bytes (but keep them as strings)
            let userInput = userinput.split(/\s+/);
        
            if (userInput.length == 0) {
                _StdOut.putText("User Program Input is Empty!");
                return;
            }
        
            if (!hexDigitAndSpaceRegex.test(userinput)) {
                _StdOut.putText("Program input is not valid hexadecimal. Example: 'A9 08'");
                return;
            }
            
            let currentPID = _LastAssignedPID++;
            // Display the PID
            _StdOut.putText(`Valid hexadecimal input. Assigned PID: ${currentPID}`);

            // Update the memory display
            _MemoryManager.loadIntoMemory(currentPID, userInput)
            _Memory.updateMemoryDisplay();
            
            // _StdOut.putText(this.promptStr + " ");  // Display the prompt

        }

        public shellRun(args:string[]) {
            console.log("shellRun Function");
            console.log(args)

            let pid : number = parseInt(args[0]);
            console.log(pid);
             
            if (Number.isNaN(pid)){
                _StdOut.putText( "Bad input enter a number: ");
                return;
            }


            let pcbdata = _MemoryManager.getPCB(pid);
            if (pcbdata == null){
                _StdOut.putText( "No PID number found ");
                return;
            }
            
            
            _Scheduler.runProcess(pid);

        }

        public shellQuantum(args:string[]) {
            console.log("shellQuantum Function");
            console.log(args)

            let q : number = parseInt(args[0]);
             
            if (!q || q < 1){
                _StdOut.putText( "Bad input enter a positive number: ");
                return;
            }
            

            _Scheduler.setQuantum(q);
            _StdOut.putText( "Set quantum to "+q+" CPU Cycle(s).");

        }

        

        public shellps(args: string[]) {
            //Check the memorymanager for the PCB list 
            if (_MemoryManager && _MemoryManager.pcbList) {
                let processes= _MemoryManager.pcbList;
                
                //If there is no Pid then return error in console. 
                if (processes.length === 0) {
                    _StdOut.putText("There is no current processes in memory");
                    return;
                }

                for (let process of processes) { 
                    let state = process.running ? "Running" : "Loaded";  //state checks ifthe process is running or loaded, then
                    _StdOut.putText(`The current PID # is: ${process.pid} \t Current State: ${state}`);
                    _StdOut.advanceLine();
                }
            } else {
                _StdOut.putText("Error: Memory Manager or PCB List is not available.");
            }
        }
            
        
         


        public shellRunAll(){
            console.log("shellRunAll Function");

            _MemoryManager.runAll();  // calls the scheduler's runGroup function with the current list of PCBs
        }
        
        public shellWhereAmI(args: string[]) {
            console.log("shellWhereAmI function");

            const location = "You are in the 5th Dimension! Good Luck";  //Subject to Change  
            _StdOut.putText(location);
        }

        public shellTherapy(args: string[]) {
            console.log("shellTherapy function called");

            const randomMessage = "Hello this is Youssef, a virtual AI Therapist, currently in development be back soon!"
            _StdOut.putText(randomMessage);
        }

        public bsod(args: string[]) {
            _StdOut.clearScreen();  // Clear the screen.
            _StdOut.putText("The OS ran into a system error! It's dying.");
            _StdOut.advanceLine();
            _StdOut.putText("Please contact 845-337-5479.");
        
            _Kernel.krnShutdown();
        }
        
        

        public shellHelp(args: string[]) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }

        public shellShutdown(args: string[]) {
             _StdOut.putText("Shutting down...");
             // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed. If possible. Not a high priority. (Damn OCD!)
        }

        public shellCls(args: string[]) {         
            _StdOut.clearScreen();     
            _StdOut.resetXY();
        }

        public shellMan(args: string[]) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    // TODO: Make descriptive MANual page entries for the the rest of the shell commands here.
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            } else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }

        public shellTrace(args: string[]) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        } else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            } else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }

        public shellRot13(args: string[]) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + Utils.rot13(args.join(' ')) +"'");
            } else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }

        public shellPrompt(args: string[]) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            } else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }
        
        public shellformat(){
            _Kernel.krnFormat();
            _DiskDisplay.updateDiskDisplay();
            _StdOut.putText("Formatted the disk.");

        }

        public shellcreate(args: string[]){
            var name = args[0];
            if (!name){
                _StdOut.putText("Enter a file name.");

            }
            else{
                _Kernel.krnDiskCreate(name);
                _DiskDisplay.updateDiskDisplay();
            }

        }

        public shellread(args: string[]){
            var name = args[0];

            if (!name ){
                _StdOut.putText("Enter a file name.");
                return;
            }
            
        
            _Kernel.krnDiskRead(name);
            _DiskDisplay.updateDiskDisplay();

        }

        public shellwrite(args: string[]){
            var name = args[0];
            args.shift();
            var content = args.join(" ")

            if (!name ){
                _StdOut.putText("Enter a file name.");
                return;
            }
            if (!content || !content.startsWith('"') || !content.endsWith('"') ){
                console.log("Bad quotes", content)
                _StdOut.putText("Enter content with quotes.");
                return;
            }
            
            _Kernel.krnDiskWrite(name, content);
            _DiskDisplay.updateDiskDisplay();
        }

        public shellls(args: string[]){
        
            _Kernel.krnDiskList();
            _DiskDisplay.updateDiskDisplay();

        }

        public shellcopy(args: string[]){
            var name = args[0];
            var copyName = args[1];

            if (!name ){
                _StdOut.putText("Enter a source file name.");
                return;
            }
            if (!copyName ){
                _StdOut.putText("Enter a destination file name.");
                return;
            }
        
            _Kernel.krnDiskCopy(name,copyName);
            _DiskDisplay.updateDiskDisplay();

        }

        public shelldelete(args: string[]){
            var name = args[0];

            if (!name ){
                _StdOut.putText("Enter a file name.");
                return;
            }
            
        
            _Kernel.krnDiskRead(name);
            _DiskDisplay.updateDiskDisplay();

        }
}   
}