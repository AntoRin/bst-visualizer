//Definition of a Node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.x = window.innerWidth / 2;
    this.y = 100;
    this.radius = 30;
  }
}

//Create a new Node
function newNode(value) {
  let temp = new Node(value);
  return temp;
}

//Track a node on the DOM

let nodeList = [];

function trackNode(distX, distY, radius, data) {
  nodePoint = {
    distX,
    distY,
    radius,
    data,
  };
  nodeList.push(nodePoint);
}

function checkUniqueNode(distX, distY, radius, data) {
  let present = nodeList.filter(
    node =>
      // node.distX === distX &&
      // node.distY === distY &&
      // node.radius === radius &&
      node.data === data
  );

  if (present.length === 0) return false;
  else return true;
}

function pythagoreanDistance(x1, y1, x2, y2) {
  let distX = Math.abs(x1 - x2);
  let distY = Math.abs(y1 - y2);

  let distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

  return distance;
}

function correctCollision(distX) {
  return distX + 100;
}

function checkCollision(distX, distY, radius) {
  let collidingNodes = nodeList.filter(node => {
    let distance = pythagoreanDistance(distX, distY, node.distX, node.distY);
    return distance < radius + node.radius;
  });
  if (collidingNodes.length > 0) {
    distX = correctCollision(distX);
    [distX, distY] = checkCollision(distX, distY, radius);
  }
  return new Array(distX, distY);
}

//Draw a node
function drawNode(ctx, distX, distY, radius, data) {
  if (checkUniqueNode(distX, distY, radius, data)) {
    return new Array(false);
  }
  [distX, distY] = checkCollision(distX, distY, radius);

  ctx.font = "10px Arial";
  ctx.fillText(data, distX, distY);
  ctx.moveTo(distX, distY);
  ctx.beginPath();
  ctx.arc(distX, distY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  trackNode(distX, distY, radius, data);
  return new Array(distX, distY);
}

//Draw node connector
function drawLine(ctx, startX, startY, startRadius, destX, destY, destRadius) {
  ctx.beginPath();
  ctx.moveTo(startX, startY - startRadius);
  ctx.lineTo(destX, destY + destRadius);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.strokeStyle = "black";
}

//Insert a Node into the tree
function nodeInsert(root, value, ctx, index) {
  if (root === null) {
    root = newNode(value);
    if (!root.parent && index === 0) {
      drawNode(ctx, root.x, root.y, root.radius, root.data);
    }
  } else if (value > root.data) {
    root.right = nodeInsert(root.right, value, ctx, index);
    root.right.parent = root;

    // root.right.x = root.x + 100;
    root.right.x = root.right.x > root.x + 100 ? root.right.x : root.x + 100;
    let globalCoordinates = nodeList.find(
      node => node.data === root.right.data
    );
    if (globalCoordinates) {
      root.right.x = globalCoordinates.distX;
    }
    root.right.y = root.y + 70;

    let [distX, distY] = drawNode(
      ctx,
      root.right.x,
      root.right.y,
      root.right.radius,
      root.right.data
    );

    if (distX !== false) {
      root.right.x = distX;
      root.right.y = distY;
    }

    distX !== false &&
      drawLine(
        ctx,
        root.right.x,
        root.right.y,
        root.right.radius,
        root.x,
        root.y,
        root.radius
      );
  } else if (value < root.data) {
    root.left = nodeInsert(root.left, value, ctx, index);
    root.left.parent = root;

    root.left.x = root.x - 100;
    // root.left.x = root.left.x > root.x + 100 ? root.left.x : root.x + 100;
    let globalCoordinates = nodeList.find(node => node.data === root.left.data);
    if (globalCoordinates) {
      root.left.x = globalCoordinates.distX;
    }
    root.left.y = root.y + 70;

    let [distX, distY] = drawNode(
      ctx,
      root.left.x,
      root.left.y,
      root.left.radius,
      root.left.data
    );

    if (distX !== false) {
      root.left.x = distX;
      root.left.y = distY;
    }

    distX !== false &&
      drawLine(
        ctx,
        root.left.x,
        root.left.y,
        root.left.radius,
        root.x,
        root.y,
        root.radius
      );
  } else return root;

  return root;
}

//Display the tree
function inOrder(root) {
  if (root !== null) {
    inOrder(root.left);
    console.log(root.data);
    inOrder(root.right);
  }
}

//Main declarations
let drawTime;
function beginSimulation(nodes) {
  let elements = nodes;
  let root = null;
  let htmlElement = document.getElementById("tree");
  let canvas = document.getElementById("treeCanvas");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodeList = [];
  for (let i = 0; i < elements.length; i++) {
    drawTime = setTimeout(() => {
      root = nodeInsert(root, elements[i], ctx, i);

      // levelOrder(root, ctx, i);
    }, 1000 * (i + 1));
  }
}

function stopSimulation() {
  return new Promise((resolve, reject) => {
    while (drawTime--) clearTimeout(drawTime);

    resolve(true);
  });
}
