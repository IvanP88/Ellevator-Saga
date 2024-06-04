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
            //console.log(turn);
            const lift = elevators[turn];
            /*/const queue = elevators[turn].getPressedFloors();
            
            
            
            //console.log(queue);
            //console.log(queue[level]);
            lift.destinationQueue = [];

            lift.goToFloor(queue[level]);
*/
            console.log(lift.loadFactor());

            task(lift, level);  
        }
        
        function task(lift, level) 
        {
            if (lift.loadFactor() < 0.2) {
                lift.goToFloor(level);
            } else {
                lift.goToFloor(level, true);                
            }
        }
        
        function press(levels) {
            for(let level=0; level < levels; level++){
                let floor = floors[level];
                floor.on("up_button_pressed, down_button_pressed", function() {
                    setTurn(level);
                });                    
            }
        }
        
        function pult(lift)
        {
            const machine = elevators[lift];
            machine.on("floor_button_pressed", function(floorNum) { 
                machine.goToFloor(floorNum, true);
            } );
        }
        
        //idleFor(elevators[0], levels, 0);
        //idleFor(elevators[1], levels, levels);
        

        
        press(levels);

        
        
        pult(0);
        pult(1);
        pult(2);
        pult(3);
        //pult(4);

        // Whenever the elevator is idle (has no more queued destinations) ...
        // if(elevator.loadFactor() < 0.5)
           
   
        

        

    },
    update: function(dt, elevators, floors) {
        console.log('update');
    },
       
}
