import * as THREE from "three";
const initialState = {
  rooms: {
    bedroom: [
    //   {
    //     id: "1",
    //     type: "floor",
    //     texture: "textures/tile2.jpg",
    //     texture_width: "0.3",
    //     dots: [
    //       { x: "0", y: "0", z: "0" },
    //       { x: "120", y: "0", z: "0" },
    //       { x: "120", y: "0", z: "47" },
    //       { x: "0", y: "0", z: "47" },
    //     ],
    //   },
    //   {
    //     id: "2",
    //     type: "ceiling",
    //     texture: "textures/ceiling-texture.jpg",
    //     texture_width: "30",
    //     dots: [
    //       { x: "0", y: "3", z: "0" },
    //       { x: "120", y: "3", z: "0" },
    //       { x: "120", y: "3", z: "47" },
    //       { x: "0", y: "3", z: "47" },
    //     ],
    //   },
      {
        id: "3",
        type: "wall",
        texture: "textures/wall-paint.png",
        texture_width: "1",
        dots: [
          { x: "0", y: "0", z: "0" },
          { x: "0", y: "0", z: "47" },
          { x: "0", y: "3", z: "47" },
          { x: "0", y: "3", z: "0" },
        ],
        windows: [
          {
            type: "2 parts",
            x1: "0",
            y1: "1",
            z1: "1",
            x2: "0",
            y2: "2",
            z2: "2",
          },
        ],
      },
      {
        id: "120",
        type: "wall",
        texture: "textures/wall-paint.png",
        texture_width: "1",
        dots: [
          { x: "0", y: "0", z: "0" },
          { x: "120", y: "0", z: "0" },
          { x: "120", y: "3", z: "0" },
          { x: "0", y: "3", z: "0" },
        ],
        windows: [{ x1: "1", y1: "0.5", z1: "0", x2: "3", y2: "2", z2: "0" }],
        doors: [
          {
            type: "sliding",
            model: "furniture/door.zip",
            x1: "5",
            y1: "0",
            z1: "0",
            x2: "6",
            y2: "2",
            z2: "0",
          },
        ],
      },
    ],
  },
};
let example = {
  "surfaces": 
  [
    {
      "id": "1",
      "type": "floor",
      "texture": "textures/tile2.jpg",
      "texture_width": "0.3",
      "dots": [{"x": "0", "y": "0", "z": "0"}, {"x": "0", "y": "0", "z": "3"}, {"x": "2", "y": "0", "z": "3"}, {"x": "2", "y": "0", "z": "2"}, {"x": "4", "y": "0", "z": "2"}, {"x": "4", "y": "0", "z": "0"}]
    },
    {
      "id": "2",
      "type": "wall",
      "width": "0.1",
      "texture": "textures/wall-paint.png",
      "texture_width": "0.3",
      "dots": [{"x": "0", "y": "0", "z": "0"}, {"x": "0", "y": "1", "z": "0"}, {"x": "0", "y": "1", "z": "3"}, {"x": "0", "y": "0", "z": "3"}]
    },


    {
      "id": "3",
      "type": "wall",
      "width": "0.1",
      "texture": "textures/wall-paint.png",
      "texture_width": "1",
      "dots": [{"x": "0", "y": "0", "z": "3"}, {"x": "0", "y": "1", "z": "3"}, {"x": "2", "y": "1", "z": "3"}, {"x": "2", "y": "0", "z": "3"}],
    },

    {
      "id": "4",
      "type": "wall",
      "width": "0.1",
      "texture": "textures/wall-paint.png",
      "texture_width": "1",
      "dots": [{"x": "2", "y": "0", "z": "3"}, {"x": "2", "y": "1", "z": "3"}, {"x": "2", "y": "1", "z": "2"}, {"x": "2", "y": "0", "z": "2"}],
    },

    {
      "id": "5",
      "type": "wall",
      "width": "0.1",
      "texture": "textures/wall-paint.png",
      "texture_width": "1",
      "dots": [{"x": "0", "y": "0", "z": "2"}, {"x": "0", "y": "1", "z": "2"}, {"x": "2", "y": "1", "z": "2"}, {"x": "2", "y": "0", "z": "2"}],
    },



    {
      "id": "6",
      "type": "wall",
      "width": "0.1",
      "texture": "textures/wall-paint.png",
      "texture_width": "1",
      "dots": [{"x": "2", "y": "0", "z": "2"}, {"x": "2", "y": "1", "z": "2"}, {"x": "4", "y": "1", "z": "2"}, {"x": "4", "y": "0", "z": "2"}],
    },

    {
      "id": "7",
      "type": "wall",
      "width": "0.1",
      "texture": "textures/wall-paint.png",
      "texture_width": "1",
      "dots": [{"x": "4", "y": "0", "z": "0"}, {"x": "4", "y": "1", "z": "0"}, {"x": "0", "y": "1", "z": "0"}, {"x": "0", "y": "0", "z": "0"}],
    },

  ]
}

const createRoom = (room) => {
console.log(room)
  // json.map(el => (
  //     // return el;
  // ))
};
createRoom(initialState.rooms.bedroom);

const loadJson = () => {
  const createWallBox = () => {
    var wallMaterial = new THREE.MeshLambertMaterial({
      color: "gray",
      wireframe: false,
    });
    var building = new THREE.Mesh(
      new THREE.BoxGeometry(10, 5, 0.25),
      wallMaterial
    );
    building.userData.size = {
      width: building.geometry.parameters.width,
      height: building.geometry.parameters.height,
      depth: building.geometry.parameters.depth,
    };
    building.position.set(0, 1, 1);
    // this.scene.add(building);
    cutHole(building, 1, 0.5, 3, 2);
    return building;
  };
  const cutHole = (obj, x, y, x2, y2) => {
    //     cutHole(building, 0, 0, 0, -1, 0.5, -1, 1, 0, 0, 0);
    //   windows: [{ x1: "1", y1: "0.5", x2: "3", y2: "2" }],
    var width = obj.userData.size.width * 0.5;
    var height = obj.userData.size.height * 0.5;
    var depth = obj.userData.size.depth * 0.5;

    var shape = new THREE.Shape();
    shape.moveTo(-width, height);
    shape.lineTo(-width, -height);
    shape.lineTo(width, -height);
    shape.lineTo(width, height);
    shape.lineTo(-width, height);

    var hole = new THREE.Path();

    hole.moveTo(x, y); // 0 0
    hole.lineTo(x2, y); //  0, -1
    hole.lineTo(x2, y2); // 0.5, -1,
    hole.lineTo(x, y2); //  1, 0,
    hole.lineTo(x, y); // 0 0

    shape.holes.push(hole);

    var extrudeSettings = {
      amount: depth * 2,
      bevelEnabled: false,
    };

    var extrudeGeometry = new THREE.ExtrudeBufferGeometry(
      shape,
      extrudeSettings
    );
    extrudeGeometry.translate(0, 0, -depth);
    obj.geometry.dispose();
    obj.geometry = extrudeGeometry;
  };
  return createWallBox();
};
export default loadJson;
