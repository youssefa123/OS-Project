/* ------------
     Kernel.ts

     Routines for the Operating System, NOT the host.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module TSOS {

    export class Kernel {
        //
        // OS Startup and Shutdown Routines
        //

        public krnBootstrap() {      // Page 8. {
            Control.hostLog("bootstrap", "host");  // Use hostLog because we ALWAYS want this, even if _Trace is off.

            
            // Initialize our global queues.
            _KernelInterruptQueue = new Queue();  // A (currently) non-priority queue for interrupt requests (IRQs).
            _KernelBuffers = new Array();         // Buffers... for the kernel.
            _KernelInputQueue = new Queue();      // Where device input lands before being processed out somewhere.

            // Initialize the console.
            _Console = new Console();             // The command line interface / console I/O device.
            _Console.init();
            

            // Initialize standard input and output to the _Console.
            _StdIn  = _Console;
            _StdOut = _Console;

            // Load the Keyboard Device Driver
            this.krnTrace("Loading the keyboard device driver.");
            _krnKeyboardDriver = new DeviceDriverKeyboard();     // Construct it.
            _krnKeyboardDriver.driverEntry();                    // Call the driverEntry() initialization routine.
            this.krnTrace(_krnKeyboardDriver.status);

            // Load the Disk System Device Driver
            this.krnTrace("Loading the disk system device driver");
            _krnDiskSystemDeviceDriver = new DiskSystemDeviceDriver();
            _krnDiskSystemDeviceDriver.driverEntry();
            //this.krnTrace(_krnDiskSystemDeviceDriver);
            //
            // ... more?
            //

            // Enable the OS Interrupts.  (Not the CPU clock interrupt, as that is done in the hardware sim.)
            this.krnTrace("Enabling the interrupts.");
            this.krnEnableInterrupts();

            // Launch the shell.
            this.krnTrace("Creating and Launching the shell.");
            _OsShell = new Shell();
            _OsShell.init();

            // Finally, initiate student testing protocol.
            //if (_GLaDOS) {
                //GLaDOS.afterStartup();
           // }
        }

        public krnShutdown() {
            this.krnTrace("begin shutdown OS");
            // TODO: Check for running processes.  If there are some, alert and stop. Else...
            // ... Disable the Interrupts.
            this.krnTrace("Disabling the interrupts.");
            this.krnDisableInterrupts();
            //
            // Unload the Device Drivers?
            // More?
            //
            this.krnTrace("end shutdown OS");
        }


        public krnOnCPUClockPulse() {
            /* This gets called from the host hardware simulation every time there is a hardware clock pulse.
               This is NOT the same as a TIMER, which causes an interrupt and is handled like other interrupts.
               This, on the other hand, is the clock pulse from the hardware / VM / host that tells the kernel
               that it has to look for interrupts and process them if it finds any.                          
            */
            
            // Check for an interrupt, if there are any. Page 560
            if (_KernelInterruptQueue.getSize() > 0) {
                // Process the first interrupt on the interrupt queue.
                // TODO (maybe): Implement a priority queue based on the IRQ number/id to enforce interrupt priority
                var interrupt = _KernelInterruptQueue.dequeue();
                this.krnInterruptHandler(interrupt.irq, interrupt.params);

                //IKIK it should have been in a dispatcher file, I'm sorry. I will fix soon >.  checks CPU execution state and ready queue length
            } else if (_CPU.isExecuting || _Scheduler.readyQueue.length > 0) { 
                ///context switch if the quantum value expired for the currently executing process

                if (_Scheduler.readyQueue.length > 0 && _CPU.clockcount % _Scheduler.quantum == 0){
                    //Saves the current CPU state to the current pcb if a process is executing 
                    if (_CPU.currentPCB){


                        if (_Scheduler.readyQueue[0].location == "disk"){
                            // deallocate the memory 
                            console.log(`Deallocating process ${_CPU.currentPCB.pid}`)

                            _CPU.currentPCB.location = "disk";
                            var savedData = [];
                            for (let i = _CPU.currentPCB.base; i < _CPU.currentPCB.limit; i++) {
                                savedData.push(_MemoryAccessor.readByte(i));
                                _MemoryAccessor.writeByte(i,0);
                            }
            
                            _krnDiskSystemDeviceDriver.saveProcess(_CPU.currentPCB.pid,savedData);

                        }
                        _CPU.updateCurrentPCB();


                        // If the CPU is still executing, place the current PCB back into the ready queue
                        if (_CPU.isExecuting == true){
                            _Scheduler.readyQueue.push(_CPU.currentPCB);
                        }
                    }
                    //  Dequeue the next state from the set to be processed by the CPU
                    let nextPCB = _Scheduler.readyQueue.shift();
                    if (nextPCB.location == "disk"){
                        console.log(`loading from disk process ${nextPCB.pid}`)

                        let savedData = _krnDiskSystemDeviceDriver.loadProcess(nextPCB.pid);
                        console.log("Saved data: ", savedData);
                        let base = 0;
                        if (_MemoryAccessor.readByte(base) != 0){
                            base = 256;
                        } 
                        if (_MemoryAccessor.readByte(base) != 0){
                            base = 256*2;
                        } 
                        nextPCB.base = base;
                        nextPCB.limit = base+256;
                        let loadedBytes = [];
                        for (let i = 0; i < 256; i++) {
                            let byte = savedData[i] || 0;
                            
                            _MemoryAccessor.writeByte(nextPCB.base+i, byte);
                            loadedBytes.push(byte);
                        }
                    
                        nextPCB.location = "memory"
                        console.log("Completed loading: ",loadedBytes)

            
                    }

                    _CPU.executeProcess(nextPCB);
                }
                _CPU.cycle();
            } else {                       // If there are no interrupts and there is nothing being executed then just be idle.
                this.krnTrace("Idle");
            }
        }


        //
        // Interrupt Handling
        //
        public krnEnableInterrupts() {
            // Keyboard
            Devices.hostEnableKeyboardInterrupt();
            // Put more here.
        }

        public krnDisableInterrupts() {
            // Keyboard
            Devices.hostDisableKeyboardInterrupt();
            // Put more here.
        }

        public krnInterruptHandler(irq, params) {
            // This is the Interrupt Handler Routine.  See pages 8 and 560.
            // Trace our entrance here so we can compute Interrupt Latency by analyzing the log file later on. Page 766.
            this.krnTrace("Handling IRQ~" + irq);

            // Invoke the requested Interrupt Service Routine via Switch/Case rather than an Interrupt Vector.
            // TODO: Consider using an Interrupt Vector in the future.
            // Note: There is no need to "dismiss" or acknowledge the interrupts in our design here.
            //       Maybe the hardware simulation will grow to support/require that in the future.
            switch (irq) {
                case TIMER_IRQ:
                    this.krnTimerISR();               // Kernel built-in routine for timers (not the clock).
                    break;
                case KEYBOARD_IRQ:
                    _krnKeyboardDriver.isr(params);   // Kernel mode device driver
                    _StdIn.handleInput();
                    break;
                default:
                    this.krnTrapError("Invalid Interrupt Request. irq=" + irq + " params=[" + params + "]");
            }
        }

        public krnTimerISR() {
            // The built-in TIMER (not clock) Interrupt Service Routine (as opposed to an ISR coming from a device driver). {
            // Check multiprogramming parameters and enforce quanta here. Call the scheduler / context switch here if necessary.
            // Or do it elsewhere in the Kernel. We don't really need this.
        }

        //
        // System Calls... that generate software interrupts via tha Application Programming Interface library routines.
        //
        // Some ideas:
        // - ReadConsole
        // - WriteConsole
        // - CreateProcess
        // - ExitProcess
        // - WaitForProcessToExit
        // - CreateFile
        // - OpenFile
        // - ReadFile
        // - WriteFile
        // - CloseFile

        public krnFormat(){
            _krnDiskSystemDeviceDriver.format();
        }

        //
        // OS Utility Routines
        //
        public krnTrace(msg: string) {
             // Check globals to see if trace is set ON.  If so, then (maybe) log the message.
             if (_Trace) {
                if (msg === "Idle") {
                    // We can't log every idle clock pulse because it would quickly lag the browser quickly.
                    if (_OSclock % 10 == 0) {
                        // Check the CPU_CLOCK_INTERVAL in globals.ts for an
                        // idea of the tick rate and adjust this line accordingly.
                        Control.hostLog(msg, "OS");
                    }
                } else {
                    Control.hostLog(msg, "OS");
                }
             }
        }

        public krnTrapError(msg) {
            Control.hostLog("OS ERROR - TRAP: " + msg);
            // TODO: Display error on console, perhaps in some sort of colored screen. (Maybe blue?)
            this.krnShutdown();
        } 

        public krnDiskCreate(filename : string){
            _krnDiskSystemDeviceDriver.create(filename);
        }
        public krnDiskRead(filename : string){
            _krnDiskSystemDeviceDriver.read(filename);
        }
        public krnDiskWrite(filename:string, content: string){
            _krnDiskSystemDeviceDriver.write(filename, content);
        }
        public krnDiskList(){
            _krnDiskSystemDeviceDriver.list();
        }
        public krnDiskCopy(sourcename:string, copyname: string){
            _krnDiskSystemDeviceDriver.copy(sourcename, copyname);
        }
        public krnDiskRename(filename:string, newname: string){
            _krnDiskSystemDeviceDriver.rename(filename, newname);
        }
        public krnDiskDelete(filename:string){
            _krnDiskSystemDeviceDriver.delete(filename);
        }
    }
}
