import * as THREE from 'three';

export default class Card {
  constructor({width, height, color, radius}) {
    const x = width / 2 - radius;
    const y = height / 2 - radius;
    const shape = new THREE.Shape();

    // 각도는 호도법
    shape
     .absarc(x, y, radius, Math.PI / 2, 0, true)
     .lineTo(x + radius, -y)
     .absarc(x, -y, radius, 0, -Math.PI / 2, true) 
     .lineTo(-x, -(y + radius))
     .absarc(-x, -y, radius, -Math.PI / 2, Math.PI, true)
     .lineTo(-(x + radius), y)
     .absarc(-x, y, radius, Math.PI, Math.PI / 2, true);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.01,
      bevelThickness: 0.1
    });
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide ,
      roughness: 0.5,
      metalness: 0.5
    }); // 조명 설정해줘야 색상 반영됨

    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;
  }
}