var renderer = new THREE.WebGLRenderer({ alpha: true }),
COLORS = [0x69D2E7, 0xA7DBD8, 0xE0E4CC, 0xF38630, 0xFA6900, 0xFF4E50, 0xF9D423],
RADIUS = 250,
spheres = [],
camera,scene,geometry,material,mesh;

Sketch.create({

  type: Sketch.WEBGL,
  element: renderer.domElement,
  context: renderer.context,

  setup() {

    camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.SphereGeometry(RADIUS, 30, 30);
    material = new THREE.MeshBasicMaterial({ color: 0x333344 });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    for (var i = 0; i < 30; i++) {
      geometry = new THREE.SphereGeometry(random(5, 20), 10, 10);
      material = new THREE.MeshBasicMaterial({ color: random(COLORS) });
      geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, RADIUS, 0));
      mesh = new THREE.Mesh(geometry, material);

      mesh.rotation.x = random(100);
      mesh.rotation.y = random(100);
      mesh.rotation.z = random(100);

      scene.add(mesh);

      spheres.push(mesh);
    }
  },

  resize() {

    camera.aspect = this.width / this.height;
    camera.updateProjectionMatrix();

    renderer.setSize(this.width, this.height);
  },

  draw() {

    for (var i = 0; i < spheres.length; i++) {
      spheres[i].rotation.x += 0.01;
      spheres[i].rotation.y += 0.01;
      spheres[i].rotation.z += 0.01;

      renderer.render(scene, camera);
    }
  } });