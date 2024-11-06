<template>
  <div>
    <div class="h-screen  bg-black z-50 relative overflow-hidden">


      <canvas class="absolute -z-50 top-0 left-0 w-full h-full" ref="canvas"></canvas>
      <h1 class="welcome-text font-animeAce3_bold text-white z-50">{{ title }}</h1>
      <div class="text-center mt-8">
        <NuxtLink to="/modulos"
          class="font-animeAce3 px-8 py-4 text-xl border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-black">
          Ingresar al Portal
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

const title = 'Curso de Dibujo de anime';
const canvas = ref(null);
const particles = [];
const particleCount = 80;

onMounted(() => {
  const ctx = canvas.value.getContext('2d');
  let width, height;


  const resize = () => {
    width = canvas.value.width = window.innerWidth;
    height = canvas.value.height = window.innerHeight;
  };

  // ejecutar -> resize()

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 - 1;
      this.radius = Math.random() * 3 + 1;
      this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
    }



    update() {


      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const init = () => {
    resize();
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };

  const animate = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  };

  init();
  init();
  animate();

  window.addEventListener('resize', resize);
});

</script>

<style scoped>
.welcome-text {
  @apply text-center pt-40 text-6xl shadow-lg !z-50;
}
</style>