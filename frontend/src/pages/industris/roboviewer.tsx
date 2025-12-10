import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

interface Robot {
  id: string;
  name: string;
  modelUrl: string;
}

const RobotViewerPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentModelRef = useRef<THREE.Group | null>(null);

  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotateSpeed, setRotateSpeed] = useState(1);

  const robots: Robot[] = [
    {
      id: 'humanoid',
      name: '🦾 Humanoid',
      modelUrl: '/public/models/humanoid.glb',
    },
    {
      id: 'drone',
      name: '🚁 Drone',
      modelUrl: '/public/models/drone.glb',
    },
    {
      id: 'arm',
      name: '🦾 Arm Robot',
      modelUrl: '/public/models/arm_robot.glb',
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controlsRef.current = controls;

    // Setup lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x2180e1, 0.4);
    pointLight.position.set(-10, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const loadModel = async (robot: Robot) => {
    if (!sceneRef.current || !cameraRef.current) return;

    setIsLoading(true);
    try {
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(robot.modelUrl);

      // Remove previous model
      if (currentModelRef.current) {
        sceneRef.current.remove(currentModelRef.current);
      }

      const model = gltf.scene;
      model.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      sceneRef.current.add(model);
      currentModelRef.current = model;

      // Auto-fit camera
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = cameraRef.current.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 1.5;

      const center = box.getCenter(new THREE.Vector3());
      cameraRef.current.position.set(
        center.x,
        center.y + maxDim * 0.3,
        center.z + cameraZ
      );

      if (controlsRef.current) {
        controlsRef.current.target.copy(center);
        controlsRef.current.update();
      }
    } catch (error) {
      console.error('Failed to load model:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRobotSelect = (robot: Robot) => {
    setSelectedRobot(robot);
    loadModel(robot);
  };

  const handleAutoRotateToggle = () => {
    const newAutoRotate = !autoRotate;
    setAutoRotate(newAutoRotate);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = newAutoRotate;
    }
  };

  const handleRotateSpeedChange = (speed: number) => {
    setRotateSpeed(speed);
    if (controlsRef.current) {
      controlsRef.current.autoRotateSpeed = speed * 2;
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', marginTop: '60px', height: 'calc(100vh - 60px)' }}>
        <aside
          style={{
            width: '280px',
            background: 'var(--color-bg-secondary)',
            borderRight: '1px solid var(--color-border)',
            padding: '1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Robots
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {robots.map(robot => (
                <button
                  key={robot.id}
                  onClick={() => handleRobotSelect(robot)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: selectedRobot?.id === robot.id ? 'rgba(33, 128, 225, 0.15)' : 'var(--color-bg-tertiary)',
                    border: selectedRobot?.id === robot.id ? '1px solid var(--color-primary)' : '1px solid transparent',
                    color: selectedRobot?.id === robot.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  {robot.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Camera
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={handleAutoRotateToggle}
              >
                {autoRotate ? 'Stop Rotate' : 'Auto Rotate'}
              </Button>
              <Button variant="secondary" size="sm" fullWidth>
                Reset View
              </Button>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Speed
            </h3>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={rotateSpeed}
              onChange={e => handleRotateSpeedChange(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>
        </aside>

        <div
          ref={containerRef}
          style={{
            flex: 1,
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(33, 128, 225, 0.05) 0%, rgba(249, 115, 22, 0.02) 100%)',
          }}
        >
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 10,
              }}
            >
              <Spinner size="lg" />
              <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
                Loading 3D model...
              </p>
            </div>
          )}

          {selectedRobot && !isLoading && (
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                right: '1.25rem',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '1rem',
                maxWidth: '300px',
                fontSize: '0.875rem',
                zIndex: 10,
              }}
            >
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--color-text-tertiary)' }}>Model:</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600, marginLeft: '0.5rem' }}>
                  {selectedRobot.name}
                </span>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--color-text-tertiary)' }}>Rotate:</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600, marginLeft: '0.5rem' }}>
                  {autoRotate ? 'On' : 'Off'}
                </span>
              </div>
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                Drag to rotate • Scroll to zoom • Right-click to pan
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RobotViewerPage;