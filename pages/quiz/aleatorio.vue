<template>

  {{ numeroActualQuiz }}/23

  <div v-if="!finalizado">
    <div v-if="quiz?.quiz" class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: progressPercentage + '%' }"></div>
    </div>



    <div class="flex px-2 text-center flex-col justify-center content-center items-center ">
      <div class="text-2xl font-bold py-4">
        {{ quiz?.quiz.question }}
      </div>
      <div class="flex flex-wrap  ">
        <ButtonGreenToBlue @click="responderQuiz(index)" class="m-2 text-lg  w-1/3 flex-auto  "
          v-for="(option, index) in quiz?.quiz.options" :title="option" :key="option" :disabled="disabledButton" />
      </div>
      <div v-if="messageQuiz.length > 0" :class="typeMessageQuiz ? 'text-green-800' : 'text-red-800'">
        {{ messageQuiz }}
      </div>
    </div>

    <div class="flex justify-center items-center transition-all ease-in-out  hover:scale-110">
      <button :disabled="finalizado" @click="obtenerQuiz" class=" border-black p-2 rounded-xl border-2  mt-6 ">
        NUEVO QUIZ
        <Icon name="mdi:arrow-right" />
      </button>
    </div>
  </div>

  <div v-else class="text-4xl text-center">
    <div class="mb-10">
      <img src="/images/quiz/2.gif" class="mx-auto rounded-lg">
      {{ puntos }} Puntos
    </div>

    <ButtonGreenToBlue @click="reiniciarGame" title="REINICIAR" />
  </div>
</template>

<script setup lang="ts">

export interface Quiz {
  totalQuiz: number
  numeroQuiz: number;
  quiz: QuizClass;
}

export interface QuizClass {
  question: string;
  options: string[];
  answer: string;
}

const quiz = ref<Quiz>()
const disabledButton = ref(false)
const messageQuiz = ref('')
const typeMessageQuiz = ref(false)


const numeroActualQuiz = ref(0)
const quizRespondidos = ref([]) as Ref<number[]>
const respuestasCorrectas = ref([]) as Ref<number[]>
const respuestasIncorrectas = ref([]) as Ref<number[]>



const finalizado = ref(false)

const puntos = ref(0)


function reiniciarGame() {
  disabledButton.value = false
  messageQuiz.value = ''
  typeMessageQuiz.value = false
  numeroActualQuiz.value = 0,
    quizRespondidos.value = [],
    respuestasCorrectas.value = []
  respuestasIncorrectas.value = []
  finalizado.value = false

  obtenerQuiz()
}

onMounted(async () => {
  await obtenerQuiz()
})

const progressPercentage = computed(() => {
  if (quiz.value)
    return (numeroActualQuiz.value / quiz.value?.totalQuiz) * 100
});

// single ref


function calcularPuntos() {

  let puntosCalcular = 0
  respuestasCorrectas.value.forEach(item => puntosCalcular += 10)
  puntos.value = puntosCalcular
}



async function obtenerQuiz() {

  if (quiz.value && numeroActualQuiz.value === quiz.value.totalQuiz) {
    finalizado.value = true
    calcularPuntos()
    return
  }


  const dataTwice = await $fetch<Quiz>('/api/anime/quizAnime', {
    method: 'GET',
    params: {
      responses: [quizRespondidos.value]
    }
  })

  numeroActualQuiz.value++
  messageQuiz.value = ''
  disabledButton.value = false
  quiz.value = dataTwice
}


export interface ResponseQuiz {
  quiz: Quiz;
  correcto: boolean;
}

export interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

async function responderQuiz(option: number) {

  const response = await $fetch<ResponseQuiz>('/api/anime/responseQuizAnime', {
    method: 'POST',
    body: {
      quizNumber: quiz.value?.numeroQuiz,
      quizResponse: option
    }
  })




  if (response.correcto === true && quiz.value) {

    respuestasCorrectas.value.push(quiz.value.numeroQuiz)
    disabledButton.value = true
    messageQuiz.value = 'Correcto'
    typeMessageQuiz.value = true

    quizRespondidos.value.push(quiz.value.numeroQuiz)
    return true

  } else if (response.correcto === false && quiz.value) {
    respuestasIncorrectas.value.push(quiz.value.numeroQuiz)
    disabledButton.value = true
    messageQuiz.value = ` Incorrecto, la respuesta Correcta es: ${quiz.value.quiz.answer}`
    typeMessageQuiz.value = false
    quizRespondidos.value.push(quiz.value.numeroQuiz)
    return false

  }


  if (quiz.value && numeroActualQuiz.value === quiz.value.totalQuiz) {
    finalizado.value = true
    calcularPuntos()
    return
  }
}



</script>