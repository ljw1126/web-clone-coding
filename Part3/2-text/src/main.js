import * as THREE from 'three';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import typeface from './assets/fonts/The Jamsil 3 Regular_Regular.json';

window.addEventListener("load", () => {
  init();
});

function init() {


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

  /**Font */
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(typeface);

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