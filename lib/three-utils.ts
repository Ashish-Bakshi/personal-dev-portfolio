import * as THREE from 'three';

export const createParticleSystem = (count: number = 1000) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
    
    colors[i] = Math.random() * 0.5 + 0.5;
    colors[i + 1] = Math.random() * 0.5 + 0.5;
    colors[i + 2] = Math.random() * 0.5 + 0.5;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });
  
  return new THREE.Points(geometry, material);
};

export const createFloatingGeometry = () => {
  const geometries = [
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.ConeGeometry(0.3, 0.6, 8),
    new THREE.OctahedronGeometry(0.4),
  ];
  
  const materials = [
    new THREE.MeshPhongMaterial({ color: 0x6366f1, transparent: true, opacity: 0.7 }),
    new THREE.MeshPhongMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.7 }),
    new THREE.MeshPhongMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 }),
    new THREE.MeshPhongMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 }),
  ];
  
  const meshes: THREE.Mesh[] = [];
  
  for (let i = 0; i < 15; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.x = (Math.random() - 0.5) * 8;
    mesh.position.y = (Math.random() - 0.5) * 8;
    mesh.position.z = (Math.random() - 0.5) * 8;
    
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;
    
    mesh.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      },
      floatSpeed: Math.random() * 0.02 + 0.01,
      floatOffset: Math.random() * Math.PI * 2,
    };
    
    meshes.push(mesh);
  }
  
  return meshes;
};

export const updateFloatingObjects = (meshes: THREE.Mesh[], time: number) => {
  meshes.forEach((mesh) => {
    const { rotationSpeed, floatSpeed, floatOffset } = mesh.userData;
    
    mesh.rotation.x += rotationSpeed.x;
    mesh.rotation.y += rotationSpeed.y;
    mesh.rotation.z += rotationSpeed.z;
    
    mesh.position.y += Math.sin(time * floatSpeed + floatOffset) * 0.01;
  });
};