import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

export default function OBJComponent(props) {
    const { model, texture } = props;

    const mtl = useLoader(MTLLoader, texture);
    const obj = useLoader(OBJLoader, model, loader => {
        mtl.preload();
        loader.setMaterials(mtl)
    });
    
    // Note: If the obj model comes with jpg/png textures instead of a .mtl file, we can do this:
    // const texture = useTexture(texture.jpg);
    // useEffect(() => {
    //     obj.traverse(child => {
    //       if (child.isMesh) child.material.map = texture
    //     })
    //   }, [obj])    


    return (
        // Note: Can use "scale" attribute to adjust default size of model
        <mesh position={[0,0,0]} rotation={[0, 1, 0]} materials={mtl}>
            <primitive object={obj} {...props} />
        </mesh>
    )
}
