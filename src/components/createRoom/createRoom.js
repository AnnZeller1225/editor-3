import Wall from "../wall";
import Model from "../model"
const CreateRoom = (items) => {
  let interiorItems = [];
  // console.log(items, 'items in createRoom')
  let itemsParsed = items.map((el) => {
    return {
      ...el,
      dots: { x: Number(el.dots.x), z: Number(el.dots.z),
        x2: Number(el.dots.x2), 
        z2: Number(el.dots.z2) },
    };
  });

  itemsParsed.map((el) => {
    if (el.type === "wall") {
      interiorItems.push(Wall(el));

      
      
    }
    else if (el.type === "model") {

      interiorItems.push(Model(el));
    
      // console.log(' грузим модель ')
    }
    return interiorItems
  }
  );
  return interiorItems;
};
export default CreateRoom;
