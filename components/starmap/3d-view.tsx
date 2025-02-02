// import { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { Star } from '@/types/star.types';

// interface StarMap3DProps {
//   stars: Star[];
//   onStarSelect: (star: Star) => void;
//   showConstellations?: boolean;
//   constellations?: Array<{ id: number; name: string; stars: Star[] }>;
// }

// export default function StarMap3D({ stars, onStarSelect, showConstellations, constellations }: StarMap3DProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [hoveredStar, setHoveredStar] = useState<Star | null>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x000011); // Dark blue background

//     // Camera setup
//     const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
//     camera.position.set(0, 0, 100);

//     // Renderer setup
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     containerRef.current.appendChild(renderer.domElement);

//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
//     scene.add(ambientLight);

//     const pointLight = new THREE.PointLight(0xffffff, 1);
//     pointLight.position.set(100, 100, 100);
//     scene.add(pointLight);

//     // Stars container
//     const starObjects = new Map<THREE.Mesh, Star>();

//     // Create stars
//     stars.forEach((star) => {
//       const size = Math.max(0.1, 2 - star.mag / 5);
//       const geometry = new THREE.SphereGeometry(size, 32, 32);

//       // Create glowing material
//       const material = new THREE.MeshPhongMaterial({
//         color: getStarColor(star.spect),
//         emissive: getStarColor(star.spect),
//         emissiveIntensity: 0.7,
//         shininess: 100
//       });

//       const mesh = new THREE.Mesh(geometry, material);

//       // Position star
//       const scaleFactor = 10;
//       mesh.position.set(star.x * scaleFactor, star.y * scaleFactor, star.z * scaleFactor);

//       starObjects.set(mesh, star);
//       scene.add(mesh);

//       // Add glow effect
//       const glowGeometry = new THREE.SphereGeometry(size * 1.2, 32, 32);
//       const glowMaterial = new THREE.MeshBasicMaterial({
//         color: getStarColor(star.spect),
//         transparent: true,
//         opacity: 0.3
//       });
//       const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
//       glowMesh.position.copy(mesh.position);
//       scene.add(glowMesh);
//     });

//     // Constellation lines
//     if (showConstellations && constellations) {
//       constellations.forEach((constellation) => {
//         if (constellation.stars.length > 1) {
//           const material = new THREE.LineBasicMaterial({
//             color: 0x444444,
//             transparent: true,
//             opacity: 0.3
//           });

//           const points: THREE.Vector3[] = [];
//           constellation.stars.forEach((star) => {
//             points.push(new THREE.Vector3(star.x * 10, star.y * 10, star.z * 10));
//           });

//           const geometry = new THREE.BufferGeometry().setFromPoints(points);
//           const line = new THREE.Line(geometry, material);
//           scene.add(line);
//         }
//       });
//     }

//     // Raycaster for interactions
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();

//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     controls.rotateSpeed = 0.5;
//     controls.zoomSpeed = 1.2;

//     // Event handlers
//     function onMouseMove(_event: MouseEvent) {
//       mouse.x = (_event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(_event.clientY / window.innerHeight) * 2 + 1;

//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(Array.from(starObjects.keys()));

//       if (intersects.length > 0) {
//         const star = starObjects.get(intersects[0].object as THREE.Mesh);
//         if (star) setHoveredStar(star);
//       } else {
//         setHoveredStar(null);
//       }
//     }

//     function onClick(_event: MouseEvent) {
//       // Le underscore indique que le paramètre est intentionnellement non utilisé
//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(Array.from(starObjects.keys()));

//       if (intersects.length > 0) {
//         const star = starObjects.get(intersects[0].object as THREE.Mesh);
//         if (star) onStarSelect(star);
//       }
//     }

//     renderer.domElement.addEventListener('mousemove', onMouseMove);
//     renderer.domElement.addEventListener('click', onClick);

//     // Animation loop
//     function animate() {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     }

//     // Handle window resize
//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }

//     window.addEventListener('resize', onWindowResize);
//     animate();

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', onWindowResize);
//       renderer.domElement.removeEventListener('mousemove', onMouseMove);
//       renderer.domElement.removeEventListener('click', onClick);
//       renderer.dispose();
//     };
//   }, [stars, showConstellations, constellations, onStarSelect]);

//   return (
//     <div className="relative w-full h-screen">
//       <div ref={containerRef} className="w-full h-full" />
//       {hoveredStar && (
//         <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded">
//           <h3>{hoveredStar.bf || `Star ${hoveredStar.id}`}</h3>
//           <p>Magnitude: {hoveredStar.mag}</p>
//           <p>Constellation: {hoveredStar.constellation?.name}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// // Fonction pour déterminer la couleur de l'étoile basée sur son type spectral
// function getStarColor(spectralType: string): number {
//   const colors = {
//     O: 0x4895f7, // Bleu brillant
//     B: 0x8ad4ff, // Bleu-blanc
//     A: 0xffffff, // Blanc
//     F: 0xfff7c6, // Blanc-jaune
//     G: 0xffe64b, // Jaune
//     K: 0xffaa33, // Orange
//     M: 0xff4b4b // Rouge
//   };

//   const type = spectralType.charAt(0).toUpperCase();
//   return colors[type as keyof typeof colors] || 0xffffff;
// }
