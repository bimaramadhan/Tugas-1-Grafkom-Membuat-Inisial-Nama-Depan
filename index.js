(function(global) {

    var canvas, gl, program;
  
    glUtils.SL.init({ callback:function() { main(); } });
  
    function main() {
      // Register Callbacks
      window.addEventListener('resize', resizer);
  
      // Get canvas element and check if WebGL enabled
      canvas = document.getElementById("glcanvas");
      gl = glUtils.checkWebGL(canvas);
  
      // Initialize the shaders and program
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
          fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
  
      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
  
      gl.useProgram(program);
  
      resizer();
    }
  
    // draw!
    function draw() {
      // renderer info
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Write the positions of vertices to a vertex shader
      // drawPoint();
      // drawLine();
      // drawTriangle();

      var linesVertices = new Float32Array([
        -0.9, +0.8, -0.5, +0.8, 
        -0.5, +0.8, -0.3, +0.5,
        -0.3, +0.5, -0.3, +0.3,
        -0.3, +0.3, -0.5, +0.1,
        -0.5, +0.1, -0.3, -0.2,
        -0.3, -0.2, -0.3, -0.4,
        -0.3, -0.4, -0.5, -0.6,
        -0.5, -0.6, -0.9, -0.6,
        -0.9, -0.6, -0.9, +0.8,

        -0.8, +0.6, -0.55, +0.6, 
        -0.55, +0.6, -0.45, +0.45, 
        -0.45, +0.45, -0.45, +0.4, 
        -0.45, +0.4, -0.55, +0.3, 
        -0.55, +0.3, -0.8, +0.3,
        -0.8, +0.3, -0.8, +0.6, 

        -0.8, -0.1, -0.55, -0.1, 
        -0.55, -0.1, -0.45, -0.25, 
        -0.45, -0.25, -0.45, -0.3, 
        -0.45, -0.3, -0.55, -0.4, 
        -0.55, -0.4, -0.8, -0.4,
        -0.8, -0.4, -0.8, -0.1
      ]);
      var triangleVertices = new Float32Array([
        +0.1, +0.5,
        +0.2, +0.5,
        +0.2, -0.6,

        +0.1, +0.5,
        +0.1, -0.6,
        +0.2, -0.6,

        +0.1, -0.6,
        +0.1, -0.5,
        +0.6, -0.5, 
        
        +0.1, -0.6,
        +0.5, -0.6,
        +0.6, -0.5,

        +0.6, -0.6,
        +0.5, -0.6,
        +0.7, -0.3,

        +0.7, -0.3,
        +0.6, -0.3,
        +0.5, -0.6,

        +0.7, -0.3,
        +0.6, -0.3,
        +0.5, 0.0,

        +0.7, -0.3,
        +0.6, 0.0,
        +0.5, 0.0,

        +0.1, 0.0,
        +0.1, -0.1,
        +0.6, -0.1, 
        
        +0.1, 0.0,
        +0.6, -0.1,
        +0.6, 0.0        
      ]);
      drawA(gl.LINES, linesVertices);
      drawA(gl.TRIANGLES, triangleVertices);
    }

    // Generic format
    function drawA(type, vertices) {
      var n = initBuffers(vertices);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    function initBuffers(vertices) {
      var n = vertices.length / 2;

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      var aPosition = gl.getAttribLocation(program, 'aPosition');
      if (aPosition < 0) {
        console.log('Failed to get the storage location of aPosition');
        return -1;
      }

      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPosition);
      return n;
    }

    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      draw();
  }

})(window || this);