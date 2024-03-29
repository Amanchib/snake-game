 var canvas = document.getElementById('snakegame');
        var context = canvas.getContext('2d');
        var grid = 16;
        var count = 0;
		var score = 0;
		var flag;
		var inter;
		var snake = 
        {
            x : 160,
            y : 160 ,
            cells : [{x:160 , y:160} , {x:144 , y:160}] ,
        };
		var apple = {
            x: 320,
            y: 320
        };
		
		// draw apple
        function drawApple()
        {
		    context.fillStyle = '#EE7486';
            context.fillRect(apple.x, apple.y, grid-1, grid-1); 
            for(let i=0 ; i<snake.cells.length ; i++)
            {
                if(snake.cells[i].x == apple.x && snake.cells[i].y == apple.y)
	            {
	                snake.cells.unshift({x: apple.x , y: apple.y}) ;
		            var number1 = Math.floor((Math.random() * 24) + 1);
		            var number2 = Math.floor((Math.random() * 24) + 1);
		            apple.x = number1 * 16;
		            apple.y = number2 * 16;
					for(let i = 0 ; i < snake.cells.length ; i++)
					{
                        if( apple.x == snake.cells[i].x && apple.y == snake.cells[i].y)
						{
                            drawApple();
                        }
					}
		            break;
	            }
            }
			//drawSnake();
        }

        drawApple();

        // draw snake
        function drawSnake()
        {
		    
		    if(snake.cells.length != 0){
		    context.fillStyle = '#ECF34D';
			context.fillRect(snake.cells[0].x, snake.cells[0].y, grid-1, grid-1);}
			
            context.fillStyle = '#A7A2A2';
            for(let i=1 ; i<snake.cells.length ; i++)
                context.fillRect(snake.cells[i].x, snake.cells[i].y, grid-1, grid-1);
			
			
			StoreInLocalStorage();
			if(snake.cells.length <= 2)
			{}
			else{
			count = snake.cells.length -2;
			score = (count*5);}
			document.getElementById("ID").innerHTML = "Score = " + score;
           
        }
        
		function StoreInLocalStorage()
		{
		    localStorage.snake = JSON.stringify(snake);
		}
		
		function GetFromLocalStorage()
		{
		    if(!localStorage.snake)
			{
			    localStorage.snake = JSON.stringify([]);
				snake = {
                x : 160,
                y : 160 ,
                cells : [{x:160 , y:160} , {x:144 , y:160}] ,
                };
		        drawSnake();
			}
			else
			{
			    snake = JSON.parse(localStorage.snake);
				if(snake.cells.length == 0)
				{
				    snake = {
                    x : 160,
                    y : 160 ,
                    cells : [{x:160 , y:160} , {x:144 , y:160}] ,
                    };
				}
				console.log(snake);
				drawSnake();
			}
		}
		
	    //drawSnake();  
		function moveSnake( dx , dy)
        {
            snake.x += dx ;
            snake.y += dy ;
            if(snake.x >= 400 || snake.x < 0 || snake.y >= 400 || snake.y < 0)
            {
		        GameOver();	
            }
			for(let i=0 ; i<snake.cells.length ; i++)
			{
			    if(snake.x == snake.cells[i].x && snake.y == snake.cells[i].y)
				{
				    GameOver();
				}
			}
            snake.cells.unshift({x: snake.x , y: snake.y}) ; // Insert at 0th position
            snake.cells.pop();  // remove the last element
            drawSnake();
        }
		
		function GameOver()
		{
            context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
            snake.cells = [];
			apple = {x:-100,y:-20};
            context.fillStyle = 'white'; 
            context.font = "50px italic";
            context.textAlign = "center";
            context.fillText("Game Over" , canvas.width/2, canvas.height/2);
        }

        // listen to keyboard events to move the snake
        document.addEventListener('keydown', function(e) 
        {
            let dx = 0, dy = 0 ;
            if (e.keyCode == 37 ) 
            {
                if(flag == 39)
	            {}
	            else
				{
				    clearInterval(inter);
                    inter = setInterval(function(){
                    dx = -grid; flag=37;
                    dy = 0;
	                context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
                    moveSnake(dx,dy);
                    drawApple();
					},100);
				}
            }
            // up arrow key
            else if (e.keyCode == 38 ) 
            {
                if(flag == 40)
	            {}
	            else
				{
				    clearInterval(inter);
                    inter = setInterval(function(){
				    dx = 0;
                    dy = -grid; flag=38;
					context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
                    moveSnake(dx,dy);
                    drawApple();
					},100);
				}
            }
            // right arrow key
            else if (e.keyCode == 39 ) 
            {
                if(flag == 37)
	            {}
	            else
				{
				    clearInterval(inter);
                    inter = setInterval(function(){
                    dx = grid; flag=39;
                    dy = 0;
					context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
                    moveSnake(dx,dy);
                    drawApple();
					},100);
				}
			}
            // down arrow key
            else if (e.keyCode == 40 ) 
            {
                if(flag == 38)
	            {}
	            else
				{
				    clearInterval(inter);
                    inter = setInterval(function(){
				    dx = 0;
                    dy = grid; flag=40;
	                context.clearRect(0, 0, canvas.width,canvas.height);// Clear the Canvas
                    moveSnake(dx,dy);
                    drawApple();
					},100);
				}
            }
			else if(e.keyCode == 13)
			{
			    document.location.reload();
				snake = {
                x : 160,
                y : 160 ,
                cells : [{x:160 , y:160} , {x:144 , y:160}] ,
                };
		        drawSnake();
			}
			else if(e.keyCode == 80 || e.keyCode == 112)
			{
			    clearInterval(inter);
			}
        });