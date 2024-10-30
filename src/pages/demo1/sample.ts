import * as BABYLON from "@babylonjs/core/Legacy/legacy"

export const createScene = function (engine: BABYLON.AbstractEngine, canvas: HTMLCanvasElement) {
  const scene = new BABYLON.Scene(engine)

  // scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), new BABYLON.CannonJSPlugin())

  // Light
  const spot = new BABYLON.PointLight("spot", new BABYLON.Vector3(0, 70, 10), scene)
  spot.diffuse = new BABYLON.Color3(1, 1, 1)
  spot.specular = new BABYLON.Color3(0, 0, 0)

  // Camera
  const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 200, BABYLON.Vector3.Zero(), scene)
  camera.lowerBetaLimit = 0.1
  camera.upperBetaLimit = (Math.PI / 2) * 0.9
  camera.lowerRadiusLimit = 30
  camera.upperRadiusLimit = 300
  camera.attachControl(canvas, true)

  // Ground
  const groundMaterial = new BABYLON.StandardMaterial("ground", scene)
  groundMaterial.diffuseTexture = new BABYLON.Texture("textures/KSF23KPDM00048-B-1@40GYE0005_BASE.jpg", scene)

  const ground = BABYLON.Mesh.CreateGroundFromHeightMap(
    "ground",
    "textures/KSF23KPDM00048-B-1@40GYE0005_DISP.jpg",
    // 400,
    200,
    200,
    40,
    0,
    4,
    scene,
    false,
    function () {
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, {
        mass: 0,
      })

      // const createBall = function () {
      //   const b = BABYLON.Mesh.CreateSphere("s", 8, 8, scene)
      //   b.position.y = 30
      //   b.position.x = Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1)
      //   b.position.z = Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1)
      //   b.physicsImpostor = new BABYLON.PhysicsImpostor(b, BABYLON.PhysicsImpostor.SphereImpostor, {
      //     mass: 1,
      //     friction: 0,
      //     restitution: 0,
      //   })
      // }

      for (let ii = 0; ii < 10; ii++) {
        // createBall()
      }

      scene.onPointerUp = function () {
        scene.meshes.forEach(function (m) {
          if (m.name == "s") {
            m.applyImpulse(
              new BABYLON.Vector3(Math.random(), 0, Math.random()).scale(Math.random() < 0.5 ? -15 : 15),
              m.getAbsolutePosition(),
            )
          }
        })
      }

      scene.registerBeforeRender(function () {
        scene.meshes.forEach(function (m) {
          if (m.name == "s" && m.position.y < 0) {
            m.dispose()
            // createBall()
          }
        })
      })
    },
  )
  ground.material = groundMaterial

  return scene
}
