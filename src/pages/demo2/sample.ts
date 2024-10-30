import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import * as cannon from "cannon"
window.CANNON = cannon
export const createScene = async function (engine: BABYLON.AbstractEngine, canvas: HTMLCanvasElement) {
  // This creates a basic Babylon Scene object (non-mesh)
  const scene = new BABYLON.Scene(engine)

  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.ArcRotateCamera("camera", 0, 1, 120, BABYLON.Vector3.Zero(), scene)
  camera.attachControl(canvas, true)

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero())

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true)

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene)

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7

  // Our built-in 'sphere' shape.
  // const loadedData = await BABYLON.SceneLoader.ImportMeshAsync("", "scenes/", "skull.babylon", scene)
  const loadedData = await BABYLON.SceneLoader.ImportMeshAsync("", "shinny/", "shinny.babylon", scene)
  const skull = loadedData.meshes[0]
  skull.position.set(0, 0, 0)

  // const positions = skull.getVerticesData(BABYLON.VertexBuffer.PositionKind)!
  // const updatedPositions = new Float32Array(positions.length)

  // // lattice
  // const lattice = new BABYLON.Lattice({
  //   resolutionY: 10,
  //   autoAdaptToMesh: skull as BABYLON.Mesh,
  //   position: BABYLON.Vector3.Zero(),
  // })

  scene.onBeforeRenderObservable.add(() => {
    // // Twist!!
    // for (let x = 0; x < lattice.resolutionX; x++) {
    //   for (let y = 0; y < lattice.resolutionY; y++) {
    //     for (let z = 0; z < lattice.resolutionZ; z++) {
    //       const angle = (y / lattice.resolutionY) * 0.02
    //       const control = lattice.data[x][y][z]
    //       const cx = control.x
    //       const cz = control.z

    //       const cosAngle = Math.cos(angle)
    //       const sinAngle = Math.sin(angle)

    //       // Rotation
    //       control.x = cosAngle * cx - sinAngle * cz
    //       control.z = sinAngle * cx + cosAngle * cz
    //     }
    //   }
    // }

    // lattice.deform(positions, updatedPositions)
    // skull.setVerticesData(BABYLON.VertexBuffer.PositionKind, updatedPositions)
    skull.createNormals(true)
  })
  return scene
}
