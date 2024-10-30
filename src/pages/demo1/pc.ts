import { defineComponent, onMounted, ref } from "vue"
import { createScene } from "./sample"
import * as BABYLON from "@babylonjs/core/Legacy/legacy"

export default defineComponent({
  name: "BabylonDemo1Page",
  setup() {
    const bjsCanvas = ref<HTMLCanvasElement | null>(null)

    onMounted(() => {
      if (bjsCanvas.value) {
        const antialias = true
        const forceSRGBBufferSupportState = true
        const enging = new BABYLON.Engine(bjsCanvas.value, antialias, {
          useHighPrecisionMatrix: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: true,
          antialias,
          forceSRGBBufferSupportState,
        })
        const scene = createScene(enging, bjsCanvas.value)
        window.addEventListener("resize", () => {
          enging.resize()
        })
        enging.runRenderLoop(() => {
          scene.render()
        })
      }
    })

    return { bjsCanvas }
  },
})
