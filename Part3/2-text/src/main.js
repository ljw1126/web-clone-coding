import * as THREE from 'three';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui';

window.addEventListener("load", () => {
  init();
});

async function init() {
  const gui = new GUI();

  // 1. 캔버스 가짐
  const renderer = new THREE.WebGL1Renderer({
    antialias: true // 큐브 면에 까끌한거 제거
  });

  document.body.appendChild(renderer.domElement);

  renderer.setSize(innerWidth, innerHeight); //캔버스 사이즈 조정

  // 2. Scene 생성 
  const scene = new THREE.Scene();

  // 3. 카메라 생성
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    1,
    500
  )

  camera.position.set(0, 1, 5);

  /** Controls */
  new OrbitControls(camera, renderer.domElement);

  /**Font */
  const fontLoader = new FontLoader();
  // async, await, promise keyword 검색
  const font =  await fontLoader.loadAsync("./assets/fonts/The Jamsil 3 Regular_Regular.json");

  const textGeometry = new TextGeometry("Three.js Interactive Web", {
    font,
    size: 0.5,
    height: 0.1 ,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02
  })
  const textMaterial = new THREE.MeshPhongMaterial();

  const text = new THREE.Mesh(textGeometry, textMaterial);
  
  textGeometry.center();

  /**texture */
  const textureLoader = new THREE.TextureLoader().setPath('./assets/textures/');
  const textTexture = textureLoader.load('holographic.jpeg');
  
  textMaterial.map = textTexture;

  scene.add(text);

  // Plane, 텍스트 뒤 평면 추가
  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  const planeMaterial = new THREE.MeshPhongMaterial({color:0x000000});
  
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.z = -10;
  scene.add(plane);

  // AmbientLight 조명 추가
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  // SpotLight 빛의 색상, 강도, 거리, 빛이 퍼지는 각도, 감쇠정도, 거리에 따라 빛이 어두워지는 각 
  const spotLight = new THREE.SpotLight(0xffffff, 15, 30, Math.PI * 0.15, 0.2, 0.5);
  spotLight.position.set(0, 0, 3);
  spotLight.target.position.set(0, 0, -3);
  scene.add(spotLight, spotLight.target);

  const spotLightHelpder = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelpder);

  const spotLightFolder = gui.addFolder('SpotLight');
  spotLightFolder
  .add(spotLight, 'angle')
  .min(0)
  .max(Math.PI / 2)
  .step(0.01);

  spotLightFolder
  .add(spotLight.position, 'z')
  .min(1)
  .max(10)
  .step(0.01)
  .name('position.z');

  spotLightFolder
  .add(spotLight, 'distance')
  .min(1)
  .max(30)
  .step(0.01);

  // 빛의 거리에 따라 희미해지는 정도 decay
  spotLightFolder
  .add(spotLight, 'decay')
  .min(0)
  .max(10)
  .step(0.01);

  spotLightFolder
  .add(spotLight, 'penumbra')
  .min(0)
  .max(1)
  .step(0.01);

  render();

  function render() {
    renderer.render(scene, camera);

    spotLightHelpder.update();

    requestAnimationFrame(render);
  }

  
  function handleResize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}