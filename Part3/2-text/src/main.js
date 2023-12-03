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

  camera.position.z = 5;

  /** Controls */
  new OrbitControls(camera, renderer.domElement);

  /**Font */
  const fontLoader = new FontLoader();
  // async, await, promise keyword 검색
  const font =  await fontLoader.loadAsync("./assets/fonts/The Jamsil 3 Regular_Regular.json");

  const textGeometry = new TextGeometry("안녕, 친구들", {
    font,
    size: 0.5,
    height: 0.1 
  })
  const textMaterial = new THREE.MeshPhongMaterial({color : 0x00c896});

  const text = new THREE.Mesh(textGeometry, textMaterial);
  
  scene.add(text);

  // AmbientLight 조명 추가
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  /**PointLight */
  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
  pointLight.position.set(3, 0, 2);

  scene.add(pointLight, pointLightHelper);

  gui
  .add(pointLight.position, 'x')
  .min(-3)
  .max(3)
  .step(0.1);

  render();

  function render() {
    renderer.render(scene, camera);

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