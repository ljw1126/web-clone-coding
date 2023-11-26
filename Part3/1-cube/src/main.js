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
  const geometry = new THREE.BoxGeometry(2, 2, 2); // 너비, 높이, 깊이
  const material = new THREE.MeshStandardMaterial({
    color: 0xcc99ff,
    transparent: true, // 불투명도 조절위한 설정 활성화, opacity로 조절
    opacity: 1,
    //visible : false,
    //wireframe: true, // material 뼈대 확인용
    //side: THREE.DoubleSide // 기본 FrontSide, 이외 BackSide, DoubleSide있음(부하 증가)
  });
  
  //material.color = new THREE.Color(0xf0f0f0);

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.set(3, 4, 5); // x, y, z

  camera.lookAt(cube.position);

  // 5. 조명 추가 
  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1);
  directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // mesh 우측 영역까지 은은하게 보이도록 조명 추가
  ambientLight.position.set(3, 2, 1);
  scene.add(ambientLight);

  // 애니메이션 효과 적용
  const clock = new THREE.Clock();

  render();

  function render() {
    //cube.rotation.x = THREE.MathUtils.degToRad(45); // 라디안 단위
    //cube.rotation.x = Date.now() / 1000;
    cube.rotation.x = clock.getElapsedTime(); // delta는 더하는 형태로 사용
    // cube.position.y = Math.sin(cube.rotation.x); // 위 아래 움직임
    // cube.scale.x = Math.cos(cube.rotation.x); // 좌우 방향 

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