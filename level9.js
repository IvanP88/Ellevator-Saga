{    
    init: function(elevators, floors) {
        const levels = floors.length; 
        let turn = 1;
        let elevNumbers = elevators.length;

        
        function idleFor(elevator, level) {
            elevator.on("idle", function() {            
                for(level; level < levels; level++) {
                   // elevator.goToFloor(level);
                }  
                
                for(level; level >= 0; level--) {
                    elevator.goToFloor(level);    
                }
                level = levels;
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
            turn = 0;
           // console.log(turn);
            const lift = elevators[turn];
            const queue = elevators[turn].getPressedFloors();
            
            
            
            if(lift.loadFactor() > 0.5 && queue.length == 1) {
                console.log(queue[0]);
                console.log(turn);
                
                lift.destinationQueue = [];
                lift.checkDestinationQueue();
            }
            task(lift, level);
            //lift.destinationQueue = [];

            //lift.goToFloor(queue[level]);

            //console.log(lift.loadFactor());
              
        }
        
        function task(lift, level) 
        {
            console.log(lift.loadFactor());
            if (lift.loadFactor() < 0.5 && lift.loadFactor() > 0.1) {
                lift.goToFloor(level, true);
            } else {
                lift.goToFloor(level);                
            }
        }
        
        function press(levels) {
            for(let level=0; level < levels; level++){
                let floor = floors[level];
                floor.on("up_button_pressed", function() {
                    setTurn(level);
                });       
                floor.on("down_button_pressed", function() {
                    //setTurn(level);
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
        
        idleFor(elevators[0], levels);
        idleFor(elevators[1], levels);
        

        
        //press(levels);

        
        
        //pult(0);
        //pult(1);
        //pult(2);
        //pult(3);
        //pult(4);

        // Whenever the elevator is idle (has no more queued destinations) ...
        // if(elevator.loadFactor() < 0.5)
           
   
        

        

    },
    update: function(dt, elevators, floors) {
        //console.log('update');
    },
       
}
