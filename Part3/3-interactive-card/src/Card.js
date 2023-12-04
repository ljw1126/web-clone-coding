import * as THREE from 'three';

export default class Card {
  constructor({width, height, color}) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({color}); // 조명 설정해줘야 색상 반영됨

    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;
  }
}