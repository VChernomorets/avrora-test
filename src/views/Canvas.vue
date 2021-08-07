<template>
  <div class="wrapper">
    <div class="container">
      <div class="imageLoad">
        <label>
          Загрузить изображение:
          <input type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()"/>
        </label>
      </div>
      <div class="viewPoints">
       <span v-if="points.length">
         {{
           points.map(item => {
             return {x: item.x, y: item.y}
           })
         }}
       </span>

      </div>
      <div class="canvas" v-show="backgroundImage !== ''">
        <canvas id="draw" width="300" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  data() {
    return {
      file: '',
      showPreview: false,
      imagePreview: '',
      backgroundImage: '',
      context: null,
      canvas: null,
      mouse: {
        x: 0,
        y: 0,
        pressed: false,
      },
      circle: {
        color: '#f56',
        size: 6,
        strokeStyle: 'grey',
        lineWidth: .3
      },
      points: [],
      polygon: {
        color: 'rgba(190,255,172,0.3)'
      }
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        this.showPreview = true;
        this.imagePreview = reader.result;
      }.bind(this), false);
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
    drawImage() {
      this.context.beginPath();
      this.context.canvas.width = this.backgroundImage.width;
      this.context.canvas.height = this.backgroundImage.height;
      this.context.drawImage(this.backgroundImage, 0, 0);
      this.context.stroke();
      this.context.closePath();
    },
    clickProcess() {
      let point = this.points.filter(item => {
        return Math.sqrt(((this.mouse.x - item.x) * (this.mouse.x - item.x)) + (this.mouse.y - item.y) * (this.mouse.y - item.y)) <= this.circle.size
      })
      if (point.length > 0) {
        point[0].active = true;
      } else {
        this.points.push({
          x: this.mouse.x,
          y: this.mouse.y,
          active: false,
        });
        this.drawPoints()
      }
    },
    drawPoints() {
      this.clearCanvas();
      this.drawImage();
      this.drawPolygon();
      this.points.forEach((item) => {
        this.context.beginPath();
        this.context.arc(item.x, item.y, this.circle.size, 0, Math.PI * 2, false);
        this.context.stroke.style = this.circle.strokeStyle;
        this.context.lineWidth = this.circle.lineWidth;
        this.context.fillStyle = this.circle.color;
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
      })
    },
    drawPolygon() {
      if (this.points.length > 2) {
        let points = this.points.slice();
        const firstPoint = points.shift();
        this.context.beginPath();
        this.context.moveTo(firstPoint.x, firstPoint.y);
        points.forEach((item) => {
          this.context.lineTo(item.x, item.y);
        })
        this.context.fillStyle = this.polygon.color;
        this.context.fill();
      }
    },
    clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    movePoint() {
      let active = this.points.filter((item) => {
        return item.active;
      })
      if (active.length === 1) {
        active[0].x = this.mouse.x;
        active[0].y = this.mouse.y;
        this.drawPoints();
      }
    }
  },
  watch: {
    imagePreview: function () {
      let backgroundImage = new Image();
      backgroundImage.src = this.imagePreview;
      this.backgroundImage = backgroundImage;
      backgroundImage.onload = () => {
        this.drawImage();
        this.points = [];
      };
    }
  },
  mounted() {
    this.canvas = document.getElementById("draw");

    this.canvas.addEventListener('mousedown', () => {
      this.mouse.pressed = true;
      this.clickProcess();
    })
    this.canvas.addEventListener('mouseup', () => {
      this.mouse.pressed = false;
      this.points.map(item => {
        item.active = false;
      })
    })

    this.canvas.addEventListener('mousemove', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = event.clientX - rect.left;
      this.mouse.y = event.clientY - rect.top;
      if (this.points.filter((item) => {
        return item.active
      }).length === 1) {
        this.movePoint();
      }
    });

    this.context = this.canvas.getContext("2d");
  },
}
</script>

<style scoped>
#draw {
  border: 1px solid #2c3e50;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.imageLoad {
  margin: 20px 0;
}

.canvas {
  max-width: 90vw;
  max-height: 90vw;
  overflow-x: auto;
  overflow-y: auto;
}

.viewPoints {
  background-color: white;
  margin-bottom: 20px;
  max-width: 700px;
}
</style>