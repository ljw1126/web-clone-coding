import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

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


  // OribitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.enableDamping = true; // 관성
  // controls.dampingFactor = 0.01; 
  // controls.enableZoom = true; // 카메라 줌 확대/축소 활성
  // controls.enablePan = true;
  // controls.maxDistance = 50; // 확대 축소 최대 최소
  // controls.minDistance = 10;
  controls.maxPolarAngle = Math.PI / 2; // 수직, 수평 돌아가는 각도도 제어 가능
  controls.minPolarAngle = Math.PI / 3;

  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);



  // 4. 3d object 추가
  const cubeGeometry = new THREE.IcosahedronGeometry(1); // 너비, 높이, 깊이
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcc99ff,
    emissive: 0x111111,
  });

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  
  const skeletonGemometry = new THREE.IcosahedronGeometry(2);
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    color: 0xaaaaaa
  });

  const skeleton = new THREE.Mesh(skeletonGemometry, skeletonMaterial);


  scene.add(cube, skeleton);

  camera.position.z = 5;
  
  // 5. 조명 추가 
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  // 애니메이션 효과 적용
  const clock = new THREE.Clock();

  render();

  function render() {
    const elapsedTime = clock.getElapsedTime();

    // cube.rotation.x = elapsedTime;
    // cube.rotation.y = elapsedTime;

    // skeleton.rotation.x = elapsedTime * 0.5;
    // skeleton.rotation.y = elapsedTime * 0.5;

    renderer.render(scene, camera);

    controls.update();

    requestAnimationFrame(render);
  }

  // 6. resizing 
  function handleResize() {
    camera.aspect = innerWidth / innerHeight; // 종횡비
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight);
    renderer.render(scene, camera);

    controls.update();
  }

  window.addEventListener("resize", handleResize);

  // GUI
  const gui = new GUI();
  //gui.add(cube.position, 'y', -3, 3, 0.1);
  gui
    .add(cube.position, 'y')
    .min(-3)
    .max(3)
    .step(0.1);

  gui.add(cube, 'visible');

  const options = { color: 0x00ffff }
  gui.addColor(options, 'color')
    .onChange((value) => {
      cube.material.color.set(value);
    });
}