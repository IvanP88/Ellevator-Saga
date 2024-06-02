{    
    init: function(elevators, floors) {
        const levels = floors.length; 
        let turn = 1;
        let elevNumbers = elevators.length;

        
        function idleFor(elevator, levels, level) {
            elevator.on("idle", function() {            
                for(level; level < levels; level++) {
                    elevator.goToFloor(level);
                }  
                elevator.goToFloor(0);
                for(level; level > 0; level--) {
                    elevator.goToFloor(level);    
                }
            });
        }
        
        function setTurn(level, all=true){
            
            if (all) {
                if (turn < elevNumbers - 1) {
                    turn++;
                } else {
                    turn = 0;
                }
            } else {
                
            }
            


            const lift = elevators[turn];
            const queue = elevators[turn].getPressedFloors();
            
            
            
            console.log(queue);
            console.log(queue[0]);
            lift.destinationQueue = [];

            lift.goToFloor(queue[0]);


            if (lift.loadFactor() < 0.5) {
                lift.goToFloor(level);
            }
            
            
            
        }
        
        function press(levels, task) {
            const lift = elevators[task];
            for(let level=0; level < levels; level++){
                let floor = floors[level];
                floor.on("up_button_pressed", function() {
                    lift.goToFloor(level);
                });     
                floor.on("down_button_pressed", function(){
                    lift.goToFloor(level);
                });
            }
        }
        
        function pult(lift)
        {
            const machine = elevators[lift];
            machine.on("floor_button_pressed", function(floorNum) { 
                machine.goToFloor(floorNum);
            } );
        }
        

        

       
        idleFor(elevators[0], levels, 0);
        //idleFor(elevators[1], levels, 0);
        

        
        press(levels, 1);
        //pult(0);
        pult(1);

        // Whenever the elevator is idle (has no more queued destinations) ...
        // if(elevator.loadFactor() < 0.5)
           
   
        

        

    },
    update: function(dt, elevators, floors) {
        //console.log('update');
    },
       
}
