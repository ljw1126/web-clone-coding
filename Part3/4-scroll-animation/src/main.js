import * as THREE from 'three';
import {GUI} from 'lil-gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

window.addEventListener('load', function () {
  init();
});

async function init() {
  gsap.registerPlugin(ScrollTrigger);

  const params = {
    waveColor: '#00ffff',
    backgroundColor: '#ffffff',
    fogColor: '#f0f0f0'
  }

  const gui = new GUI();

  const canvas = document.querySelector("#canvas");

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });

  renderer.shadowMap.enabled = true;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  //안개효과 (fog를 더 많이 사용, forexp2는 지수함수 증가로 자연스러움있지만)
  scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500);
  //scene.fog = new THREE.FogExp2(0xf0f0f0, 0.005);

  gui
  .add(scene.fog, 'near')
  .min(0)
  .max(100)
  .step(0.1);

  gui
  .add(scene.fog, 'far')
  .min(100)
  .max(500)
  .step(0.1);

  gui.hide();


  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  camera.position.set(0, 25, 150);

  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
  const waveMaterial = new THREE.MeshStandardMaterial({
    color: params.waveColor,
  });

  //console.log(waveGeometry.attributes.position);
  
  const wave = new THREE.Mesh(waveGeometry, waveMaterial);
  wave.rotation.x = -Math.PI / 2;
  wave.receiveShadow = true;

  const waveHeight = 2.5;
  const initZPositions = [];
  // 파도 생성
  for(let i = 0; i < waveGeometry.attributes.position.count; i++) {
    const z = waveGeometry.attributes.position.getZ(i) + (Math.random() - 0.5) * waveHeight;

    waveGeometry.attributes.position.setZ(i, z);
    initZPositions.push(z);
  }  

  // rendering
  wave.update = () => {
    const elapsedTime = clock.getElapsedTime();

    for(let i = 0; i < waveGeometry.attributes.position.count; i++) {
      const z = initZPositions[i] + Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;

      waveGeometry.attributes.position.setZ(i, z); // i 번째 정점의 z 값 변경
    }
    waveGeometry.attributes.position.needsUpdate = true;

  }

  scene.add(wave); 
  
  // 3d 모델 로드 
  const gltfLoader = new GLTFLoader();
  const gltf = await gltfLoader.loadAsync("./models/ship/scene.gltf");
  const ship = gltf.scene;

  ship.traverse(obj => {
    if(obj.isMesh) obj.castShadow = true;
  })

  ship.update = () => {
    const elapsedTime = clock.getElapsedTime();

    ship.position.y = Math.sin(elapsedTime * 3);
  }

  ship.rotation.y = Math.PI;
  ship.scale.set(50, 50, 1);
  ship.castShadow = true;
  
  scene.add(ship);

  // 조명 
  const pointLight = new THREE.PointLight(0xffffff, 4000, 0);
  pointLight.position.set(15, 15, 15);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.radius = 10;

  scene.add(pointLight);


  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(-15, 15, 15);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 10;

  scene.add(directionalLight);

  const clock = new THREE.Clock();

  render();

  function render() {
    wave.update();
    ship.update();

    camera.lookAt(ship.position);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', handleResize);

  // 애니메이션 
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.wrapper',
      start: 'top top', // 트리거 지정 상단 부분이 뷰포트 하단 영역에 도착하면 트리거 동작
      end: 'bottom bottom',
      //markers: true,
      scrub: true
    }
  })

  tl
  .to(params, {
    waveColor : '#4268ff',
    onUpdate: () => {
       waveMaterial.color = new THREE.Color(params.waveColor); 
    },
    duration: 1.5
  })
  .to(params, {
    backgroundColor : '#2a2a2a',
    onUpdate: () => {
       scene.background = new THREE.Color(params.backgroundColor); 
    },
    duration: 1.5
  }, '<')
  .to(params, {
    fogColor: '#2f2f2f',
    onUpdate: () => {
      scene.fog.color = new THREE.Color(params.fogColor); 
   },
   duration: 1.5
  }, '<') // '<' : gsap timeline option 
  .to(camera.position, {
    x: 100, 
    z: -50,
    duration: 2.5
  })
  .to(ship.position, {
    z: 150,
    duration: 2
  })
  .to(camera.position, {
    x: -50,
    y: 25,
    z: 100,
    duration: 2
  })
  .to(camera.position, {
    x: 0,
    y: 50,
    z: 300,
    duration: 2
  });

  // 타이틀 애니메이션 
  gsap.to(".title", {
    opacity : 0,
    scrollTrigger: {
      trigger: ".wrapper",
      scrub: true,
      pin: true,
      end: "+=1000" // 시작 지점부터 1000px까지
    }
  })
}