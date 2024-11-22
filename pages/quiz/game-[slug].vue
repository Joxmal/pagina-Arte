<template>
  <div v-if="!showQuiz" class="text-[200px] w-full h-full flex justify-center">
    <ContadorBasic @success-count="revelar" :iniciarContador="initContador" />
  </div>

  <div v-else>
    {{ numeroActualQuiz }}/23

    <div v-if="!finalizado">
      <div v-if="quiz?.quiz" class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: progressPercentage + '%' }"></div>
      </div>

      <div class="flex px-2 text-center flex-col justify-center content-center items-center ">
        <div class="text-xl font-bold py-1">
          {{ quiz?.quiz.question }}
        </div>


        <div class="relative w-60 h-40 md:size-96 rounded-lg overflow-auto">
          <ImgAleatorio v-if="!disabledButton" />

          <img v-else class="rounded-lg w-full h-full object-cover " :src="'/images/quiz/' + quiz?.quiz.image">

        </div>


        <div class="flex flex-wrap  ">
          <ButtonGreenToBlue @click="responderQuiz(option)" class="m-2 text-lg  w-1/3 flex-auto  "
            v-for="(option, index) in shuffledOptions" :title="option" :key="index" :disabled="disabledButton" />

        </div>
        <div v-if="messageQuiz.length > 0" :class="typeMessageQuiz ? 'text-green-800' : 'text-red-800'">
          {{ messageQuiz }}
        </div>
      </div>

      <div class="flex justify-center items-center transition-all ease-in-out  hover:text-green-800">
        <button v-if="!loadingButton" :disabled="finalizado" @click="obtenerQuiz"
          class=" border-black p-2 rounded-xl border-2  mt-6   ">
          NUEVO QUIZ
          <Icon name="mdi:arrow-right" />
        </button>

        <Icon v-else name="eos-icons:loading" size="40"></Icon>
      </div>
    </div>

    <div v-else class="text-4xl text-center  flex flex-col items-center ">
      <div class="mb-10">
        <img :src="gifQuizFinal" class="mx-auto rounded-lg">
        {{ puntos }} Puntos
      </div>

      <div class="w-full text-xl mt-4 mb-6  max-w-96 ">
        <form action="" @submit.prevent="guardar" class="flex flex-col">
          <label class="flex  flex-col">Quieres Guardar ???
            <input class="border text-center border-black rounded-md " type="text" v-model="nombre">
          </label>
          <button type="submit" class="w-fit mx-auto">
            <Icon size="40" class="hover:bg-green-600 rounded-full" name="mdi-content-save" />
          </button>
        </form>
      </div>


      <ButtonGreenToBlue @click="reiniciarGame" title="REINICIAR" />
    </div>

    <hr class="h-[2px] w-[90%] rounded mx-auto my-20 border-0 bg-gray-700">
    <h2 class="text-center">PUNTUACIÓN</h2>
    <div class="relative overflow-x-auto shadow-md rounded-lg md:w-full mx-auto w-[90%]">
      <table class="w-full text-sm text-left rtl:text-right text-blue-100 ">
        <thead class="text-xs text-white uppercase bg-blue-600 ">
          <tr>
            <th scope="col" class="px-6 py-3">
              NOMBRES
            </th>
            <th scope="col" class="px-6 py-3">
              PUNTOS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in score?.sensitiveData" :key="index" class=" border-b border-blue-400 text-black">
            <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap ">
              {{ score.nombre }}
            </th>
            <td class="px-6 py-4">
              {{ score.score }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>





</template>

<script setup lang="ts">
// extraer parametros

const { slug = 'easy' }: { slug?: string } = useRoute().params

const mode = ref('easy')

const modeMap: Record<string, string> = {
  easy: 'easy',
  hardcore: 'hardcore'
}

mode.value = modeMap[slug]




//revelar
const showQuiz = ref(false)
//contador

const initContador = ref(0)
function revelar() {
  showQuiz.value = true
}

//función para mezclar el array

// Función para mezclar el arreglo
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};
// Propiedad computada para obtener las opciones mezcladas
const shuffledOptions = computed(() => {
  if (quiz.value)
    return shuffleArray([...quiz.value?.quiz.options])
});
export interface Score {
  sensitiveData: SensitiveDatum[];
}

export interface SensitiveDatum {
  id: number;
  created_at: Date;
  nombre: string;
  score: number;
}

//obtener score
const score = ref<Score>()
async function obtenerScore() {
  const data = await $fetch<Score>('/api/anime/score', {
    method: 'GET',
    query: {
      mode: mode.value
    }
  })
  score.value = data

}

//------

export interface Quiz {
  totalQuiz: number
  numeroQuiz: number;
  quiz: QuizClass;
}

export interface QuizClass {
  image: string;
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

const gifQuizFinal = computed(() => {

  if (quiz.value)
    if (puntos.value <= 70) {
      return '/images/quiz/gif1.webp'
    } else if (puntos.value > 70) {
      return '/images/quiz/2.gif'
    } else if (puntos.value === quiz.value?.totalQuiz * 10) {
      return '/images/quiz/3.gif'
    }

})




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
  obtenerScore()
  setTimeout(() => {
    initContador.value++
  }, 500);
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

  loadingButton.value = true
  try {
    if (quiz.value && numeroActualQuiz.value === quiz.value.totalQuiz) {
      finalizado.value = true
      calcularPuntos()
      return
    }


    const dataTwice = await $fetch<Quiz>('/api/anime/quizAnime', {
      method: 'GET',
      params: {
        responses: [quizRespondidos.value],
        mode: mode.value
      }
    })

    numeroActualQuiz.value++
    messageQuiz.value = ''
    disabledButton.value = false
    quiz.value = dataTwice
    loadingButton.value = false

  } catch (error) {
    loadingButton.value = false
    console.error(error)
  }
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


const loadingButton = ref(false)
async function responderQuiz(option: string) {

  loadingButton.value = true

  const response = await $fetch<ResponseQuiz>('/api/anime/responseQuizAnime', {
    method: 'POST',
    body: {
      quizNumber: quiz.value?.numeroQuiz,
      quizResponse: option,
      mode: mode.value
    }
  })


  loadingButton.value = false

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

// guardar


const nombre = ref('')

async function guardar() {
  const dataTwice = await $fetch<Quiz>('/api/anime/score', {
    method: 'POST',
    body: {
      score: puntos.value,
      nombre: nombre.value,
      mode: mode.value
    }
  })
  obtenerScore()
  reiniciarGame()
}

</script>