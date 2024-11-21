<template>
  <div>
    <h1> {{ count }}</h1>
  </div>
</template>

<script setup lang="ts">

interface Props {
  contador?: number
  iniciarContador?: number
  reset?: number
}
const props = withDefaults(defineProps<Props>(), {
  contador: 3,
  iniciarContador: 0,
  reset: 0

})

watch(
  () => props.iniciarContador, // Función que devuelve el valor a observar
  (newValue, oldValue) => {
    if (props.iniciarContador > 0)
      startCountdown()
    // Aquí puedes realizar acciones adicionales en respuesta al cambio
  }
);

watch(
  () => props.reset, // Función que devuelve el valor a observar
  (newValue, oldValue) => {
    if (props.reset > 0)
      reset()
    // Aquí puedes realizar acciones adicionales en respuesta al cambio
  }
);

const emit = defineEmits<{
  (e: 'successCount', payload: boolean): void; // Declaración del evento 'message' con un payload de tipo string
}>();


const count = ref(props.contador)
const isCounting = ref(false); // Estado para saber si está contando
let interval: NodeJS.Timeout; // Variable para almacenar el intervalo

const startCountdown = () => {
  if (isCounting.value) return; // Evita iniciar si ya está contando
  isCounting.value = true; // Cambia el estado a contando
  count.value = 3; // Reinicia el contador a 3

  interval = setInterval(() => {
    if (count.value > 0) {
      count.value--; // Decremento el contador
    } else {
      clearInterval(interval); // Detiene el intervalo al llegar a 0
      isCounting.value = false; // Cambia el estado a no contando
      emit('successCount', true)
    }
  }, 1000); // Actualiza cada segundo
};

const reset = () => {
  clearInterval(interval); // Detiene el intervalo si está activo
  count.value = 3; // Reinicia el contador a 3
  isCounting.value = false; // Cambia el estado a no contando
};

onUnmounted(() => {
  clearInterval(interval); // Asegúrate de limpiar el intervalo al desmontar el componente
});
</script>
