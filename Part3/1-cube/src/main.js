import * as THREE from 'three';

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

    cube.rotation.x = elapsedTime;
    cube.rotation.y = elapsedTime;

    skeleton.rotation.x = elapsedTime * 0.5;
    skeleton.rotation.y = elapsedTime * 0.5;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  // 6. resizing 
  function handleResize() {
    camera.aspect = innerWidth / innerHeight; // 종횡비
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}