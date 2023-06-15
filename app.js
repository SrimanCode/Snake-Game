const gridSize = 50;
let snake = [{ x: 10, y: 10 }];
let snakeSize = 1;
let direction = 'right';
let food = { x: 5, y: 5 };
let table = document.getElementById('board');

// Function to create the game board
function board() {
  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < gridSize; j++) {
      let cell = document.createElement('td');
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}
// Function to draw the snake and food on the board
function drawSnakeAndFood() {
  table.querySelectorAll('td').forEach((cell) => {
    cell.classList.remove('snake', 'food');
  });

  // Draw the snake
  snake.forEach((position) => {
    let cell = table.rows[position.y].cells[position.x];
    cell.classList.add('snake');
  });
  let foodCell = table.rows[food.y].cells[food.x];
  foodCell.classList.add('food');
}

// Function to update the snake's position
function updateSnake() {
  // Determine the new head position based on the current direction
  let head = Object.assign({}, snake[0]); // Create a copy of the head object
  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }
  if (head.x === food.x && head.y === food.y) {
    snakeSize++;
    generateFood();
  } else {
    snake.pop();
  }
  if (hasSnakeCollision()) {
    endGame();
    return;
  }
  if (head.x < 0) {
    head.x = gridSize - 1;
    direction = 'left';
  }
  if (head.x == gridSize) {
    head.x = 0;
    direction = 'right';
  }
  if (head.y == -1) {
    head.y = gridSize - 1;
    direction = 'up';
  }
  if (head.y == gridSize) {
    head.y = 0
    direction = 'down';
  }
  // Add the new head to the snake
  snake.unshift(head);
}

// Function to generate new food position
function generateFood() {
  food.x = Math.floor(Math.random() * gridSize);
  food.y = Math.floor(Math.random() * gridSize);
}

// Function to check if the snake has collided with itself
function hasSnakeCollision() {
  let head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function handleKeyPress(event) {
    switch (event.keyCode) {
      case 37: // Left arrow key
        if (direction !== 'right') {
          direction = 'left';
        }
        break;
      case 38: // Up arrow key
        if (direction !== 'down') {
          direction = 'up';
        }
        break;
      case 39: // Right arrow key
        if (direction !== 'left') {
          direction = 'right';
        }
        break;
      case 40: // Down arrow key
        if (direction !== 'up') {
          direction = 'down';
        }
        break;
    }
  }
  document.addEventListener('keydown', handleKeyPress);

  function endGame() {
    alert('Game Over! Your score is: ' + (snakeSize - 1));
    snake = [{ x: 10, y: 10 }];
    snakeSize = 1;
    direction = 'right';
    generateFood();
  }
  
  function gameLoop() {
    updateSnake();
    drawSnakeAndFood();
    setTimeout(gameLoop, 100);
  }
  board();
  generateFood();
  gameLoop();